<script setup>
import { defineProps, onMounted, reactive, watch, ref } from 'vue';
import { initCatques } from '@/api'
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
    '我喜欢一个女孩，她对我有意思吗？',
    '家里的老人身体健康怎么样？',
    '我现在工作的地方对我的发展有利吗？',
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

const randomList = () => {
    const selectedQuestions = [];
    const questionsCopy = defaultQuestionList.value.slice();

    while (selectedQuestions.length < 8 && questionsCopy.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionsCopy.length);
        const selectedQuestion = questionsCopy.splice(randomIndex, 1)[0];
        selectedQuestions.push(selectedQuestion);
    }

    console.log('selectedQuestions>', selectedQuestions)
    return selectedQuestions
}

onMounted(() => {
    initCatques().then(res => {
        questionList.list = res.data || randomList()
    })
})
</script>

<template>
    <div class="question-list">
        <div class="question"
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
    width: 100%;
    overflow: scroll;
    .question {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 6px;
        .question-item {
            background-color: #66F132;
            font-size: 14px;
            color: black;
            padding: 6px 24px;
            border-radius: 99px;
            cursor: pointer;
            text-transform: uppercase;
            flex-shrink: 0;
            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>