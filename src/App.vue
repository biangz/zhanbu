<script setup>
import { useAuthStore } from './store';
const store = useAuthStore()
</script>

<template>
  <router-view @click="store.setShowBar(false)"/>
</template>

<style scoped>

</style>
