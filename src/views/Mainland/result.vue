<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { Console } from '../../utils'
import { useAuthStore } from '../../store'
import { getResult } from '../../api'

const store = useAuthStore()
const result = ref<string>('')

onMounted(() => {
    getResult({
        order_no: store.orderno
    }).then(res => {
        if (res.code == 200) {
            Console(res.data)
            result.value = res.data.res
        } else {

        }
    })
})

</script>

<template>
    <div class="whitespace-pre-line">
        {{ result }}
    </div>
</template>

<style>

</style>