<script setup lang='ts'>
    const showError = ref(true);
</script>

<template>
    <main class="screen-size flex-col flex">
        <PhylloConnector v-if="showError" @close="showError = false"></PhylloConnector>
        <top-bar></top-bar>
        <slot></slot>
    </main>
</template>