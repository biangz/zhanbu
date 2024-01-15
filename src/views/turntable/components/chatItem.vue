<script setup>
import { ref } from 'vue';
import { isvueComponent } from '@/utils';
import MyTypeIt from '@/components/TypeIt.vue';
import Qike from './qike.vue';
import SelectDifen from './selectDifen.vue';
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
    emit('select', e.number)
}

const handleFinish = (e) => {
    emit('finish', e)
}

</script>

<template>
    <div
        class="chat-item" 
        :class="[props.item.isAi ? 'ai' : 'mine']"
    >
        <template v-if="props.item.isAi">
            <select-difen v-if="props.item.type == 2" @change="getSelectNumber"  />
            <qike v-else-if="props.item.type == 3" :difen="props.item.difen" @finish="handleFinish"/>
            <div class="chat-item-text" v-else-if="props.item.type == 'loading'"><Loading /></div>
            <div class="chat-item-text" v-else>{{ props.item.content }}</div>
            <!-- <my-type-it v-else class="chat-item-text" :class-name="'chat-item' + props.item.timestamp" :values="[props.item.content]" /> -->
        </template>
        <div v-else class="chat-item-text">
            <p>{{ item.content }}</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.chat-item {
    margin: 8px 0;
    font-size: 20px;
    box-shadow: 0 8px 10px rgba(0,0,0,0.2);
    --radius: 22px;
    overflow: hidden;
    white-space: pre-line;

    &.mine {
        // background-color: #96AAF3;
        background-color: #66F132;
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

    .chat-item-text {
        padding: 10px 16px;
    }
}
</style>