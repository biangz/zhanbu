<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, renderSlot } from "vue";
import { calculateFourPillars, calculateShenKeOrder, wxPay, getResult } from "@/api";
import { useAuthStore } from "@/store";
import { Console } from "@/utils";
import { useRouter } from 'vue-router';
import { requestXhReport, PKG, TOKEN, APP_VERSION } from '@/api';
import TypeIt from "typeit";
import Qike from "@/libs";
import Loading from "@/components/Loading.vue";
import Alert from '@/components/Alert.vue';
import Assitant from './components/assistant.vue'

const store = useAuthStore();
const router = useRouter();
const result = reactive({
    value: null,
    sizhu: null,
});
const qikeResult = ref(null);
const loading = ref(true);
const orderLoading = ref(false);
const requestFinish = ref(false);
const animationFinish = ref(false);
const timer = ref(null);
const checkLoading = ref(false)
const showCheckPayAlert = ref(Boolean(localStorage.getItem('showCheck')))

onMounted(() => {
    // 四柱
    calculateFourPillars().then((res) => {
        if (res.code == 200) {
            result.sizhu = {
                year: res.data.year_pillar,
                month: res.data.month_pillar,
                day: res.data.day_pillar,
                time: res.data.hour_pillar,
            };
            qikeResult.value = new Qike(store.forcastUserInput, result.sizhu, (res) => {
                result.value = res;
                requestFinish.value = true;
                if (animationFinish.value) {
                    loading.value = false;
                }
            });
        } else {
            loading.value = false;
        }
    });

    if (!showCheckPayAlert.value) {
        typeLoading();
    } else {
        loading.value = false;
    }
});

const handleCreatePay = () => {
    if (orderLoading.value) return;

    orderLoading.value = true;
    requestXhReport('pay_click', { orderid: store.orderno })
    calculateShenKeOrder({
        dizhi: `${result.value.renyuanResult.name}${result.value.guishenResult.name}${result.value.shenjiangResult.name}${result.value.difenResult.name}`,
        kongwang: result.value.requestParamsKW.join(","),
        rumu: result.value.requestParamsRumu.join(","),
        type: store.userSelectType,
        rand: store.forcastUserInput,
        order_no: store.orderno,
    }).then((res) => {
        if (res.code == 200) {
            wxPay({
                order_no: store.orderno,
            }).then((r) => {
                if (r.code == 200) {
                    let url = `${r.data.pay_url}&redirect_url=${encodeURIComponent(`https://app.yuantao1331.com/landing/pre`)}`
                    // let url = `${r.data.pay_url}?redirect_url=${encodeURIComponent(`https://app.yuantao1331.com/landing/pre?order_id=${store.orderno}`)}`
                    // openLinkInNewTab(r.data.pay_url)
                    console.log('url>>', url)
                    window.open(url, '_top')
                    showCheckPayAlert.value = true
                    localStorage.setItem('showCheck', '1')
                } else {
                }
            });
        } else {
        }
        orderLoading.value = false;
    });
};

const typeLoading = () => {
    // 创建一个 TypeIt 实例
    new TypeIt("#typewriter", {
        speed: 100,
        startDelay: 500,
        waitUntilVisible: true,
        afterComplete: () => {
            animationFinish.value = true;
            if (requestFinish.value) {
                loading.value = false;
            }
        },
    })
        .type("在四柱推算的神秘领域里", { delay: 100 })
        .break({ delay: 500 })
        .type("地脉交织着命运纹理...", { delay: 100 })
        .type("......", { delay: 700 })
        .pause(300)
        .delete(6)
        .break({ delay: 500 })
        .type("来揭示命运的未来迷雾吧...", { delay: 100 })
        .break({ delay: 500 })
        .pause(600)
        .go();
};

// 检查支付结果
const userCheckFun = () => {
    stopPolling();
    checkInterface();
    startPolling();
};

// 取消支付
const userCancelPay = () => {
    checkInterface(true)
    stopPolling();
}

function stopPolling() {
    // 清除定时器
    if (timer.value !== null) {
        clearInterval(timer.value);
        timer.value = null;
    }
}

function startPolling() {
    // 启动定时器，每隔一定时间执行 checkInterface 方法
    timer.value = setInterval(checkInterface, 2000); // 5秒检查一次，你可以根据需求调整时间间隔
}

