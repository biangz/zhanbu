<script setup>
import { reactive, ref, onMounted } from 'vue';
import { initTypeList } from '@/api';

const form = reactive({
    type: '',
    post: '',
})
const typeList = ref([])

const getTypeList = () => {
    initTypeList().then(res => {
        if (res.code == 200) {
            typeList.value = res.data
        }
    })
}

onMounted(() => {
    getTypeList()
})
</script>

<template>
    <div class="form-container">
        <header></header>
        <div class="content">
            
        </div>
    </div>
</template>

<style lang="less" scoped>
.form-container {
    min-height: 100vh;
    background: #000D2D;
    // background: url('../../assets/images/banner01/bg-cirlce.webp') no-repeat center bottom / cover;
}
</style>