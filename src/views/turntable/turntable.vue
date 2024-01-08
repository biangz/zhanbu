
<script setup>
import { reactive, ref, markRaw, onMounted } from 'vue';
import { useAuthStore } from '@/store'
import { SpwsClient, calculateShenKe } from '@/api';
import ChatItem from './components/chatItem.vue';
const userStore = useAuthStore()
const chatroomContent = ref(null)
let ws = null;

// 用户选择的数字
const userSelectNumber = ref(0);
const sendMessage = ref('')
const showError = ref(false)
const isSend = ref(false)
const calId = ref(0)


// 聊天列表
const chatList = reactive({
    list: []
})

onMounted(() => {
    getHistory()

    // 创建聊天室
    createChat()
})

const createChat = () => {
    let wss = import.meta.env.VITE_APP_WSS_API + '/api/v1/ws/chat'
    ws = new SpwsClient(wss)
    
    ws.setOnMessageCallback((event) => {
        const message = event.data
        if (message == 'pong') {
            return
        }

        let ret = JSON.parse(message)
        if(ret.code == 0) {
            // 找到最后一个 loading 元素 || 未完成回答的元素
            let i = chatList.list.findIndex((v) => {
                return v.type == 'loading' || v.id == ret.data.Id
            })
            console.log('i:', i)
            if (i > -1) {
                let msg = (chatList.list[i].content || '') + ret.data.Content
                changeChatListItem(i, {
                    isAi: true,
                    id: ret.data.Id,
                    timestamp: ret.data.ReplyTs,
                    content: msg,
                })
            }
        }
        isSend.value = false
        elementScroll()
    })
}

// 历史记录
const getHistory = () => {
    pushChatList({ isAi: true, type: 2 })
}

// 处理聊天列表
const pushChatList = (obj) => {
    chatList.list.push({ timestamp: Date.now(),  ...obj })
}

// 修改聊天内容
const changeChatListItem = (i, obj) => {
    chatList.list[i] = { ...obj, type: '' }
}

// scroll smooth
const elementScroll = () => {
    chatroomContent.value.scrollTo({ 
        top: chatroomContent.value.scrollTop + chatroomContent.value.clientHeight, 
        behavior: 'smooth'
    })
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
    pushChatList({
        isAi: true,
        content: '请说出你的问题',
    })
    // 0 人元 1 贵神 2 神将 3 地分
    calculateShenKe({
        dizhi: `${e.renyuan}${e.guijiang}${e.shenjiang}${e.difen}`
    }).then(res => {
        console.log('::::>>', res)
        calId.value = res.data.cal_id
    })
}

// 发送用户输入的内容
const handleSendMessage = () => {
    if (!sendMessage.value) {
        showError.value = true
        return;
    }

    showError.value = false

    // 构建要发送的消息对象，匹配服务器的Request结构体
    const messageToSend = {
        type: 'chat_follow', // 根据需要更改
        method: 'chatGPT', // 根据需要更改
        timestamp: Date.now(),
        ascode: '0001', //狐仟秋 
        lan: 'zh-CN', //
        devid: '1', // 如果有设备ID，请替换
        userid: userStore.user?.id || 0,
        data: sendMessage.value,
        calid: calId.value
    }

    // 发送消息到服务器
    isSend.value = true
    ws.send(JSON.stringify(messageToSend))

    pushChatList({
        ...messageToSend,
        isAi: false,
        content: sendMessage.value,
    })
    // 预先获取一条数据
    pushChatList({
        isAi: true,
        type: 'loading',
    })
    sendMessage.value = ''
    setTimeout(() => {
        elementScroll()
    }, 300)
}


</script>

<template>
    <div class="turntable-container">

        <div class="inner gap-y-2">

            <div class="chat-title flex items-center w-full py-2">
                <i @click="$router.go(-1)" class="icon i-solar-map-arrow-left-bold"></i>
                <div class="title-box flex-1 ml-2">
                    <p class="font-bold">{{ userStore.user?.name ? userStore.user.name : 'nickname' }}</p>
                    <p class="mt-1 text-[#9E9587]">{{ userStore.user?.email ? userStore.user.email : 'email-email' }}</p>
                </div>
                <i class="icon i-solar-share-bold"></i>
            </div>

            <!-- 聊天对话 -->
            <div class="chat-main w-full" ref="chatroomContent">
                <chat-item class="flex-shrink-0" v-for="item, index in chatList.list" :item="item" :key="index" @select="handleSelectDifen" @finish="qikeFinish" />
            </div>

            <div v-if="userSelectNumber" class="input-main flex items-center gap-x-4 w-full my-2 px-4 py-1" :class="[showError?'error':'']">
                <input v-model="sendMessage" @keyup.enter="handleSendMessage" type="text" placeholder="Type a message" :class="[showError?'error':'']">
                <a-button :loading="isSend" type="text" @click="handleSendMessage" class="send-button"><i class="i-solar-archive-up-minimlistic-bold-duotone"></i></a-button>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;

        .chat-title {
            border-bottom: 1px solid #333636;
            .title-box {
                font-size: 22px;
                padding: 0;
                line-height: 1;
            }
            i {
                font-size: 24px;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            }
        }

        .chat-main {
            height: calc(100vh - 55px - 80px);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            overflow-x: hidden;
            overflow-y: auto;
            ::-webkit-scrollbar {
                display: none; /* Chrome Safari */
            }
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
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
                // font-size: 40px;
            }
        }
    }
    
}
</style>