function checkInterface(cancle = false) {
    if (checkLoading.value) return;

    checkLoading.value = true;
    getResult({
        order_no: store.orderno,
    }).then((res) => {
        // 返回100025 继续等待支付
        // 100026   支付失败
        // 100027 支付取消
        // 100022    订单信息异常，联系平台退款
        // 100023   订单信息异常，联系平台退款
        if (res.code == 200) {
            if (res.data.res) {
                stopPolling();
                router.replace(`/landing/result?orderno=${store.orderno}`);
                localStorage.removeItem('showCheck')
                store.setoOrderno('')
                showCheckPayAlert.value = false
                requestXhReport('pay_suc', { price: '19.9' })
            }
            checkLoading.value = false;
        } else if (res.code == '100022') { // 订单信息异常，联系平台退款
            stopPolling();
            localStorage.removeItem('showCheck')
            showCheckPayAlert.value = false
            checkLoading.value = false;
        } else if (res.code == '100023') { // 订单信息异常，联系平台退款
            stopPolling();
            localStorage.removeItem('showCheck')
            showCheckPayAlert.value = false
            checkLoading.value = false;
        } else if (res.code == '100025') { // 继续等待支付
            if (cancle) {
                localStorage.removeItem('showCheck')
                showCheckPayAlert.value = false
            }
        } else if (res.code == '100026') { // 支付失败
            stopPolling();
            localStorage.removeItem('showCheck')
            showCheckPayAlert.value = false
            checkLoading.value = false;
        } else if (res.code == '100027') { // 支付取消
            stopPolling();
            localStorage.removeItem('showCheck')
            showCheckPayAlert.value = false
            checkLoading.value = false;
        } else { // 异常处理
            stopPolling();
            localStorage.removeItem('showCheck')
            showCheckPayAlert.value = false
            checkLoading.value = false;
        }
    });
}

// 页面卸载时清除定时器
onBeforeUnmount(() => {
    stopPolling();
});
</script>

<template>
    <div class="form-container py-2 text-center">
        <div class="progress-wrap" v-if="loading">
            <p class="word" id="typewriter"></p>
            <div class="progress-loader">
                <div class="progress"></div>
            </div>
        </div>
        <template v-else>
            <div class="preview-container">

                <div class="time grid grid-cols-4 m-2 w-full" v-if="result.sizhu">
                    <dl>
                        <dt class="sign">年</dt>
                        <dd>{{ result.sizhu.year }}</dd>
                    </dl>
                    <dl>
                        <dt class="sign">月</dt>
                        <dd>{{ result.sizhu.month }}</dd>
                    </dl>
                    <dl>
                        <dt class="sign">日</dt>
                        <dd>{{ result.sizhu.day }}</dd>
                    </dl>
                    <dl>
                        <dt class="sign">时</dt>
                        <dd>{{ result.sizhu.time }}</dd>
                    </dl>
                </div>
                <div class="result m-2 pr-2 w-full" v-if="result.value">
                    <div class="grid grid-cols-12 py-1">
                        <div class="sign">{{ result.value.difenResult.sign }}</div>
                        <div class="col-span-2">{{ result.value.difenResult.name }}</div>
                        <div class="col-span-2">{{ result.value.difenResult.wuxing }}{{ result.value.difenResult.yinyang }}{{ result.value.difenResult.wangshuai }}</div>
                        <div>{{ result.value.difenResult.kong ? "(空)" : "" }}</div>
                        <div>{{ result.value.difenResult.sidaKong ? "(四空)" : "" }}</div>
                        <div class="col-start-8 col-end-13">
                            <span class="ml-1" v-for="(item, index) in result.value.difenResult.rumu">入{{ item.name }}墓</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 py-1">
                        <div class="sign">{{ result.value.guishenResult.sign }}</div>
                        <div class="col-span-2">{{ result.value.guishenGanResult.name }}｜{{ result.value.guishenResult.name }}</div>
                        <div class="col-span-2">{{ result.value.guishenResult.wuxing }}{{ result.value.guishenResult.yinyang }}{{ result.value.guishenResult.wangshuai }}</div>
                        <div>{{ result.value.guishenResult.kong ? "(空)" : "" }}</div>
                        <div>{{ result.value.guishenResult.sidaKong ? "(四空)" : "" }}</div>
                        <div class="col-start-8 col-end-13">
                            <span class="ml-1" v-for="(item, index) in result.value.guishenResult.rumu">入{{ item.name }}墓</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 py-1">
                        <div class="sign">{{ result.value.shenjiangResult.sign }}</div>
                        <div class="col-span-2">{{ result.value.shenjiangGanResult.name }}｜{{ result.value.shenjiangResult.name }}</div>
                        <div class="col-span-2">{{ result.value.shenjiangResult.wuxing }}{{ result.value.shenjiangResult.yinyang }}{{ result.value.shenjiangResult.wangshuai }}</div>
                        <div>{{ result.value.shenjiangResult.kong ? "(空)" : "" }}</div>
                        <div>{{ result.value.shenjiangResult.sidaKong ? "(四空)" : "" }}</div>
                        <div class="col-start-8 col-end-13">
                            <span class="ml-1" v-for="(item, index) in result.value.shenjiangResult.rumu">入{{ item.name }}墓</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 py-1">
                        <div class="sign">{{ result.value.renyuanResult.sign }}</div>
                        <div class="col-span-2">{{ result.value.renyuanResult.name }}</div>
                        <div class="col-span-2">{{ result.value.renyuanResult.wuxing }}{{ result.value.renyuanResult.yinyang }}{{ result.value.renyuanResult.wangshuai }}</div>
                        <div>{{ result.value.renyuanResult.kong ? "(空)" : "" }}</div>
                        <div>{{ result.value.renyuanResult.sidaKong ? "(四空)" : "" }}</div>
                        <div class="col-start-8 col-end-13">
                            <span class="ml-1" v-for="(item, index) in result.value.renyuanResult.rumu">入{{ item.name }}墓</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <p class="text-2xl">根据提供的信息，从四位的生克关系和五行属性及地支属性，以及空亡入墓和刑冲合害等象意信息来看，对问题的分析如下!</p>
                    <button class="Btn" @click="handleCreatePay" :disabled="orderLoading"><Loading v-if="orderLoading" /><span class="text">19.9 元解锁</span></button>
                </div>
            </div>

            <!-- 支付确认 -->

            <Alert 
                v-model="showCheckPayAlert" 
                title="支付结果确认"
                message="请确认你的支付结果"
                cancle-text="支付未完成"
                confirm-text="已经完成支付"
                v-model:disabled="checkLoading"
                @close="userCancelPay"
                @confirm="userCheckFun"
            />

        </template>

        <Assitant />
    </div>
