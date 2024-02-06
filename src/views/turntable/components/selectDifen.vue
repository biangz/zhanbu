<template>
    <div class="difen-main">
        <div v-if="!store.userSelectType">
            <img class="banner" src="../../../assets/images/type.png" alt="">
            <div class="group-button mt-4">
                <a-button 
                    @click="handleCheckType(item)" 
                    v-for="item, index in typeList" 
                    :key="index" 
                    :type="'outline'"
                >{{ item.name_cn }}</a-button>
            </div>
        </div>
        <div v-else>
            <img class="image" src="../../../assets/images/input.png" alt="">
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
    .banner {
        display: block;
        width: 100%;
    }

    .group-button {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .arco-btn {
            min-width: 180px;
        }
    }

    .image {
        width: 800px;
        display: block;
        margin: 0 auto;
    }

    .arco-input-wrapper {
        background-color: transparent;
        border: 1px solid gray;
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