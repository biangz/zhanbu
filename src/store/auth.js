import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils'
import { googleLogin, loginUserInfo } from '@/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        _googleUserInfo: null,
        _token: getToken() || '',
        _user: null,
        _forcastType: sessionStorage.getItem('forcastType') ?? 1, // 1 普通 2 股票
        _userSelectType: sessionStorage.getItem('userSelectType') ? Number(sessionStorage.getItem('userSelectType')) : null,
        _forcastUserInput: sessionStorage.getItem('userInput') ?? '',

        _userQuestion: sessionStorage.getItem('userQuestion') ?? '',
        _orderno: sessionStorage.getItem('orderno') ?? '',
    }),
    getters: {
        googleUserInfo: (state) => state._googleUserInfo,
        token: state => state._token,
        user: state => state._user,
        forcastType: state => state._forcastType,
        userSelectType: state => state._userSelectType,
        forcastUserInput: state => state._forcastUserInput,
        userQuestion: state => state._userQuestion,
        orderno: state => state._orderno,
    },
    actions: {
        setToken(t) {
            this._token = t
        },

        setGoogleUser(info) {
            this._googleUserInfo = info
        },

        setoOrderno(orderno) {
            this._orderno = orderno
            sessionStorage.setItem('orderno', this._orderno)
        },

        setForcastType(type) {
            this._forcastType = type
            sessionStorage.setItem('forcastType', this._forcastType)
        },

        setUserSelectType(type) {
            this._userSelectType = type
            sessionStorage.setItem('userSelectType', this._userSelectType)
        },
        
        setUserQuestion(question) {
            this._userQuestion = question
            sessionStorage.setItem('userQuestion', this._userQuestion)
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