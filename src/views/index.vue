<template>
    <div class="index-container">
        <!-- 首页图片 5s -->
        <!-- <img :class="['image']" src="../assets/images/home-person.png" alt=""> -->

        <!-- 内容 -->
        <div class="main-container" :class="[show ? 'show' : '']">
            <div class="flex items-center">
                <a-button class="check-button" @click="handleCheck(item)" v-for="item, index in tabList" :key="index"
                    :type="store.forcastType == item.id ? 'primary' : 'outline'">{{ item.label }}</a-button>
            </div>

            <!-- 测事 -->
            <div v-if="store.forcastType == 1">
                <UserInput @change="handleInputNumber" />
            </div>

            <!-- 股票 -->
            <div v-if="store.forcastType == 2">
                <StockInput @change="handleInputNumber"/>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import UserInput from './turntable/components/selectDifen.vue'
import StockInput from './turntable/components/stockInput.vue'

const store = useAuthStore()
const router = useRouter()
const show = ref(false)
const tabList = ref([
    { label: '通用', id: 1 },
    { label: '涨跌', id: 2 },
])

const handleInputNumber = (e) => {
    console.log(e.number)
    store.setForcastUserInput(e.number)
    handleGotoChat()
}

const handleGotoChat = () => {
    router.push('/turn')
}

const handleCheck = (item) => {
    store.setForcastType(item.id)
}


// onMounted
onMounted(() => {
    store.setAgainQike()
    // setTimeout(() => {
    //     show.value = true
    // }, 3000)
})


</script>

<style scoped lang="less">
.index-container {
    padding-top: 3rem;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: url('../assets/images/banner10/bg-10.webp') no-repeat center bottom / cover;
    box-sizing: border-box;

    .image {
        width: 500px;
    }

    .main-container {
        width: 800px;
        height: 800px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        // background-color: black;

        // clip-path: circle(0);
        // transition: clip-path 2s;

        // &.show {
        //     clip-path: circle(100%);
        // }

        .check-button {
            border-radius: 0;

            &.arco-btn-primary {
                color: black;
            }

            &:first-child {
                margin-left: auto;
            }
        }

    }
}</style>