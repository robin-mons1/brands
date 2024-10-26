<script setup lang='ts'>
    import {onMounted} from "vue";
    import {useAccountStore} from "~/src/Account/AccountStore";

    const accountStore = useAccountStore();

    async function checkout() {
        const res = await $fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            body: {
                lookup_key: 'test_subscription'
            }
        });

        if(res) {
            await navigateTo(res.url, {
                external: true,
            })
        } else {
            console.log('shit')
        }
    }

    async function manage() {
        const res = await $fetch('/api/stripe/create-portal-session', {
            method: 'POST',
        });

        if(res) {
            await navigateTo(res.url, {
                external: true,
            })
        } else {
            console.log('shit')
        }
    }
</script>

<template>
    <section class="flex flex-grow justify-center items-center text-white flex-col gap-4">
        <div class="p-8 border border-white border-opacity-20 w-1/2 text-center">
            You do not have an <span class="underline">assigned</span> brand or role yet.
        </div>
        <div class="p-8 border border-white border-opacity-20 w-1/2 text-center">
            No <span class="underline">linked accounts</span> found.
        </div>
        <div v-if="!accountStore.user.isSubscribed" class="p-8 border border-white border-opacity-20 w-1/2 text-center">
            You do not have a running subscription <span class="underline" @click="checkout">subscribe now</span>
        </div>
        <div v-else class="p-8 border border-white border-opacity-20 w-1/2 text-center">
            Manage your subscription <span class="underline" @click="manage">here</span>
        </div>
    </section>
</template>