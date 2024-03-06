<template>
    <div class="difen-main">
        <div v-if="!store.userSelectType">
            <h1 class="mt-4 text-white">你欲求哪一方面的事情，点击选择：</h1>
            <div class="group-button grid grid-cols-4">
                <div 
                    class="type-item mx-auto cursor-pointer hover:opacity-80" 
                    v-for="item, index in typeList" 
                    :key="index"
                    @click="handleCheckType(item)"
                >{{ item.name_cn }}</div>
            </div>
        </div>
        <div v-else>
            <h1 class="mt-4 text-white">心中默想所求之事，写下数字：</h1>
            <a-input v-model="number" placeholder="" :size="'large'" />
    
            <AnButton @click="handleSelectNumber" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store'
import { initTypeList } from '@/api';
import AnButton from '@/components/AnButton.vue';
const number = ref('')
const store = useAuthStore()
const typeList = ref([])
const emit = defineEmits(['change'])

const handleSelectNumber = () => {
    console.log('number.value:', number.value)
    emit('change', {
        type: 'primary',
        number: number.value
    })
}

const handleCheckType = (type) => {
    console.log('type:', type)
    store.setUserSelectType(type.id)
}

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

<style scoped lang="less">
.difen-main {
    width: 800px;
    margin: 0 auto;
    
    h1 {
        font-size: 32px;
    }

    .group-button {
        // display: flex;
        // flex-wrap: wrap;
        gap: 10px;

        .type-item {
            font-size: 32px;
            font-family: 'PangMenZhengDao';
            color: #FFF0BA;
            text-align: center;
            width: 178px;
            padding: 38px 0;
            background: url('../../../assets/images/banner05/t-bg-s.webp') no-repeat center / 100%;
        }
    }

    .image {
        width: 800px;
        display: block;
        margin: 0 auto;
    }

    .arco-input-wrapper {
        background-color: transparent;
        border: 1px solid white;
        border-radius: 12px;
        overflow: hidden;
        padding: 24px;
        color: white;
        width: 200px;
        margin: 12px auto;
        display: block;

        .arco-input.arco-input-size-large {
            text-align: center;
            font-size: 30px;
        }
    }
}
</style>