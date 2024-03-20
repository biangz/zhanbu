<script setup>
import { reactive, ref, onMounted } from 'vue';
import { calculateFourPillars, calculateShenKeOrder } from '@/api';
import { useAuthStore } from '@/store'
import { Console } from '@/utils'
import TypeIt from 'typeit';
import Qike from '@/libs'

const store = useAuthStore()
const result = reactive({
    value: null,
    sizhu: null
})
const qikeResult = ref(null)
const loading = ref(true)
const orderLoading = ref(false)
const requestFinish = ref(false)
const animationFinish = ref(false)

onMounted(() => {
    // 四柱
    calculateFourPillars().then(res => {
        if (res.code == 200) {
            result.sizhu = {
                year: res.data.year_pillar,
                month: res.data.month_pillar,
                day: res.data.day_pillar,
                time: res.data.hour_pillar
            }
            qikeResult.value = new Qike(
                store.forcastUserInput,
                result.sizhu,
                (res) => {
                    result.value = res
                    requestFinish.value = true
                    if (animationFinish.value) {
                        loading.value = false
                    }
                }
            )
        } else {
            loading.value = false
        }
    })

    typeLoading()
})


const handleCreatePay = () => {

    if (orderLoading.value) return;

    orderLoading.value = true
    calculateShenKeOrder({
        dizhi: `${result.value.renyuanResult.name}${result.value.guishenResult.name}${result.value.shenjiangResult.name}${result.value.difenResult.name}`,
        kongwang: result.value.requestParamsKW.join(','),
        rumu: result.value.requestParamsRumu.join(','),
        type: store.userSelectType,
        rand: store.forcastUserInput,
        order_no: store.orderno,
    }).then(res => {
        if (res.code == 200) {
            // TODO: 吊起支付，redirect 地址为 /result
            Console(res.data)
        } else {

        }
        orderLoading.value = false
    })

}

const typeLoading = () => {
    // 创建一个 TypeIt 实例
    new TypeIt('#typewriter', {
        speed: 100,
        startDelay: 500,
        waitUntilVisible: true,
        afterComplete: () => {
            animationFinish.value = true
            if (requestFinish.value) {
                loading.value = false
            }
        }
    })
        .type("在四柱推算的神秘领域里，地脉交织着命运纹理...", { delay: 100 })
        .break({ delay: 500 })
        .type("......", { delay: 700 })
        .pause(300)
        .delete(6)
        .type("贵神、神将等神秘元素交织...", { delay: 100 })
        .break({ delay: 500 })
        .type("来揭示命运的未来迷雾吧...", { delay: 100 })
        .pause(600)
        .go();
}

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
            <div class="time grid grid-cols-4 m-2" v-if="result.sizhu">
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
            <div class="result m-2 pr-2" v-if="result.value">
                <div class="grid grid-cols-12 py-1">
                    <div class="sign">{{ result.value.difenResult.sign }}</div>
                    <div class="col-span-2">{{ result.value.difenResult.name }}</div>
                    <div class="col-span-2">{{ result.value.difenResult.wuxing }}{{ result.value.difenResult.yinyang }}{{
                        result.value.difenResult.wangshuai }}</div>
                    <div>{{ result.value.difenResult.kong ? '(空)' : '' }}</div>
                    <div>{{ result.value.difenResult.sidaKong ? '(四空)' : '' }}</div>
                    <div class="col-start-8 col-end-13"><span class="ml-1"
                            v-for="item, index in result.value.difenResult.rumu">入{{ item.name }}墓</span></div>
                </div>
                <div class="grid grid-cols-12 py-1">
                    <div class="sign">{{ result.value.guishenResult.sign }}</div>
                    <div class="col-span-2">{{ result.value.guishenGanResult.name }}｜{{ result.value.guishenResult.name }}
                    </div>
                    <div class="col-span-2">{{ result.value.guishenResult.wuxing }}{{ result.value.guishenResult.yinyang
                    }}{{ result.value.guishenResult.wangshuai }}</div>
                    <div>{{ result.value.guishenResult.kong ? '(空)' : '' }}</div>
                    <div>{{ result.value.guishenResult.sidaKong ? '(四空)' : '' }}</div>
                    <div class="col-start-8 col-end-13"><span class="ml-1"
                            v-for="item, index in result.value.guishenResult.rumu">入{{ item.name }}墓</span></div>
                </div>
                <div class="grid grid-cols-12 py-1">
                    <div class="sign">{{ result.value.shenjiangResult.sign }}</div>
                    <div class="col-span-2">{{ result.value.shenjiangGanResult.name }}｜{{ result.value.shenjiangResult.name
                    }}</div>
                    <div class="col-span-2">{{ result.value.shenjiangResult.wuxing }}{{ result.value.shenjiangResult.yinyang
                    }}{{ result.value.shenjiangResult.wangshuai }}</div>
                    <div>{{ result.value.shenjiangResult.kong ? '(空)' : '' }}</div>
                    <div>{{ result.value.shenjiangResult.sidaKong ? '(四空)' : '' }}</div>
                    <div class="col-start-8 col-end-13"><span class="ml-1"
                            v-for="item, index in result.value.shenjiangResult.rumu">入{{ item.name }}墓</span></div>
                </div>
                <div class="grid grid-cols-12 py-1">
                    <div class="sign">{{ result.value.renyuanResult.sign }}</div>
                    <div class="col-span-2">{{ result.value.renyuanResult.name }}</div>
                    <div class="col-span-2">{{ result.value.renyuanResult.wuxing }}{{ result.value.renyuanResult.yinyang
                    }}{{ result.value.renyuanResult.wangshuai }}</div>
                    <div>{{ result.value.renyuanResult.kong ? '(空)' : '' }}</div>
                    <div>{{ result.value.renyuanResult.sidaKong ? '(四空)' : '' }}</div>
                    <div class="col-start-8 col-end-13"><span class="ml-1"
                            v-for="item, index in result.value.renyuanResult.rumu">入{{ item.name }}墓</span></div>
                </div>
            </div>
            <div class="content">
                <button class="Btn" @click="handleCreatePay"><span class="text">起课完成，付费查看问题结果</span></button>
            </div>
        </template>
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

.form-container {
    min-height: 100vh;
    background: #000D2D;
    font-size: 32px;

    .progress-wrap {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);

        .word {
            font-size: 32px;
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
                content: '';
                width: 1px;
                height: 8px;
                border-radius: 7px;
                background: rgb(255, 255, 255);
                transition: 0.5s;
                animation: loading1274 2s ease infinite;
            }
        }
    }

    .result {
        // border: 1px solid;
        // border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
        background: rgba(0, 0, 0, .1);
        backdrop-filter: blur(20px);

        .Btn {
            width: 640px;
            height: 120px;
            border: none;
            border-radius: 10px;
            background: linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a);
            background-size: 250%;
            background-position: left;
            color: #ffd277;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition-duration: 1s;
            font-size: 60px;
            overflow: hidden;
            font-family: 'PangMenZhengDao';
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

    dd {
        padding: 12px 0 24px;
    }

    .sign {
        background-color: rgb(73, 93, 110);
        border: 1px solid #000D2D;
    }

    .content {}
}
</style>