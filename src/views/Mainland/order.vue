<script setup lang="ts">
import * as dayjs from 'dayjs';
import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '../../store'
import { orderList } from '../../api'
import { useRoute, useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import Assitant from './components/assistant.vue'

const store = useAuthStore()
const result = ref<string>('')
const route = useRoute()
const router = useRouter()
const orderData = ref([])

const getStatus = (status) => {
    switch (status) {
        case 2:
            return '已支付';
            break;
        case 3:
            return '支付失败';
            break;
        default:
            return '待支付';
            break;
    }
}

const gotoDetail = (v) => {
    router.push({
        name: 'Detail',
        params: {
            id: v.order_no
        }
    })
}

onMounted(() => {
    orderList().then(res => {
        if (res.code == 200) {
            orderData.value = res.data.order_list
        } else {

        }
    })
})

</script>

<template>
    <div class="result-container whitespace-pre-line">
    
        <div class="order-item" @click="gotoDetail(item)" v-for="item, index in orderData" :key="index">
            <div class="title flex items-center py-2 gap-2">
                <div>订单编号：{{ item.order_no }}</div>
                <div class="ml-auto">{{ getStatus(item.Status) }}</div>
                <svg v-if="item.Status == 2" class="w-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg>
            </div>
            <div class="py-2">
                <div class="flex items-center justify-between">
                    <div class="label">创建时间</div>
                    <div class="value">{{ dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </div>
                <div class="flex items-center justify-between mt-1">
                    <div class="label">价格</div>
                    <div class="value">{{ item.pay_amount }}</div>
                </div>
            </div>
        </div>

        <Assitant />
    </div>
</template>

<style scoped lang="less">
.result-container {
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px;
    // font-family: 'ZhongQi';

    .order-item {
        background-color: rgba(255,255,255,.3);
        border-radius: 20px;
        padding: 16px 36px;
        color: rgb(234, 234, 234);
        font-size: 32px;
        + .order-item {
            margin-top: 20px;
        }

        .title {
            font-size: 36px;
            border-bottom: 1px solid #ffffff56;
        }

        .card {
        }
    }
}
</style>