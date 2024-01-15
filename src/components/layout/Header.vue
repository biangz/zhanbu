<template>
    <header class="stiky top-0 w-full flex items-center md:px-3">
        <!-- <Logo class="logo block w-7" @click="$router.push('/')" /> -->
        <!-- <div class="flex items-center gap-x-4 ml-auto">
            <a-dropdown trigger="hover" v-if="authStore.user">
                <button class="login-button">{{ authStore.user.name }}</button>
                <template #content>
                    <a-doption @click="signOut">Logout</a-doption>
                </template>
            </a-dropdown>
            <button v-show="!authStore.user" class="login-button" id="customBtn">Login</button>
            
        </div> -->
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
    box-sizing: border-box;
    height: var(--header-height);
    background: linear-gradient(to left, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.20));
    position: relative;
    // box-shadow: 0px 0px 82px 0px rgba(150, 170, 243, 0.60);
    backdrop-filter: blur(14px);
    object-fit: cover;

    .login-button {
        font-size: 24px;
        color: white;
        background-color: #C5A75A;
        border-radius: 99px;
        border: none;
        padding: 14px 24px;
        cursor: pointer;
    }
}
</style>