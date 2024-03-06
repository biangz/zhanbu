<template>
    <header class="stiky top-0 w-full flex items-center md:px-3">
        <Logo class="logo block w-13" @click="$router.push('/homepage')" />
        <div class="flex items-center gap-x-4 ml-auto">
            <a-dropdown trigger="hover" v-if="authStore.user">
                <button class="login-button">{{ authStore.user.name }}</button>
                <template #content>
                    <a-doption @click="signOut">Logout</a-doption>
                </template>
            </a-dropdown>
            <button v-show="!authStore.user" class="login-button" id="customBtn">Login</button>
            
        </div>
    </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth'
import { loadGapiInsideDOM, loadAuth2 } from 'gapi-script';
import { ref } from 'vue';

const authStore = useAuthStore()

const handleCredentialResponse = (response) => {
    authStore.setToken(response.credential)
    console.log("Encoded JWT ID token: " + response.credential);
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
    authStore.setGoogleUser(currentUser)

    if (!authStore.token) {
        // 获取 token
        await authStore.userLoginToken(currentUser.getAuthResponse().id_token).then(async () => {
            if (!authStore.user) {
                await authStore.userLoginInfo()
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
        authStore.Logout()
    });
}

onMounted(async () => {

    const newGapi = await loadGapiInsideDOM();

    if (newGapi) {
        setAuth2()
    }
})

const handleSelect = (v) => {
    authStore.Logout()
};

</script>

<style scoped lang="less">
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: 22px;
    z-index: 99;
    padding: 0 80px;
    background: rgba(0,0,0,.01);
    backdrop-filter: blur(20px);
    box-sizing: border-box;
    height: var(--header-height);

    .login-button {
        
        font-size: 24px;
        color: black;
        background-color: white;
        border-radius: 99px;
        border: none;
        padding: 14px 24px;
        cursor: pointer;
    }
}
</style>