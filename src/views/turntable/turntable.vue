
<script setup>
import { reactive, ref, markRaw, onMounted } from 'vue';
import { useAuthStore } from '@/store'
import { SpwsClient, calculateShenKe } from '@/api';
import { loadGapiInsideDOM, loadAuth2 } from 'gapi-script';
import { useRouter } from 'vue-router'
import Decimal from 'decimal.js';
import ChatItem from './components/chatItem.vue';
import UserInput from './components/selectDifen.vue'
import Question from '@/components/Question.vue'
import StockInput from './components/stockInput.vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const router = useRouter()
const userStore = useAuthStore()
const chatroomContent = ref(null)
const showQuestion = ref(true)
let ws = null;

// 用户选择的数字
const sendMessage = ref('')
const showError = ref(false)
const isSend = ref(false)
const calId = ref(0)

// 聊天列表
const chatList = reactive({
    list: []
})

onMounted(async () => {
    getHistory()

    // 创建聊天室
    createChat()

    const newGapi = await loadGapiInsideDOM();

    if (newGapi) {
        setAuth2()
    }
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
        } else if (ret.code == 201 || ret.code == 202 || ret.code == 203) { // code 2001 2002 2003
            isSend.value = false
        } else {
            console.log('error')
        }
        elementScroll()
    })
}

// 起课完成
const qikeFinish = (e) => {
    if (userStore.forcastType == 1) {
        pushChatList({ isAi: true, content: '所求何事在这里与老夫沟通' })
    }
    // 0 人元 1 贵神 2 神将 3 地分
    calculateShenKe({
        dizhi: `${e.renyuan}${e.guijiang}${e.shenjiang}${e.difen}`,
        kongwang: e.requestParamsKW.join(','),
        rumu: e.requestParamsRumu.join(',')
    }).then(res => {
        if (res.code == 200) {
            calId.value = new Decimal(res.data.cal_id)
        }
    })
}

// 重新起课
const handleAgainQike = () => {
    userStore.setAgainQike()
}
// 重新起课结果
const handleAgainQikeResult = (e) => {
    userStore.setForcastUserInput(e.number)
    getHistory()
}

// 历史记录
const getHistory = () => {
    clearChartList()
    pushChatList({ isAi: true, content: '孙膑为您起课如下：' })
    // 1. 拿到起课结果
    // 普通起课 3 ，股票起课 5
    pushChatList({ 
        isAi: true, 
        type: userStore.forcastType == 1 ? 3 : 5, 
        difen: userStore.forcastUserInput 
    })
}

// 处理聊天列表
const pushChatList = (obj) => {
    chatList.list.push({ timestamp: Date.now(),  ...obj })
}

// 修改聊天内容
const changeChatListItem = (i, obj) => {
    chatList.list[i] = { ...obj, type: '' }
}

// 删除聊天记录
const deleteChatList = (i) => {
    chatList.list.splice(1, 2)
}

// 清理聊天记录
const clearChartList = () => {
    chatList.list = []
}

// scroll smooth
const elementScroll = () => {
    chatroomContent.value.scrollTo({ 
        top: chatroomContent.value.scrollTop + chatroomContent.value.clientHeight, 
        behavior: 'smooth'
    })
}

// 用户输入数字处理
const handleSelectDifen = (e) => {
    let value = e.number
    
    pushChatList({ isAi: false, content: value })

    // 选择了数据之后，计算起课，并且显示 input 输入框
    pushChatList({ isAi: true, type: e.type == 'primary' ? 3 : 5, difen: value })
}

// 选择预设问题
const handlePreviewQuestion = (question) => {
    sendMessage.value = question
    showQuestion.value = false
    handleSendMessage()
}

// 发送用户输入的内容
const handleSendMessage = () => {
    if (!sendMessage.value) {
        showError.value = true
        return;
    }

    if (!userStore.token) {
        showQuestion.value = true
        return $toast.warning('请登录体验完整功能');
    }

    showError.value = false

    if (isSend.value) return;

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


const setAuth2 = async () => {
    const auth2 = await loadAuth2(gapi, import.meta.env.VITE_GOOGLE_CLIENT, '')
    if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get())
    } else {
        attachSignin(document.getElementById('customBtn'), auth2);
    }
}

