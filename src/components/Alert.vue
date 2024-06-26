<script setup>
import { ref, onMounted, watch } from "vue";
import Loading from "./Loading.vue";

const emit = defineEmits(["update:modelValue", "close", "confirm"]);
const show = ref();
const props = defineProps({
    cancleText: {
        default: "取消",
        require: true,
    },
    confirmText: {
        default: "确认",
        require: true,
    },
    message: "",
    title: "警告",
    modelValue: false,
    disabled: false
});

const cancelFn = () => {
    emit("close");
};

const comfirmFn = () => {
    emit("confirm")
};

watch(
    () => props.modelValue,
    (val) => {
        // ...
    }
);
</script>

<template>
    <div class="text-center" v-show="modelValue">
        <div class="mask"></div>
        <div role="alert" class="alert rounded-xl border border-gray-100 bg-white p-4">
            <div class="flex items-start gap-4">
                <div class="flex-1">
                    <strong class="block text-base font-medium text-gray-900"> {{ props.title }} </strong>

                    <p class="mt-1 text-sm text-gray-700">{{ props.message }}</p>

                    <div class="mt-4">
                        <button :disabled="props.disabled" @click="comfirmFn" class="button finish">
                            <span class="text-sm"><Loading v-if="props.disabled" />{{ props.confirmText }}</span>
                        </button>
                        <button @click="cancelFn" class="button mt-4">
                            <span class="text-sm">{{ props.cancleText }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.alert {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 20;
}
.mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 19;
}
.button {
    border: none;
    border: 1px solid #ffd277;
    display: block;
    border-radius: 99px;
    padding: 36px;
    background-color: transparent;
    color: black;
    width: 100%;
    font-size: 48px;
    &.finish {
        background-color: #ffd277;
        color: black;
    }
    &[disabled] {
        opacity: 0.6;
    }
}
</style>
