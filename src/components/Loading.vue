<script setup>
import { IconLoading } from '@arco-design/web-vue/es/icon';
const props = defineProps({
    size: {
        type: Number,
        default: 14
    }
})
</script>

<template>
    <icon-loading spin :size="props.size" :style="{'color': '#fff'}" />
</template>

<style scoped lang="less">

</style>