<script setup>
import { useAuthStore } from '../../../store'
import { useRouter, useRoute } from 'vue-router';

const store = useAuthStore()
const router = useRouter()
const route = useRoute()

</script>

<template>
    <div class="side-bar" :class="[store?.showBar ? 'hide' : 'show']">
        <div class="left" @click.stop="store.setShowBar(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 21H5q-.825 0-1.412-.587T3 19v-7q0-1.875.713-3.512t1.924-2.85t2.85-1.925T12 3t3.513.713t2.85 1.924t1.925 2.85T21 12v7q0 .825-.587 1.413T19 21h-4v-8h4v-1q0-2.925-2.037-4.962T12 5T7.038 7.038T5 12v1h4z" /></svg>
        </div>
        <div v-if="route.name != 'Order'" class="left" @click.stop="router.push('/landing/order')">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="currentColor"/><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"/></svg>
        </div>
        <div v-if="route.name != 'Landing'" class="left" @click.stop="router.push('/landing')">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 20q-.825 0-1.412-.587T5 18v-7.15l-2 1.525q-.35.25-.75.213T1.6 12.2t-.2-.75t.4-.65l8.975-6.875q.275-.2.588-.3t.637-.1t.638.1t.587.3L16 6.05V5.5q0-.625.438-1.062T17.5 4t1.063.438T19 5.5v2.85l3.2 2.45q.325.25.388.65t-.188.75t-.65.388t-.75-.213l-2-1.525V18q0 .825-.587 1.413T17 20h-1q-.825 0-1.412-.587T14 18v-2q0-.825-.587-1.412T12 14t-1.412.588T10 16v2q0 .825-.587 1.413T8 20zm3-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312"/></svg>
        </div>
    </div>
    <div class="bar-content" :class="[store?.showBar ? 'show' : 'hide']">
        <div class="qrcode-box">
            <img class="qrcode" src="../../../assets/images/qrcode.jpg" alt="" />
            <p class="p">客服二维码</p>
        </div>
        <div class="phone mt-1"><a href="tel:+8615504617129">tel: 15504617129</a></div>
    </div>
</template>

<style lang="less">
.side-bar {
    position: fixed;
    z-index: 99;
    bottom: 250px;
    display: flex;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &.hide {
        right: -100px;
    }
    &.show {
        right: 0;
    }

    .left {
        background: linear-gradient(320.9deg, #db3b7b 26.47%, #ffcee2 88.86%);
        box-shadow: 2px 6px 10px 0px #0e121629;
        padding: 12px 12px 18px 22px;
        border-radius: 99px 0 0 99px;
        svg {
            width: 60px;
            height: 60px;
            color: #efefef;
            display: block;
        }
    }
}
.bar-content {
    position: fixed;
    z-index: 98;
    bottom: 250px;
    background: rgba(255, 255, 255, 0.8);
    width: 700px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px 0 0 20px;
    padding: 26px 40px;
    transition: all 0.3s;
    box-sizing: border-box;

    &.hide {
        right: -705px;
    }
    &.show {
        right: 0;
    }

    .qrcode-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .qrcode {
            width: 100%;
            display: block;
            border: 1px solid black;
        }
        .p {
            text-align: center;
            font-size: 50px;
            color: black;
        }
    }
    .phone {
        color: black;
        font-size: 50px;
    }
}
</style>
