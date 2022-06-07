import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { Types } from './type'

export const useAuthStore = defineStore({
    id: Types.AUTH,
    state: () => {
        const TokenKey = 'loginToken'
        return {
            TokenKey
        }
    },
    getters: {
    },
    actions: {
        getToken() {
            return Cookies.get(this.TokenKey)
        },
        setToken(token: string) {
            return Cookies.set(this.TokenKey, token)
        },
        removeToken() {
            return Cookies.remove(this.TokenKey)
        }
    }

})