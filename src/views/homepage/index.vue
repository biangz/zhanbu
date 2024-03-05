<script setup>
import AOS from 'aos';
import { onMounted, ref } from 'vue';

const specailList = ref([
    { title: '事业', des01: '官禄亨通', des02: '万是开泰' },
    { title: '财富', des01: '财源广进', des02: '日进斗金' },
    { title: '吉凶', des01: '趋吉避凶', des02: '逢凶化吉' },
    { title: '姻缘', des01: '良辰吉日', des02: '缘定终身' },
    { title: '成败', des01: '谋事在人', des02: '成事在天' },
    { title: '健康', des01: '养元益体', des02: '天地人和' },
])

const handleScrollTeam = (location) => {
    let el = document.getElementById(location)
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}

const thirdLink = (link) => {
    window.open(link)
}

onMounted(() => {
    AOS.init({
        once: true
    });
})
</script>

<template>
    <div>
        <header class="header flex items-center gap-x-6">
            <a href="/homepage"><img class="logo" src="../../assets/images/logo.svg" alt=""></a>
            <nav class="flex items-center ml-auto gap-x-3 text-white">
                <!-- Home Twitter Team LitePaper -->
                <div class="cursor-pointer">Home</div>
                <div class="cursor-pointer" @click="thirdLink('https://twitter.com/yuantaoxyz')">Twitter</div>
                <div class="cursor-pointer" @click="handleScrollTeam('team')">Team</div>
                <div class="cursor-pointer">LitePaper</div>
            </nav>
            <a href="/"><a-button shape="round">Launch APP</a-button></a>
        </header>

        <main class="select-none">
    
            <!-- banner 01 -->
            <section class="banner-01 relative" >
                <img class="circle" data-aos="fade-up" src="../../assets/images/banner01/bg-cirlce.webp" alt="">
                <div class="inner relative z-[10]" data-aos="fade-up">
                    <div class="title" data-aos="fade-up" data-aos-delay="100">元 · 道</div>
                    <div class="percent flex items-center" data-aos="fade-up" data-aos-delay="150">
                        <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-left.png" alt="">
                        <div class="relative number">95 <span class="sign">%</span></div>
                        <img class="w-[1.36rem]" src="../../assets/images/banner01/percent-right.png" alt="">
                    </div>
                    <div class="sub" data-aos="fade-up" data-aos-delay="200">预测精准度</div>
                    <p class="descript pt-4 pb-[0.8rem]" data-aos="fade-up" data-aos-delay="250">“元”在古老而神秘的东方文字中是由“人”与“天”组合而成，东方文明中“天”即是宇宙万物。“元”描绘着人与宇宙的最初状态，也代表着人与命运的因果关系。</p>
                    <p class="descript" data-aos="fade-up" data-aos-delay="300">“道”是万物的本初，是宇宙的第一推动，万事万物效法“道”而生，所以“道”是唯一的永恒不变的真理，是万事万物的内在客观规律。</p>
                </div>
            </section>
    
            <!-- banner 02 -->
            <section class="banner-02 relative">
                <div class="inner w-full md:w-[29.68rem]">
                    <div class="line w-full">
                        <div class="title text-[1rem] md:text-[1.8rem]">未来之前·乾坤之间</div>
                        <p class="gradient pt-3 pb-2 px-4 text-[0.7rem] md:text-[1rem]">一款基于人工智能&东方易经神秘玄学的精准预测应用</p>
                        <p class="des">让古老而神秘的东方术数与现代科技碰撞出新的财富火花</p>
                        <img class="dot" src="../../assets/images/banner02/02-dot.png" alt="">
                    </div>
                    <div class="btm mt-[5rem]">
                        <p>你想知道未来的命运吗？</p>
                        <div class="mt-3">
                            <div class="icon i-solar-alt-arrow-down-outline"></div>
                            <div class="icon i-solar-alt-arrow-down-outline"></div>
                            <div class="icon i-solar-alt-arrow-down-outline"></div>
                        </div>
                    </div>
                </div>
            </section>
    
            <!-- banner 03 -->
            <section class="banner-03 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">运算逻辑 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <img class="w-full md:w-[24rem]" src="../../assets/images/banner03/pic-process.webp" alt="">
                    <img class="right block mx-auto md:absolute md:top-[29%] md:right-[-2rem]" src="../../assets/images/banner03/pic-result.webp" alt="">
                </div>
            </section>
    
            <!-- banner 04 -->
            <section class="banner-04 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">玄学融合现代科技 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="md:flex items-center justify-between">
                        <section>
                            <p class="little-title py-4 mt-4" >只有最顶尖的术数专家与最一流的AI工程师才能完成</p>
                            <div class="linear-box md:w-[10rem]" >
                                <p class="title">东方玄学</p>
                                <p class="sub">Shan he LEE</p>
                                <p class="des">Shan he LEE 首席易学专家、300年师承的独家易学密术、近30年易学苦心研究成果、享誉海外的预测实践案例。</p>
                            </div>
                            <img class="w-[4px] block mx-auto my-1"  src="../../assets/images/banner04/04-line.png" alt="">
                            <div class="linear-box md:w-[10rem]" >
                                <p class="title">现代科技</p>
                                <p class="sub">JACKY | Co-Founder</p>
                                <p class="des">金融科技创业者 #Geek 工程师 #Blockchain 开发者 Jacky 是一位专注的 Web3 探索者。他是 SWFT Pro 和 Meta Path 的架构师，拥有在区块链技术开发方面的复杂经验。</p>
                            </div>
                        </section>
                        <section>
                            <img  class="w-[14rem] mx-auto block md:-mr-12" src="../../assets/images/banner04/pic-luopan.png" alt="">
                        </section>
                    </div>
                </div>
            </section>
    
            <!-- banner 05 -->
            <section class="banner-05 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem]">
                    <h1 class="text-center">来自东方</h1>
                    <p class="text-center text-[1.2rem]"><span class="j px-1">精准度</span>高达<span class="text-[#FFFF00] px-1">95%</span>的神奇预测软件</p>
                    <p class="des01"><img src="../../assets/images/banner04/04-line.png" alt=""><span>只有知道未来的人</span></p>
                    <p class="des02"><span class="ml-auto">才能更好的掌控未来...</span></p>
                    <div class="flex items-center justify-between mt-[3rem]">
                        <div class="specail w-[3.4rem] md:w-[3.86rem]" v-for="item,index in specailList" :key="index">
                            <h1>{{ item.title }}</h1>
                            <div class="flex items-center justify-center mt-[0.48rem] md:gap-x-2">
                                <p class="vertical-text">{{ item.des01 }}</p>
                                <p class="vertical-text">{{ item.des02 }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="last-des">元道人工智能预测系统可以精准预测每个人日常生活中关于未来的一切问题，并给出建设性意见，帮助每一人更有效的掌握未来，精准度高达95%</p>
                </div>
            </section>
    
            <!-- banner 06 -->
            <section class="banner-06 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">元道-时空罗盘模型 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="md:flex justify-between items-center mt-8">
                        <img class="w-[14rem] block mx-auto md:mx-0" src="../../assets/images/banner06/pic-lp.webp" alt="">
                        <div class="r mx-auto md:mx-0">
                            <p class="text-[0.48rem]">元道人工智能预测系统的时空罗盘模型</p>
                            <p class="text-[0.32rem] leading-[2.6] mt-2">神秘东方文化讲究天、地、人、合，人与天地之间的关系，人所在时空关系与未来之间的关系。元道匹配当事人所在的时空关系，通过人工智能运用东方易经中的术数要领，通过人在时空罗盘模型中的状态，全面评估这个人在未来的动态变化。</p>
                            <img class="line" src="../../assets/images/banner06/06-line.webp" alt="">
                        </div>
                    </div>
                    <div class="title w-full relative mt-12">元道-千年数据库 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="md:flex justify-between items-center mt-8">
                        <div class="l mx-auto md:mx-0">
                            <p class="text-[0.48rem]">元道的AI学习</p>
                            <p class="text-[0.32rem] leading-[2.6] mt-2">元道AI系统阅读学习了《连山》、《归藏》、《周易》、《麻衣神相》、《太弦经》、《周易参同契》、《黄帝宅经》、《葬经》、《太乙金镜式经》、《六仁神定经》、《遁甲符应经》、《柳庄相法》等上千本千年古籍以及25万个预测实践案例数据的收集，充分掌握了古老东方神秘预测的要领，预测准确率高达95%</p>
                        </div>
                        <img class="w-[14rem] block mx-auto md:mx-0 mt-12 md:mt-0" src="../../assets/images/banner06/pic-ku.webp" alt="">
                    </div>
                </div>
            </section>
    
            <!-- banner 07 -->
            <section class="banner-07 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">元道-元道编译系统 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="md:flex justify-between items-center">
                        <div class="r mx-auto md:mx-0">
                            <p class="text-[0.48rem]">东方天干地支</p>
                            <p class="text-[0.32rem] leading-[2.6] mt-2">中国的天干地支，即十天干：甲、乙、丙、丁、戊、己、庚、辛、壬、癸；十二地支包括子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥 作为一种代表着天地自然的数字符号，以五行生克、阴阳、八卦关系进行关联，形成一种东方玄学预测的编译系统。在东方的玄学预测体系中，这些符号的组合，正是古代破译未来的计算代码，承载着特定的信息和属性，让每个人都成为未来世界的NPC。</p>
                            <img class="line" src="../../assets/images/banner06/06-line.webp" alt="">
                        </div>
                        <img class="w-[19rem] block mx-auto md:-mr-8" src="../../assets/images/banner07/pic-07.webp" alt="">
                    </div>
                </div>
            </section>
    
            <!-- banner 08 -->
            <section class="banner-08 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">元道财富宝 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="flex items-center mt-8">
                        <div class="panel w-full md:w-[22rem] px-5 py-4 md:pr-[5rem]">
                            <h2 class="linear text-[0.64rem]">股市涨跌趋势预测</h2>
                            <p class="pr-[3rem] mt-2">元道更专注于精准的比特币、及股市涨跌趋势预测！用户仅需输入比特币或股票开盘价，便可获知丰富的涨跌趋势建议！元道通过25万个的预测案例的分析，精准度高达 <span>95%</span>。</p>
                            <h1 class="linear text-[0.8rem] pt-4">量化投资</h1>
                            <div class="skew flex flex-wrap items-center gap-3 mt-3">
                                <div class="skew-i">价值评估</div>
                                <div class="skew-i">投资建设</div>
                                <div class="skew-i">短线涨跌</div>
                                <div class="skew-i">风险评估</div>
                                <div class="skew-i">长线涨跌</div>
                                <div class="skew-i">趋势分析</div>
                            </div>
                        </div>
                        <div class="l -ml-[4rem] hidden md:block">
                            <img class="block w-full" src="../../assets/images/banner08/pic-c.webp" alt="">
                            <div class="little-panel">
                                <div class="flex items-center">
                                    <img class="w-2" src="../../assets/images/dollar.svg" alt="">
                                    <span class="#FFDF8B">量化投资</span>
                                </div>
                                <p class="mt-1">让你的财富，由你掌控</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    
            <!-- banner 09 -->
            <section class="banner-09 relative">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">元道-未来规划 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <p class="linear inline-block mt-6">全球最大最专业的社交预测平台</p>
                    <div class="md:flex gap-[0.64rem] mt-4">
                        <div class="left">
                            <div class="flex gap-[0.64rem]">
                                <div class="plate plate01">
                                    <h1>专业化</h1>
                                    <p>专业的常规预测、股市、比赛、币价趋势预测量化投资。</p>
                                </div>
                                <div class="plate plate02">
                                    <h1>平台化</h1>
                                    <p>全球最大的心理预测社交平台。</p>
                                </div>
                            </div>
                            <div class="plate plate04 mt-[0.64rem]">
                                <h1>社交化</h1>
                                <p>为全球术士与求测者的沟通交流平台。</p>
                            </div>
                        </div>
                        <div class="right plate plate03 mt-[0.64rem] md:mt-0 md:h-[16.35rem]">
                            <h1>IP化</h1>
                            <p>平台角色延伸品，风水物等手办销售。</p>
                        </div>
                    </div>
                </div>
            </section>
    
            <!-- banner 10 -->
            <section class="banner-10 relative" id="team">
                <div class="inner w-full px-2 md:px-0 md:w-[30rem] relative">
                    <div class="title w-full relative">元道团队 <img class="circle" src="../../assets/images/banner03/circle.png" alt=""></div>
                    <div class="grid grid-cols-2 md:grid-cols-5 mt-12 gap-2">
                        <div class="teams">
                            <img src="../../assets/images/banner10/pic-01.webp" alt="">
                            <h3 class="mt-1 mb-3">Shan he LEE</h3>
                            <p>首席易学专家</p>
                            <p>300年师承的独家易学密术</p>
                            <p>近30年易学苦心研究成果</p>
                            <p>享誉海外的预测实践案例</p>
                        </div>
                        <div class="teams">
                            <img src="../../assets/images/banner10/pic-05.webp" alt="">
                            <h3 class="mt-1 mb-3">市场营销｜JSW</h3>
                            <p>15年品牌营销经验，日本电通集团进行数字营销策划，后创建中视金桥数字营销平台iBCP，中国最早从事网络营销，数字营销的品牌人
曾服务于阿里巴巴、中粮我买网、华为集团、联想中国、现代汽车中国等品牌，对社交媒体运营，品牌年轻化需求有着独到见解。</p>
                        </div>
                        <div class="teams">
                            <img src="../../assets/images/banner10/pic-02.webp" alt="">
                            <h3 class="mt-1 mb-3">JACKY | Co-Founder</h3>
                            <p>Entrepreneur in Fintech</p>
                            <p>#Geek Engineert</p>
                            <p>#Blockchain Develeoer</p>
                            <p>Jacky is a devoted Web3 Explorer. He is the architect of SWFT Pro & Meta Pathwith sophisticated experience in blockchaintech development</p>
                        </div>
                        <div class="teams">
                            <img src="../../assets/images/banner10/pic-03.webp" alt="">
                            <h3 class="mt-1 mb-3">Iris  | CMO</h3>
                            <p>Brand & Marketing</p>
                            <p>#Market Disruptor</p>
                            <p>#WWebs Exglorer</p>
                            <p>Marketing head of Al company,consumerelectronic and fintech, build growth formarket disruptor through breakthroughmarketing campaigns. Loyal fandom users.</p>
                        </div>
                        <div class="teams">
                            <img src="../../assets/images/banner10/pic-04.webp" alt="">
                            <h3 class="mt-1 mb-3">Ian | Al Engineer</h3>
                            <p>Algorithm Engineer</p>
                            <p>#Composer</p>
                            <p>#Wec3 Exglerer</p>
                            <p>His research focus is Music InformationRetrieval(MIR) A growing field of research canbe used in music classification& generation etc.</p>
                        </div>
                        
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="less" scoped>
:root {
    --text-color: white;
    --header-height: 80px
}
h1, h2 {
    margin: 0;
}
.header {
    height: var(--header-height);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: 22px;
    z-index: 99;
    padding: 0 80px;
    background: rgba(0,0,0,.01);
    backdrop-filter: blur(20px);
    .logo {
        width: 166px;
    }
    nav {
        text-transform: uppercase;
        > div {
            transition: all .3s;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .arco-btn {
        color: black;
        border-color: white;
    }
}
main {
    color: white;
    height: 100vh;
    overflow: scroll;
    scroll-snap-type: y mandatory;

    > section {
        scroll-snap-align: start;
    }

    .banner-01 {
        height: 100vh;
        position: relative;
        background: url('../../assets/images/banner01/bg-01.webp') no-repeat center bottom / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .circle {
            width: 820px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            animation: rotate 25s infinite linear;
        }
    
        .inner {
            width: 960px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .title {
                font-size: 140px;
                font-family: 'YouShe';
                text-align: center;
                line-height: 1;
                color: #E2E1FF;
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
                font-size: 24px;
            }
            .descript {
                color: #E2E1FF;
                font-size: 20px;
                text-align: center;
                letter-spacing: 2px;
            }
        }
    }

    .banner-02 {
        height: 100vh;
        background: url('../../assets/images/banner02/bg-02.webp') no-repeat center bottom / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .inner {

            .line {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding-bottom: 58px;
                background: url('../../assets/images/banner02/02-line.png') no-repeat center top / 100%;
                
                .title {
                    font-weight: bold;
                    margin-top: -50px;
                }

                .gradient {
                    background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 30%, #00A3FF 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                }

                .des {
                    font-size: 24px;
                    color: white;
                }

                .dot {
                    width: 68px;
                    margin-top: 31px;
                }
            }

            .btm {
                font-size: 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .icon {
                    font-size: 0.7rem;
                    animation-name: arrow-movement;
                    animation-iteration-count: infinite;
                    animation-duration: 2s;
                    margin-top: -16px;
                    &:nth-of-type(2) {
                        animation-delay: 0.3s;
                    }
                    &:nth-of-type(3) {
                        animation-delay: 0.7s;
                    }
                }
            }
        }
    }

    .banner-03 {
        height: 100vh;
        background: url('../../assets/images/banner03/bg-03.webp') no-repeat center bottom / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .inner {
            .title {
                font-size: 50px;
                .circle {
                    position: absolute;
                    top: 2rem;
                    left: 3rem;
                    width: 108px;
                }
            }
            .right {
                width: 480px;
            }
        }
    }

    .banner-04 {
        height: 100vh;
        background: url('../../assets/images/banner04/bg-04.webp') no-repeat center bottom / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .inner {
            .title {
                font-size: 50px;
                .circle {
                    position: absolute;
                    top: 2rem;
                    left: 7rem;
                    width: 108px;
                }
            }
            .little-title {
                background: linear-gradient(90deg, #FFFFFF 0%, #63c6ff 100%);
                -webkit-background-clip: text;
                color: transparent;
                display: inline-block;
                line-height: 1.8;
                font-size: 24px;
            }
            .linear-box {
                padding: 36px 40px;
                font-size: 18px;
                border: 1px solid;
                border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
                background: rgba(0,0,0,.1);
                backdrop-filter: blur(20px);
                font-family: 'PingFang SC';
                .title {
                    font-size: 32px;
                    background: linear-gradient(90deg, #FFFFFF 0%, #63c6ff 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    display: inline-block;
                }
                .sub {
                    font-size: 24px;
                    background: linear-gradient(90deg, #FFFFFF 0%, #63c6ff 30%, #63c6ff 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    padding: 14px 0 10px;
                }
                .des {
                    background: linear-gradient(90deg, #FFFFFF 0%, #63c6ff 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    display: inline-block;
                    line-height: 1.8;
                }
            }
        }

    }

    .banner-05 {
        height: 100vh;
        background: url('../../assets/images/banner05/bg-05.webp') no-repeat center bottom / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .inner {
            h1 {
                font-size: 80px;
            }
            .j {
                font-weight: bold;
                color: #FFEBA5;
            }
            .des01 {
                display: flex;
                align-items: center;
                >img {
                    transform: rotate(90deg);
                    margin: 0 40px 0 auto;
                    width: 5px;
                }
                >span {
                    background: linear-gradient(90deg, #FFFFFF 0%, #FFEBA5 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-size: 30px;
                }
            }
            .des02 {
                display: flex;
                align-items: center;
                >span {
                    background: linear-gradient(90deg, #FFFFFF 0%, #FFEBA5 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    font-size: 30px;
                }
            }

            .specail {
                height: 358px;
                background: url('../../assets/images/banner05/t-bg.webp') no-repeat center / 100%;
                padding-top: 55px;
                h1 {
                    font-size: 56px;
                    font-family: 'PangMenZhengDao';
                    color: #FFF0BA;
                    text-align: center;
                }
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: upright; /* 保证文字正立显示 */
                    white-space: nowrap; /* 防止文字换行 */
                    font-size: 24px;
                    color: #F5E3B2;
                    letter-spacing: 12px;
                }
            }
            .last-des {
                font-size: 22px;
                background: linear-gradient(90deg, #FFFFFF 0%, #F5E3B2 100%);
                -webkit-background-clip: text;
                color: transparent;
                margin-top: 42px;
                text-align: center;
            }
        }
    }

    .banner-06 {
        min-height: 100vh;
        background: url('../../assets/images/banner06/bg-06.webp') no-repeat center top / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 180px 0;
        .title {
            font-size: 50px;
            .circle {
                position: absolute;
                top: 2rem;
                left: 7rem;
                width: 108px;
            }
        }

        .r {
            max-width: 600px;
            position: relative;
            .line {
                position: absolute;
                width: 600px;
                right: -2rem;
                bottom: -2rem;
            }
        }

        .l {
            max-width: 670px;
            background: url('../../assets/images/banner06/06-line02.webp') no-repeat center top / 100%;
            padding: 30px 46px;
        }
    }

    .banner-07 {
        height: 100vh;
        background: url('../../assets/images/banner07/bg-07.webp') no-repeat center top / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 180px 0;
        .title {
            font-size: 50px;
            .circle {
                position: absolute;
                top: 2rem;
                left: 7rem;
                width: 108px;
            }
        }

        .r {
            max-width: 600px;
            position: relative;
            .line {
                position: absolute;
                width: 600px;
                right: -2rem;
                bottom: -2rem;
            }
        }
    }

    .banner-08 {
        height: 100vh;
        background: url('../../assets/images/banner08/bg-08.webp') no-repeat center top / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 180px 0;
        .title {
            font-size: 50px;
            .circle {
                position: absolute;
                top: 2rem;
                left: 7rem;
                width: 108px;
            }
        }

        .panel {
            border: 1px solid;
            border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
            background: rgba(0,0,0,.1);
            backdrop-filter: blur(20px);
            font-family: 'PingFang SC';

            > p {
                font-size: 18px;
                background: linear-gradient(90deg, #FFFFFF 30%, #00A3FF 100%);
                background-clip: text;
                color: transparent;
                > span {
                    color: #FFC120;
                }
            }

            .linear {
                display: inline-block;
                background: linear-gradient(90deg, #FFFFFF 30%, #00A3FF 100%);
                background-clip: text;
                color: transparent;
                position: relative;
                &::after {
                    content: '';
                    width: 46px;
                    height: 46px;
                    position: absolute;
                    right: -0.5rem;
                    top: -0.2rem;
                    background: url('../../assets/images/banner08/decorate-pic.png') no-repeat center / 100%;
                }
            }

            .skew {
                .skew-i {
                    text-align: center;
                    font-size: 24px;
                    line-height: 2;
                    padding: 0 20px;
                    margin-left: 52px;
                    background: linear-gradient(90deg, #FFFFFF 0%, #00E7FB 100%);
                    background-clip: text;
                    color: transparent;
                    border: 1px solid;
                    border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
                    transform: skewX(-15deg);
                }
            }

        }
        .l {
            width: 670px;
            position: relative;
            z-index: 1;
            .little-panel {
                position: absolute;
                width: 387px;
                border: 1px solid;
                border-image: linear-gradient(27deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.48)) 1 1;
                background: rgba(0,0,0,.05);
                backdrop-filter: blur(20px);
                font-size: 24px;
                right: 20px;
                bottom: 20px;
                z-index: 2;
                padding: 24px 34px;
            }
        }
    }

    .banner-09 {
        min-height: 100vh;
        background: url('../../assets/images/banner09/bg-09.webp') no-repeat center top / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 180px 0;
        .title {
            font-size: 50px;
            .circle {
                position: absolute;
                top: 2rem;
                left: 7rem;
                width: 108px;
            }
        }
        .linear {
            background: linear-gradient(90deg, #FFFFFF 0%, #00A3FF 100%);
            -webkit-background-clip: text;
            color: transparent;
            font-size: 24px;

        }
        .plate {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            color: white;
            flex: 1;
            padding: 22px 26px;
            &.plate01 {
                height: 7.9rem;
                background: url('../../assets/images/banner09/pic-01.webp') no-repeat center top / 100%;
            }
            &.plate02 {
                height: 7.9rem;
                background: url('../../assets/images/banner09/pic-02.webp') no-repeat center top / 100%;
            }
            &.plate03 {
                background: url('../../assets/images/banner09/pic-03.webp') no-repeat center top / cover;
            }
            &.plate04 {
                height: 7.9rem;
                background: url('../../assets/images/banner09/pic-04.webp') no-repeat center top / 100%;
            }
            h1 {
                font-size: 50px;
            }
            > p {
                font-size: 24px;
            }
        }
    }

    .banner-10 {
        min-height: 100vh;
        background: url('../../assets/images/banner10/bg-10.webp') no-repeat center top / cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 180px 0;
        .title {
            font-size: 50px;
            .circle {
                position: absolute;
                top: 2rem;
                left: 7rem;
                width: 108px;
            }
        }

        .teams {
            text-align: center;
            > img {
                display: block;
                width: 100%;
            }
            h3 {
                font-size: 18px;
                text-transform: uppercase;
                color: white;
                line-height: 50px;
                background: rgba(245,227,178,0.1);
                border: 1px solid;
                border-image: linear-gradient(86deg, rgba(245, 227, 178, 0), rgba(245, 227, 178, 1), rgba(245, 227, 178, 0)) 1 1;
            }
            > p {
                font-size: 16px;
                line-height: 2;
            }
        }
    }
}

@keyframes rotate {
    to {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    from {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes arrow-movement {
  0% {
    opacity: 0;
    transform: translateY(3px);
  }
  50% {
    opacity: 1;
    transform: translateY(6px);
  }
  100% {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>