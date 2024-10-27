<script setup lang='ts'>
    definePageMeta({
        layout: 'login'
    });

</script>

<template>
    <section class="flex-grow flex h-full">
        <div class="flex-grow w-1/2 bg-black border-r border-white border-opacity-20 flex justify-center items-center">
            <LoginDialog></LoginDialog>
        </div>
        <div class="h-full w-1/2 bg-[#090909] justify-center flex items-center">
           <img class="w-2/3" src="/home.jfif" alt="best friend">
        </div>
    </section>
</template>