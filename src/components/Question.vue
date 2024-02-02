<script setup>
import { defineProps, onMounted, reactive, watch, ref } from 'vue';
import { coinList } from '@/api'
const props = defineProps({
    type: {
        default: 'primary'
    }
})
const emits = defineEmits(['change'])


// 常用问题
const coinQuestionList = ref([])
const defaultQuestionList = ref([
    '我最近想换个工作，新的工作会比现在好吗?',
    '看看今年会不会遇到贵人帮助我在事业上发展?',
    '我今年有新的项目做吗？',
    '我和男朋友发展会怎么样，会结婚吗？',
    '我喜欢一个女孩，我能追求到吗，她对我有意思吗？',
    '家里的老人身体健康怎么样？',
    '我现在工作的地方对我的发展有利吗，领导对我评价怎么样？',
    '我想到外地发展怎么样，会比现在好吗？',
    '我的宠物身体健康怎么样？',
    '最近身体不舒服，有没有什么问题？',
    '最近投标一个项目，能顺利中标吗？',
    '最近身体不舒服，有没有什么问题？',
    '我有个客户能成交吗？',
    '职位有晋升空间吗？',
])
const questionList = reactive({
    list: []
})

const handlePreviewQuestion = (q) => {
    emits('change', q)
}

watch(
    () => props.type,
    (val) => {
        if (val == 'primary') {
            questionList.list = defaultQuestionList
        } else {
            questionList.list = coinQuestionList
        }
    }
)

onMounted(() => {
    coinList().then(res => {
        coinQuestionList.value = res.data
    })
    questionList.list = defaultQuestionList
})
</script>

<template>
    <div class="question-list">
        <p class="title">不确定要问什么？试试点击这里⬇</p>
        <div class="question" 
            :data-aos-delay="1000" 
            data-aos="fade-up" 
            data-aos-offset="0"
        >
            <p 
                class="question-item" 
                v-for="(item, index) in questionList.list" 
                :key="index"
                @click="handlePreviewQuestion(item)"
            >{{ item.chain_name || item }}</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.question-list {
    width: 320px;
    // background: rgba(200, 255, 255, 0.2);
    // border-radius: 8px;
    // margin-top: 12px;
    // padding: 0 12px;
    max-height: 100vh;
    overflow: scroll;
    .title {
        font-size: 20px;
        padding: 40px 0;
    }

    .question {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .question-item {
            background-color: #66F132;
            font-size: 18px;
            color: black;
            margin: 10px 0;
            padding: 6px 24px;
            border-radius: 99px;
            cursor: pointer;
            text-transform: uppercase;
            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>