const updateUser = async (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    userStore.setGoogleUser(currentUser)

    if (!userStore.token) {
        // 获取 token
        await userStore.userLoginToken(currentUser.getAuthResponse().id_token).then(async () => {
            if (!userStore.user) {
                await userStore.userLoginInfo()
            }
        })
    }
};

const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(element, {},
        (googleUser) => {
            setAuth2()
        }, (error) => {
            console.log(JSON.stringify(error))
        });
};

const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        userStore.Logout()
    });
}

const goBack = () => {
    router.go(-1)
}


</script>

<template>
    <div class="turntable-container">

        <div class="inner">
            <!-- <Question :type="currentType" @change="handlePreviewQuestion" /> -->
            <div class="inner-chat">
    
                <div class="chat-title w-full">
                    <div class="header flex items-center py-2">
                        <i @click="goBack()" class="i-solar-double-alt-arrow-left-linear mr-2"></i>
                        <div class="title-box flex-1">
                            <p v-if="userStore.user?.name" class="font-bold capitalize">{{ userStore.user?.name }}</p>
                            <p v-else id="customBtn" class="font-bold capitalize cursor-pointer">Login</p>
                            <p v-if="userStore.user?.email" class="mt-1 text-[#9E9587]">{{ userStore.user?.email }}</p>
                        </div>
                        <div class="flex items-center">
                            <a-tooltip content="点击重新起课断事">
                                <i @click="handleAgainQike" class="icon i-solar-restart-bold"></i>
                            </a-tooltip>
                        </div>
                    </div>
                </div>

                <!-- 重新起课 -->
                <div v-if="!userStore.forcastUserInput">
                    <UserInput v-if="userStore.forcastType == 1" @change="handleAgainQikeResult" />
                    <StockInput v-else @change="handleAgainQikeResult" />
                </div>
                <div v-else class="inner-chat-inner">
                    <!-- 聊天对话 -->
                    <div class="chat-main w-full" ref="chatroomContent">
                        <chat-item class="flex-shrink-0" v-for="item, index in chatList.list" :item="item" :key="index" @select="handleSelectDifen" @finish="qikeFinish" />
                    </div>

                    <Question v-if="showQuestion && userStore.forcastType == 1" @change="handlePreviewQuestion"/>
        
                    <div class="input-main flex items-center gap-x-4 w-full my-2 px-4 py-1" :class="[showError?'error':'']">
                        <input v-model="sendMessage" @keyup.enter="handleSendMessage" type="text" placeholder="Type a message" :class="[showError?'error':'']">
                        <a-button :loading="isSend" type="text" @click="handleSendMessage" class="send-button"><i class="i-solar-archive-up-minimlistic-bold-duotone"></i></a-button>
                    </div>
                </div>
    
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.turntable-container {
    color: var(--text-color);
    height: 100vh;
    // background: url('../assets/light-logo.svg') no-repeat center center / 1000px, radial-gradient(at 60% 60px, #545454, #282828); 

    .inner {
        max-width: 1400px;
        gap: 40px;
        display: flex;
        align-items: flex-start;
        margin: 0 auto;
        
        .inner-chat {
            flex: 1;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
    
            .chat-title {
                border-bottom: 1px solid rgba(150,170,243,0.3);

                .header {

                    .title-box {
                        font-size: 22px;
                        padding: 0;
                        line-height: 1;
                    }
                    i {
                        font-size: 30px;
                        cursor: pointer;
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
                .tab-box {
                    display: flex;
                    align-items: center;
                    .arco-btn {
                        border: 0 0 0 0;
                    }
                }
            }

            .inner-chat-inner {
                width: 100%;
                height: calc(100vh - 80px);
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .chat-main {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 24px 0;
                ::-webkit-scrollbar {
                    display: none; /* Chrome Safari */
                }
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE 10+ */
            }
    
            .input-main {
                border: 1px solid #66F132;
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
    
}
</style>