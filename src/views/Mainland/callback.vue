<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../../store";
import { getResult } from "../../api";
import { useRouter } from 'vue-router'

const store = useAuthStore();
const router = useRouter()
const result = ref<string>("");
const timer = ref<ReturnType<typeof setInterval> | null>(null);
const loading = ref<boolean>(false);

// 页面卸载时清除定时器
onBeforeUnmount(() => {
    stopPolling();
});

const userCheckFun = () => {
    stopPolling()
    checkInterface()
    startPolling();
}

function startPolling() {
    // 启动定时器，每隔一定时间执行 checkInterface 方法
    timer.value = setInterval(checkInterface, 2000); // 5秒检查一次，你可以根据需求调整时间间隔
}

function stopPolling() {
    // 清除定时器
    if (timer.value !== null) {
        clearInterval(timer.value);
        timer.value = null;
    }
}

function checkInterface() {

    if (loading.value) return;

    loading.value = true;
    getResult({
        order_no: store.orderno,
    }).then((res) => {
        // TODO: 
        // 返回100025 继续等待支付
        // 100026   支付失败
        // 100027 支付取消
        // 100022    订单信息异常，联系平台退款
        // 100023   订单信息异常，联系平台退款
        if (res.code == 200) {
            if (res.data.res) {
                stopPolling()
                router.replace('/landing/result')
            }
        } else {
        }
        loading.value = false;
    });
}

onMounted(() => {
    
});
</script>

<template>
    <div class="result-container whitespace-pre-line">
        <h1 class="text-center mt-32">是否完成了支付？</h1>
        <button @click="userCheckFun" :disabled="loading" class="button finish mt-8">已经完成支付</button>
        <button @click="userCheckFun" :disabled="loading" class="button mt-4">支付未完成</button>
    </div>
</template>

<style scoped lang="less">
.result-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 48px;
    .button {
        border: none;
        border: 1px solid #ffd277;
        display: block;
        border-radius: 99px;
        padding: 36px;
        background-color: transparent;
        color: white;
        width: 100%;
        font-size: 48px;
        &.finish {
            background-color: #ffd277;
            color: black;
        }
        &[disabled] {
            opacity: 0.6;
        }
    }
}
</style>
