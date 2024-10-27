<script setup lang='ts'>
    import {navigateTo} from "#app";

    const user = useSupabaseUser();
    onBeforeMount(() => {
        navigateTo('/')
    })
</script>

<template>
    <section class="flex flex-grow justify-center items-center text-white flex-col gap-4">
    </section>
</template>