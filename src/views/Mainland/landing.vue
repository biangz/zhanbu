<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { initTypeList, preOrder } from '../../api';
import { Console } from '../../utils'
import { useAuthStore } from '../../store'
import Alert from '@/components/Alert.vue';
import Assitant from './components/assistant.vue'

interface ElementType {
  id: number;
  name_cn: string;
  name_code: string;
  flag: number;
}

const showAlert = ref<boolean>(false)
const orderLoading = ref<boolean>(false)
const router = useRouter()
const store = useAuthStore()
const typeList = ref<ElementType[]>([])
const number = ref<number | string>(0)
const turnQuestion = ref<string>('')
const defaultQuestionList = ref<string[]>([
    '看看今年会不会遇到贵人帮助我在事业上发展?',
    '家里的老人身体健康怎么样？',
    '我今年财运如何？',
    '我今年有新的项目做吗？',
    '我喜欢的人对我有意思吗？',
    '我现在工作的地方对我的发展有利吗？',
])

const getTypeList = () => {
    initTypeList().then(res => {
        if (res.code == 200) {
            typeList.value = res.data
            store.setUserSelectType(typeList.value[0].id) // 默认选择第一个
        }
    })
}

const handleCheckType = (type) => {
    store.setUserSelectType(type.id)
}

const handleCheckNumber = (n) => {
    number.value = n
}

const changeBlur = () => {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isIOS){
        setTimeout(function () {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 200)
    }
}

const handleGoto = (url: string) => {

    if (store.orderno) {
        showAlert.value = Boolean(store.orderno)
        return;
    }

    if (orderLoading.value) return;

    if (!number.value) {
        Console(number.value)
        return Message.error({
            content: '请选择你的幸运数字吧～'
        })
    }
    if (!turnQuestion.value) {
        return Message.error('请输入你的问题吧～')
    }

    store.setForcastUserInput(number.value)
    store.setUserQuestion(turnQuestion.value)

    orderLoading.value = true
    preOrder({
        q_detail: store.userQuestion,
        q_num: store.forcastUserInput,
        q_type: store.userSelectType,
    }).then(res => {
        if (res.code == 200) {
            store.setoOrderno(res.data.order_no)
            router.push(url)
        } else {
            Message.error(res.data.message || '异常，请刷新重新尝试')
        }
    })
}

const userCancle = () => {
    store.setoOrderno('')
    localStorage.removeItem('showCheck')
    showAlert.value = false
}

const userConfirm = () => {
    router.push('/landing/pre')
    showAlert.value = false
}

onMounted(() => {
    getTypeList()
})
</script>

<template>
    <div class="landing-container">
        <header class="py-4">
            <Logo class="w-22 mx-auto block" />
        </header>
        <main>
            <img class="circle w-64 block" src="../../assets/images/banner01/bg-cirlce.webp" alt="">
            <section class="content">
                <h1>元 · 道</h1>
                <p class="des">“元”在古老而神秘的东方文字中是由“人”与“天”组合而成，东方文明中“天”即是宇宙万物。“元”描绘着人与宇宙的最初状态，也代表着人与命运的因果关系。</p>
                <p class="des">“道”是万物的本初，是宇宙的第一推动，万事万物效法“道”而生，所以“道”是唯一的永恒不变的真理，是万事万物的内在客观规律。</p>

                <div class="w-full p-2">
                    <!-- <p class="question py-2">欲求哪一方面的事情：</p> -->
                    <div class="types">
                        <div 
                        class="type-item" 
                        :class="[store.userSelectType == item.id ? 'active' : '']"
                        v-for="item, index in typeList" 
                        :key="index"
                        @click="handleCheckType(item)"
                        >{{ item.name_cn }}</div>
                    </div>
                    <div class="mt-2">
                        <p class="question py-2">心中默想所求之事，选择数字：</p>
                        <div class="flex items-center justify-around">
                            <div @click="handleCheckNumber(n)" class="number-btn" v-for="n in 10" :class="{'active': number == n}" :key="n">{{ n }}</div>
                        </div>
                        <!-- <input class="input-number w-full flex-1" type="text" v-model="number" @blur.prevent="changeBlur" placeholder="心中默想所求之事，写下数字"> -->
                    </div>
                    <div class="mt-3">
                        <!-- <p class="question py-2">写下你想问的问题吧：</p> -->
                        <textarea class="input-number w-full flex-1" type="text" @blur.prevent="changeBlur" v-model="turnQuestion" placeholder="欲求何事..."></textarea>
                        <div v-if="!turnQuestion" class="flex items-center flex-wrap gap-2 mt-2">
                            <div class="preview-question" @click="turnQuestion = item" v-for="item,index in defaultQuestionList" :key="index">{{ item }}</div>
                        </div>
                    </div>
                </div>

                <button class="Btn mt-6" :disabled="orderLoading" @click="handleGoto('/landing/pre')"><span class="text">立即测算</span></button>
            </section>
        </main>

        <Assitant />

        <Alert 
            v-model="showAlert" 
            title="未支付订单"
            message="存在未支付订单，是否继续支付？"
            cancle-text="重新下单"
            confirm-text="去支付"
            @close="userCancle"
            @confirm="userConfirm"
        />

    </div>
</template>

<style lang="less" scoped>
@keyframes rotate {
    to {
        transform: translateX(-50%) rotate(0deg);
    }

    from {
        transform: translateX(-50%) rotate(360deg);
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

.landing-container {
    min-height: 100vh;
    background: #000D2D;
    background: url('../../assets/images/banner01/bg-01.webp') no-repeat center bottom / cover;
    font-family: 'ZhongQi';

    main {
        .circle {
            position: absolute;
            left: 50%;
            top: -140px;
            animation: rotate 25s infinite linear;
            z-index: 0;
        }

        .content {
            position: relative;
            z-index: 1;
            position: relative;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 0 40px;

            h1 {
                font-family: 'YouShe';
                line-height: 1;
                font-size: 3rem;
                color: #E2E1FF;
                margin-top: 1rem;
            }

            .sub {
                font-family: 'AlimamaShuHeiTi-Bold';
                color: #CAF5FF;
                font-size: 44px;
            }

            .des {
                font-size: 46px;
                text-align: center;
                // letter-spacing: 5px;
                color: white;
                padding: 20px;
            }

            .types {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
            }

            .type-item {
                font-size: 42px;
                font-family: 'ZhongQi';
                color: #FFF0BA;
                text-align: center;
                padding: 18px 38px;
                background: url('../../assets/images/banner05/t-bg-s.webp') no-repeat center / 100%;

                &.active {
                    background: none;
                    border: 1px solid #FFF0BA;
                    border-radius: 12px;
                }
            }

            .question {
                font-size: 42px;
                color: white;
            }

            .number-btn {
                font-size: 42px;
                color: white;
                width: 86px;
                text-align: center;
                border: 1px solid white;
                border-radius: 99px;
                line-height: 1;
                padding: 20px 0;
                &.active {
                    background: white;
                    color: black;
                }
            }

            .input-number {
                border: 1px solid white;
                padding: 24px;
                display: block;
                background-color: transparent;
                color: white;
                border-radius: 12px;
                &::placeholder {
                    color: #cbc4a6;
                }
            }

            .preview-question {
                background-color: white;
                color: black;
                font-size: 32px;
                padding: 12px 8px;
                border-radius: 40px;
                letter-spacing: -2px;
            }

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

    
}
</style>