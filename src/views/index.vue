<template>
    <div class="index-container">
        <div class="typing animate" @click="handleGotoChat"></div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router';
import { ref, onMounted, reactive } from 'vue';
import { IconClose, IconArrowRight } from '@arco-design/web-vue/es/icon';
import AOS from "aos";

const store = useAuthStore()
const router = useRouter()

const handleIncrece = () => {
    store.increment()
}

const handleGotoChat = () => {
  router.push('/turn')
}

// onMounted
onMounted(() => {
    AOS.init();
    console.log(store.token)
})

</script>

<style scoped lang="less">
@keyframes type {
  from {
    width: 0;
  }
  to {
    width: 21ch;
  }
}

@keyframes type2 {
  from {
    width: 16ch;
    content: "Hello, I'm Chrissy. "
  }
  to {
    width: 20ch;
    content: "Hello, I'm Chrissy. "
  }
}

@keyframes type3 {
  from {
    width: 20ch;
    content: "Hello, I'm Chrissy. Welcome to my Website!"
  }
  to {
    width: 42ch;
    content: "Hello, I'm Chrissy. Welcome to my Website!"
  }
}

@keyframes writer {
  50% {
    border-color: transparent;
  }
}

@keyframes delete {
  from {
    width: 21ch;
  }
  to {
    width: 16ch;
  }
}

.index-container {
    min-height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: url('../assets/light-logo.svg') no-repeat center center / 1000px, radial-gradient(at 60% 60px, #545454, #282828); 
    .typing {
        font-weight: bold;
        &.animate {
            width: 21ch;
            border-right: 0.1em solid var(--text-color);
            font-family: monospace;
            font-size: 48px;
            animation: type 2.5s steps(20), writer 1s infinite alternate;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            &::before { 
                content: "命运指尖，点击占卜乐趣 →";
                // animation: type2 1s steps(4) 3s forwards, type3 3s steps(22, end) 6s forwards;
            }
        }
    }
}
</style>