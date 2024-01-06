<template>
    <p :class="['simpleUsage', className]"></p>
</template>

<script setup>
import TypeIt from 'typeit';
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    /** 打字速度，以每一步之间的毫秒数为单位 */
    speed: {
      type: Number,
      default: 80,
    },
    values: {
      type: Array,
      defalut: [],
    },
    className: {
      type: String,
      default: 'type-it',
    },
    cursor: {
      type: Boolean,
      default: false,
    }
})

onMounted(() => {
    new TypeIt(`.${props.className}`, {
      strings: props.values,
        speed: props.speed,
        cursor: props.cursor,
        waitUntilVisible: true,
    }).go();
})

</script>