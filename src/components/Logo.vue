<template>
    <img class="logo" :src="logo" alt="">
</template>

<script setup>
const logo = new URL('@/assets/logo.svg', import.meta.url).href
</script>

<style scoped>
.logo {
    color: #C5A75A;
    fill: #C5A75A;
}
</style>