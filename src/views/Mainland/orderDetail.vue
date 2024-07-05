<script setup lang="ts">
import * as dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { getResult } from "../../api";
import { useRoute } from "vue-router";
import { Message } from "@arco-design/web-vue";
import Assitant from './components/assistant.vue'

const route = useRoute();
const info = ref(null);

const getData = (id: string) => {
    getResult({
        order_no: id,
    }).then((res) => {
        if (res.code == 200) {
            info.value = res.data.order_detail;
        } else {
            Message.error({
                content: res.message,
            });
        }
    });
};

const getSizhu = (sizhu: string) => {
    let o = JSON.parse(sizhu)
    return Object.values(o).join(' ')
}

const getStatus = (status) => {
    switch (status) {
        case 2:
            return "已支付";
            break;
        case 3:
            return "支付失败";
            break;
        default:
            return "待支付";
            break;
    }
};

onMounted(() => {
    getData(route.params.id as string);
});
</script>

<template>
    <div class="detail-container">
        <template v-if="info">
            <div class="order-detail">
                <div class="title flex items-center py-2 gap-2">
                    <div>订单编号：{{ info.order_no }}</div>
                    <div class="ml-auto">{{ getStatus(info.Status) }}</div>
                </div>
                <div class="py-2">
                    <div class="flex items-center justify-between">
                        <div class="label">创建时间</div>
                        <div class="value">{{ dayjs(info.create_at).format("YYYY-MM-DD HH:mm:ss") }}</div>
                    </div>
                    <div class="flex items-center justify-between mt-1">
                        <div class="label">价格</div>
                        <div class="value">{{ (info.pay_amount / 100).toFixed(2) }}</div>
                    </div>
                </div>
            </div>
            <div class="order-detail">
                <div class="py-2 flex items-center justify-between">
                    <div>四柱信息：</div>
                    <div class="ml-auto">{{ getSizhu(info.sizhu) }}</div>
                </div>
            </div>
            <div class="order-detail">
                <div class="py-2">{{ info.q_detail }}</div>
                <div class="py-2">{{ info.result }}</div>
            </div>
        </template>

        <Assitant />
    </div>
</template>

<style lang="less" scoped>
.detail-container {
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 24px 24px 100px;
    gap: 20px;

    .order-detail {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        padding: 16px 36px;
        color: rgb(234, 234, 234);
        font-size: 32px;

        .title {
            font-size: 36px;
            border-bottom: 1px solid #ffffff56;
        }
    }
}
</style>
