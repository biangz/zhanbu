<script setup>
import { defineProps, onMounted, reactive } from 'vue';
const props = defineProps({
    type: {
        default: 'primary'
    }
})
const emits = defineEmits(['change'])


// 常用问题
const questionList = reactive({
    list: []
})

const handlePreviewQuestion = (q) => {
    emits('change', q)
}

onMounted(() => {
    if (props.type == 'primary') {
        questionList.list = [
            '看看财运怎么样？',
            '看看运势如何？',
            '我的事业发展怎么样？',
            '我和女朋友发展怎么样？',
            '我和男朋友发展怎么样？',
            '婚姻情感测试',
            '我的工作有发展空间吗？',
            '我想到外地发展怎么样？',
            '我能赚到钱吗？',
            '最近身体不舒服，有没有什么问题？',
            '最近运气怎么样？',
            '我有个客户能成交吗？',
            '职位有晋升空间吗',
        ]
    } else {
        questionList.list = [
            'BTC',
            'ETH',
        ]
    }
})
</script>

<template>
    <div class="question-list">
        <p class="title">不确定要问什么？试试点击这里⬇</p>
        <div class="question">
            <p 
                class="question-item" 
                :data-aos-delay="500 * i" 
                data-aos="fade-up" 
                data-aos-offset="0"
                v-for="(item, index) in questionList.list" 
                :key="index"
                @click="handlePreviewQuestion(item)"
            >{{ item }}</p>
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
            padding: 12px;
            border-radius: 99px;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>