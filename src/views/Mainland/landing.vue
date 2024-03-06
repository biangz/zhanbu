<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const specailList = ref([
    { title: '事业', des01: '官禄亨通', des02: '万是开泰' },
    { title: '财富', des01: '财源广进', des02: '日进斗金' },
    { title: '吉凶', des01: '趋吉避凶', des02: '逢凶化吉' },
    { title: '姻缘', des01: '良辰吉日', des02: '缘定终身' },
    { title: '成败', des01: '谋事在人', des02: '成事在天' },
    { title: '健康', des01: '养元益体', des02: '天地人和' },
])

const goto = (url) => {
    router.push(url)
}

onMounted(() => {


})
</script>

<template>
    <div class="landing-container">
        <header class="py-4">
            <Logo class="w-22 mx-auto block" />
        </header>
        <main>
            <img class="circle w-70 block" src="../../assets/images/banner01/bg-cirlce.webp" alt="">
            <section class="content">
                <h1>元 · 道</h1>
                <div class="percent flex items-center mx-auto">
                    <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-left.png" alt="">
                    <div class="relative number">95 <span class="sign">%</span></div>
                    <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-right.png" alt="">
                </div>
                <div class="sub">预测精准度</div>
                <p class="des mt-4">“元”在古老而神秘的东方文字中是由“人”与“天”组合而成，东方文明中“天”即是宇宙万物。“元”描绘着人与宇宙的最初状态，也代表着人与命运的因果关系。</p>
                <p class="des">“道”是万物的本初，是宇宙的第一推动，万事万物效法“道”而生，所以“道”是唯一的永恒不变的真理，是万事万物的内在客观规律。</p>

                <div class="types mt-4">
                    <div class="type-item" v-for="item, index in specailList" :key="index">{{ item.title }}</div>
                </div>

                <button class="Btn mt-6" @click="goto('/landing/form')"><span class="text">立即开始</span></button>
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
            top: 3rem;
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
                margin-top: 6rem;
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
                flex-wrap: wrap;
            }

            .type-item {
                font-size: 48px;
                font-family: 'PangMenZhengDao';
                color: #FFF0BA;
                text-align: center;
                width: 138px;
                padding: 28px 0;
                background: url('../../assets/images/banner05/t-bg-s.webp') no-repeat center / 100%;
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