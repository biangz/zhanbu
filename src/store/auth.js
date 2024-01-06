import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils'
import { googleLogin, loginUserInfo } from '@/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        _googleUserInfo: null,

        _token: getToken() || '',
        _user: null,
    }),
    getters: {
        googleUserInfo: (state) => state._googleUserInfo,
        token: state => state._token,
        user: state => state._user,
    },
    actions: {
        setToken(t) {
            this._token = t
        },

        setGoogleUser(info) {
            this._googleUserInfo = info
        },

        userLoginToken(id_token) {
            return new Promise((resolve, reject) => {
                googleLogin({
                    idToken: id_token
                }).then(res => {
                    if (res.code == 200) {
                        this._token = res.data.token
                        setToken(this._token)
                        resolve(res)
                    } else {
                        reject()
                        disconnect()
                    }
                })
            })
        },
        
        userLoginInfo() {
            return new Promise((resolve, reject) => {
                loginUserInfo().then(res => {
                    if (res.code == 200) {
                        this._user = res.data.user
                        resolve(res)
                    } else {
                        reject()
                        disconnect()
                    }
                })
            })  
        },
        Logout() {
            removeToken()
            this._token = ''
            this._user = null
        }
    },
})