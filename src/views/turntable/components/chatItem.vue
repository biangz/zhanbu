<script setup>
import { onMounted } from 'vue';
import { isvueComponent } from '@/utils';
import MyTypeIt from '@/components/TypeIt.vue';
import Qike from './qike.vue';
import StockInput from './stockInput.vue';
import SelectDifen from './selectDifen.vue';
import Stock from './stock.vue';
import Loading from '@/components/Loading.vue'
const emit = defineEmits(['change', 'select', 'finish'])
const props = defineProps({
    item: {
        type: Object,
        require: true,
    },
})

// 用户选择的数字
const getSelectNumber = (e) => {
    emit('select', {
        number: e.number,
        type: e.type
    })
}

const handleFinish = (e) => {
    emit('finish', e)
}

onMounted(() => {
    // 
})

</script>

<template>
    <div
        class="chat-item" 
        :class="[props.item.isAi ? 'ai' : 'mine']"
    >
        <img v-if="props.item.isAi" class="avatar" src="../../../assets/images/sunbin.png" alt="">
        <div class="chat-inner" :class="[props.item.isAi ? 'ai' : 'mine']">
            <template v-if="props.item.isAi">
                <!-- <select-difen v-if="props.item.type == 2" @change="getSelectNumber"  />
                <StockInput v-else-if="props.item.type == 4" @change="getSelectNumber" /> -->
                <qike v-if="props.item.type == 3" :difen="props.item.difen" @finish="handleFinish"/>
                <Stock v-else-if="props.item.type == 5" :difen="props.item.difen" @finish="handleFinish"/>
                <div class="chat-item-text" v-else-if="props.item.type == 'loading'"><Loading /></div>
                <div class="chat-item-text" v-else>{{ props.item.content }}</div>
                <!-- <my-type-it v-else class="chat-item-text" :class-name="'chat-item' + props.item.timestamp" :values="[props.item.content]" /> -->
            </template>
            <div v-else class="chat-item-text">
                <p>{{ item.content }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.chat-item {
    margin: 8px 0;
    font-size: 19px;
    --radius: 22px;
    overflow: hidden;
    white-space: pre-line;
    display: flex;
    width: 100%;
    gap: 20px;
    &.mine {
        justify-content: flex-end;
    }
    &.ai {
        justify-content: flex-start;
    }

    .avatar {
        width: 56px;
        height: 56px;
        border-radius: 80px;
    }

    .chat-inner {
        &.mine {
            // background-color: #96AAF3;
            background-color: white;
            align-self: flex-end;
            color: black;
            border-radius: var(--radius) 0 var(--radius) var(--radius);
        }
        &.ai {
            background: linear-gradient(to left, rgba(200, 255, 255, 0.20), rgba(200, 255, 255, 0.20));
            position: relative;
            backdrop-filter: blur(14px);
            object-fit: cover;
            // background-color: #C5A75A;
            color: white;
            align-self: flex-start;
            border-radius: 0 var(--radius) var(--radius) var(--radius);
        }
    }

    .chat-item-text {
        padding: 10px 16px;
    }
}
</style>