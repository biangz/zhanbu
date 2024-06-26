<script setup>
import { IconLoading } from '@arco-design/web-vue/es/icon';
import { stringify } from 'qs';
const props = defineProps({
    size: {
        type: Number,
        default: 14
    },
    color: {
        type: stringify,
        default: '#ffffff',
    }
})
</script>

<template>
    <icon-loading spin :size="props.size" :style="{'color': color}" />
</template>

<style scoped lang="less">

</style>