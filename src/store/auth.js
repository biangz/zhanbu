import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils'
import { googleLogin, loginUserInfo } from '@/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        _googleUserInfo: null,
        _token: getToken() || '',
        _user: null,
        _forcastType: sessionStorage.getItem('forcastType') ?? 1, // 1 普通 2 股票
        _userSelectType: sessionStorage.getItem('userSelectType') ?? null,
        _forcastUserInput: sessionStorage.getItem('userInput') ?? '',
    }),
    getters: {
        googleUserInfo: (state) => state._googleUserInfo,
        token: state => state._token,
        user: state => state._user,
        forcastType: state => state._forcastType,
        userSelectType: state => state._userSelectType,
        forcastUserInput: state => state._forcastUserInput,
    },
    actions: {
        setToken(t) {
            this._token = t
        },

        setGoogleUser(info) {
            this._googleUserInfo = info
        },

        setForcastType(type) {
            this._forcastType = type
            sessionStorage.setItem('forcastType', this._forcastType)
        },

        setUserSelectType(type) {
            this._userSelectType = type
            sessionStorage.setItem('userSelectType', this._userSelectType)
        },

        setForcastUserInput(number) {
            if (!number) {
                return this._forcastUserInput = ''
            };
            this._forcastUserInput = number
            sessionStorage.setItem('userInput', this._forcastUserInput)
        },

        setAgainQike(again) {
            sessionStorage.removeItem('userSelectType')
            this.setUserSelectType('')
            sessionStorage.removeItem('userInput')
            this.setForcastUserInput('')
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
        },
    },
})