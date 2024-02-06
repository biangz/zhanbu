<template>
    <div class="difen-main">
        <p class="title">今日涨跌预测，请输入今日开盘价:</p>
        <a-input-search 
            :style="{width:'320px'}" 
            placeholder="Please input" 
            @search="handleSelectNumber" 
            button-text="Comfirm" 
            search-button
            v-model="price"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AOS from 'aos';
const price = ref('')
const emit = defineEmits(['change'])

const handleSelectNumber = () => {
    emit('change', {
        type: 'stock',
        number: price.value
    })
}

onMounted(() => {
    AOS.init()
})

</script>

<style scoped lang="less">
.difen-main {
    background: #66F132;
    padding: 18px;

    .title {
        color: black;
        padding-bottom: 12px;
    }

    :deep(.arco-input-search-btn) {
        background-color: black;
    }
}
</style>