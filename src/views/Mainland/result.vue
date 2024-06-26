<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '../../store'
import { getResult } from '../../api'
import { useRoute } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import Assitant from './components/assistant.vue'

const store = useAuthStore()
const result = ref<string>('')
const route = useRoute()

onMounted(() => {
    if (route.query.orderno) {
        getResult({
            order_no: route.query.orderno
        }).then(res => {
            if (res.code == 200) {
                result.value = res.data.res
            } else {
    
            }
        })
    } else {
        Message.normal('订单错误')
    }
})

</script>

<template>
    <div class="result-container whitespace-pre-line">
        {{ result }}
    </div>
    <Assitant/>
</template>

<style scoped lang="less">
.result-container {
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 48px;
    font-family: 'ZhongQi';
}
</style>