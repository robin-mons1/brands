<script setup lang='ts'>
    definePageMeta({
        layout: 'login'
    });

    const modelActive = ref(false)
    const verifying = ref(false);
    const email = ref("");

    const user = useSupabaseUser();

    function verify(value: string) {
        email.value = value;
        verifying.value = true;
    }
</script>

<template>
    <BaseModelVue :model-active="modelActive" @close="modelActive = false">
        <LoginDialog v-if="!verifying" @verify="verify"></LoginDialog>
        <HomeVerify :email="email" v-else></HomeVerify>
    </BaseModelVue>
    <div>
        <button @click="modelActive = true" class="underline">you must login</button>
    </div>
    <div v-if="user">i am logged in</div>
</template>