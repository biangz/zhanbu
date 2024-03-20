<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { initTypeList, preOrder } from '../../api';
import { Console } from '../../utils'
import { useAuthStore } from '../../store'

interface ElementType {
  id: number;
  name_cn: string;
  name_code: string;
  flag: number;
}

const orderLoading = ref<boolean>(false)
const router = useRouter()
const store = useAuthStore()
const typeList = ref<ElementType[]>([])
const number = ref<number | string>(1)
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

    if (orderLoading.value) return;

    if (!number.value) {
        Console(number.value)
        return Message.error({
            content: '请输入你的幸运数字吧～'
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
                <div class="percent flex items-center mx-auto">
                    <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-left.png" alt="">
                    <div class="relative number">95 <span class="sign">%</span></div>
                    <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-right.png" alt="">
                </div>
                <div class="sub">预测精准度</div>
                <p class="des mt-5">“元”在古老而神秘的东方文字中是由“人”与“天”组合而成，东方文明中“天”即是宇宙万物。“元”描绘着人与宇宙的最初状态，也代表着人与命运的因果关系。</p>
                <p class="des">“道”是万物的本初，是宇宙的第一推动，万事万物效法“道”而生，所以“道”是唯一的永恒不变的真理，是万事万物的内在客观规律。</p>

                <div class="w-full p-2">
                    <p class="question py-2">欲求哪一方面的事情：</p>
                    <div class="types">
                        <div 
                        class="type-item" 
                        :class="[store.userSelectType == item.id ? 'active' : '']"
                        v-for="item, index in typeList" 
                        :key="index"
                        @click="handleCheckType(item)"
                        >{{ item.name_cn }}</div>
                    </div>
                    <div class="flex items-center mt-2">
                        <p class="question py-2">心中默想所求之事，写下数字：</p>
                        <input class="input-number w-full flex-1" type="text" v-model="number" @blur.prevent="changeBlur" placeholder="心中默想所求之事，写下数字">
                    </div>
                    <div>
                        <p class="question py-2">写下你想问的问题吧：</p>
                        <textarea class="input-number w-full flex-1" type="text" @blur.prevent="changeBlur" v-model="turnQuestion" placeholder="写下你想问的问题..."></textarea>
                        <div v-if="!turnQuestion" class="flex items-center flex-wrap gap-2 mt-2">
                            <div class="preview-question" @click="turnQuestion = item" v-for="item,index in defaultQuestionList" :key="index">{{ item }}</div>
                        </div>
                    </div>
                </div>

                <button class="Btn mt-6" @click="handleGoto('/landing/pre')"><span class="text">立即开始</span></button>
            </section>
        </main>
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

    main {
        .circle {
            position: absolute;
            left: 50%;
            top: 0;
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
                margin-top: 2rem;
            }

            .percent {
                font-family: 'DIN-Black';
                font-size: 120px;
                color: #CAF5FF;

                .number {
                    padding: 0 28px;
                    line-height: 120px;

                    .sign {
                        margin-left: -24px;
                        font-size: 40px;
                    }
                }
            }

            .sub {
                font-family: 'AlimamaShuHeiTi-Bold';
                color: #CAF5FF;
                font-size: 44px;
            }

            .des {
                font-size: 32px;
                text-align: center;
                letter-spacing: 5px;
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
                font-size: 32px;
                font-family: 'PangMenZhengDao';
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
                font-size: 32px;
                letter-spacing: 5px;
                color: white;
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
                font-size: 20px;
                padding: 12px 8px;
                border-radius: 40px;
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
    }
}
</style>