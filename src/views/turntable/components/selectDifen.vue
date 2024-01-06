<template>
    <div class="difen-main">
        <dl>
            <dt class="title">
                <MyTypeIt :class-name="'select-number-title'" :values="['先让我们来选一个你喜欢的数字开始吧：']" /></dt>
            <dd class="content flex items-center gap-1 flex-wrap" data-aos-delay="500" data-aos="fade-up">
                <a-button 
                    v-for="item,index in numberList" 
                    :key="item" 
                    class="number-button" 
                    shape="round" 
                    status="warning" 
                    type="primary"
                    @click="handleSelectNumber(item)"
                >{{ item }}</a-button>
            </dd>
        </dl>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AOS from 'aos';
import MyTypeIt from '@/components/TypeIt.vue';
const numberList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

const emit = defineEmits(['change'])

const handleSelectNumber = (number) => {
    emit('change', {
        type: 'difen',
        number: number
    })
}

onMounted(() => {
    AOS.init()
})

</script>

<style scoped lang="less">
.difen-main {
    .number-button {
        // background: black;
        // color: var(--text-color);

    }
    .title {
        background: black;
        padding: 18px 18px;
    }
    .content {
        padding: 18px;
    }
}
</style>