</template>

<style lang="less" scoped>
@keyframes loading1274 {
    0% {
        width: 0%;
    }

    10% {
        width: 10%;
    }

    50% {
        width: 40%;
    }

    60% {
        width: 60%;
    }

    100% {
        width: 100%;
    }
}

@keyframes multiple {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.form-container {
    height: 100vh;
    background: #000d2d;
    font-size: 32px;
    overflow: hidden;
    box-sizing: border-box;
    font-family: 'ZhongQi';

    .progress-wrap {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);

        .word {
            font-size: 42px;
            text-align: left;
            color: white;
            padding: 36px 0;
        }

        .progress-loader {
            width: 550px;
            background: rgba(236, 236, 238, 0.253);
            height: 8px;
            border-radius: 7px;

            .progress {
                content: "";
                width: 1px;
                height: 8px;
                border-radius: 7px;
                background: rgb(255, 255, 255);
                transition: 0.5s;
                animation: loading1274 2s ease infinite;
            }
        }
    }

    .preview-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        font-size: 0.8rem;

        .content {
            flex: 1;
            width: 100%;
            padding: 40px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &::after {
                width: 100%;
                height: 100%;
                background-color: rgba(255,255,255,.2);
                position: absolute;
                content: " ";
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
                backdrop-filter: blur(2px);
                filter: blur(0.5rem);
            }

            .Btn {
                width: 740px;
                height: 120px;
                position: absolute;
                // top: 25%;
                // left: 18%;
                z-index: 20;
                border: none;
                border-radius: 10px;
                background: linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a);
                background-size: 250%;
                background-position: left;
                color: #ffd277;
                // position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition-duration: 1s;
                font-size: 60px;
                overflow: hidden;
                animation: multiple 2s infinite;

                .text {
                    position: relative;
                    z-index: 2;
                }
            }

            .Btn::before {
                position: absolute;
                color: #ffd277;
                content: " ";
                display: flex;
                align-items: center;
                justify-content: center;
                width: 97%;
                height: 90%;
                border-radius: 8px;
                transition-duration: 1s;
                background-color: rgba(0, 0, 0, 0.842);
                background-size: 200%;
            }

            .Btn:hover {
                background-position: right;
                transition-duration: 1s;
            }

            .Btn:hover::before {
                background-position: right;
                transition-duration: 1s;
            }

            .Btn:active {
                transform: scale(0.95);
            }
        }
    }

    .result {
        // border: 1px solid;
        // border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
    }
    

    dd {
        padding: 12px 0 24px;
    }

    .sign {
        background-color: rgb(73, 93, 110);
        border: 1px solid #000d2d;
    }
    
}
</style>
