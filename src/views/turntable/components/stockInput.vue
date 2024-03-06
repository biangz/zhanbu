<template>
    <div class="difen-main">
        <h1 class="mt-4 text-white">今日涨跌预测，请输入今日开盘价：</h1>
        <a-input v-model="price" placeholder="" :size="'large'" />
        <AnButton @click="handleSelectNumber" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AnButton from '@/components/AnButton.vue';
const price = ref('')
const emit = defineEmits(['change'])

const handleSelectNumber = () => {
    emit('change', {
        type: 'stock',
        number: price.value
    })
}

onMounted(() => {
    
})

</script>

<style scoped lang="less">
.difen-main {

    h1 {
        font-size: 32px;
    }

    .arco-input-wrapper {
        background-color: transparent;
        border: 1px solid white;
        border-radius: 12px;
        overflow: hidden;
        padding: 24px;
        color: white;
        width: 300px;
        margin: 12px auto;
        display: block;
        .arco-input.arco-input-size-large {
            text-align: center;
            font-size: 30px;
        }
    }
}
</style>