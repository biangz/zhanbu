
<script setup>
import { reactive, ref, markRaw, onMounted } from 'vue';
import { useAuthStore } from '@/store'
import { SpwsClient } from '@/api';
import ChatItem from './components/chatItem.vue';
const userStore = useAuthStore()
const ws = null;

// 用户选择的数字
const userSelectNumber = ref(0);
const sendMessage = ref('')
const showError = ref(false)

// 聊天列表
const chatList = ref([])

onMounted(() => {
    getHistory()

    // 创建聊天室
    createChat()
})

const createChat = () => {
    // let wss = import.meta.env.VITE_APP_WSS_API + '/api/v1/ws/chat'
    let wss = 'ws://eli-api.fenus.xyz/api/v1/ws/chat'
    ws = new SpwsClient(wss)
    
    ws.setOnMessageCallback((event) => {

    })
}

const handleSend = () => {
    const d = {
        type: 'chat_init',
        method: 'chatGPT',
        lan: "zh-CN",
        ascode: charObj.value.code,
        timestamp: Date.now(),
        userid: 0,
        devid: devId,
        data: sendMessage.value,
        content: inputMsg,
        isMe: true,
    }
    ws.send(JSON.stringify(d))
}

// 历史记录
const getHistory = () => {
    pushChatList({ isAi: true, type: 2 })
}

// 处理聊天列表
const pushChatList = (obj) => {
    chatList.value.push({ ...obj, createTime: (new Date()).getTime() })
}

// 用户选择的数字
const handleSelectDifen = (e) => {
    let value = e
    if (!userSelectNumber.value) {
        pushChatList({ isAi: false, content: value })

        // 选择了数据之后，计算起课，并且显示 input 输入框
        pushChatList({ isAi: true, type: 3, difen: value })
        userSelectNumber.value = value
    }
}

// 起课完成
const qikeFinish = (e) => {
    console.log(':::起课完成:::', e)
}

// 用户输入的内容
const handleSendMessage = () => {
    if (!sendMessage.value) {
        showError.value = true
        return;
    }

    showError.value = false
    chatList.value.push({
        isAi: false,
        content: sendMessage.value,
        createTime: (new Date()).getTime()
    })

    sendMessage.value = ''
}


</script>

<template>
    <div class="turntable-container">

        <div class="inner gap-y-2">

            <div class="chat-title flex items-center w-full py-2">
                <i @click="$router.go(-1)" class="i-solar-map-arrow-left-bold text-xs"></i>
                <div class="title-box flex-1 ml-2">
                    <p class="font-bold">{{ userStore.user?.name ? userStore.user.name : 'nickname' }}</p>
                    <p class="mt-1 text-[#9E9587]">{{ userStore.user?.email ? userStore.user.email : 'email-email' }}</p>
                </div>
                <i class="i-solar-share-bold text-xs"></i>
            </div>

            <!-- 聊天对话 -->
            <div class="chat-main w-full">
                <chat-item v-for="item, index in chatList" :item="item" :key="index" @select="handleSelectDifen" @finish="qikeFinish" />
            </div>

            <div v-if="userSelectNumber" class="input-main flex items-center gap-x-4 w-full my-2 px-4 py-1" :class="[showError?'error':'']">
                <input v-model="sendMessage" @keyup.enter="handleSendMessage" type="text" placeholder="Type a message" :class="[showError?'error':'']">
                <a-button type="text" @click="handleSendMessage" class="send-button"><i class="i-solar-archive-up-minimlistic-bold-duotone"></i></a-button>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="less">
.turntable-container {
    color: var(--text-color);
    height: 100vh;
    background: url('../assets/light-logo.svg') no-repeat center center / 1000px, radial-gradient(at 60% 60px, #545454, #282828); 

    .inner {
        max-width: 1000px;
        height: 100vh;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .chat-title {
            border-bottom: 1px solid #333636;
            .title-box {
                font-size: 28px;
                padding: 0;
                line-height: 1;
            }
            i {
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            }
        }

        .chat-main {
            flex: 1;
            display: flex;
            flex-direction: column;

            
        }

        .input-main {
            border: 1px solid rgba(255,255,255, 0.3);
            border-radius: 99px;
            &.error {
                border-color: #C14E56;
            }

            > input {
                background: transparent;
                font-size: 24px;
                border: none;
                outline: none;
                color: var(--text-color);
                flex: 1;
                &.error {
                    &::placeholder {
                        color: #C14E56;
                    }
                }
            }
            .send-button {
                color: var(--text-color);
                font-size: 40px;
            }
        }
    }
    
}
</style>