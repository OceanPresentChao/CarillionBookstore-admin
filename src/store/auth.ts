import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { useTabsStore } from './tabs';
import { Types } from './type'
const router = useRouter()
export const useAuthStore = defineStore({
    id: Types.AUTH,
    state: () => {
        // 登陆显示组件判断 0：登陆 1：忘记密码，默认0：登陆
        return {
            TokenKey: 'Login',
            currentPage: 0,
            name: '',
            roles: [] as string[]
        }
    },
    getters: {

    },
    actions: {
        getToken() {
            return Cookies.get(this.TokenKey)
        },
        setToken(token: string) {
            Cookies.set(this.TokenKey, token)
            useSessionStorage(this.TokenKey, token)
        },
        removeToken() {
            Cookies.remove(this.TokenKey)
            useSessionStorage(this.TokenKey, undefined)
        },
        getAdminInfo() {
            this.roles = ['admin']
            return {
                role: ['admin']
            }
        },
        setCurrentPage(page: 0 | 1) {
            this.currentPage = page
        },
        setName(name: string) {
            this.name = name
        },
        loginByAdminName(adminForm: Object) {
            console.log("@@@", adminForm);
            this.setToken("eyJhbGciOiJIUzUxMiJ9.test")
        },
        logOut() {
            const tabsStore = useTabsStore()
            this.name = "";
            this.removeToken()
            tabsStore.clearTabs()
            router.push("/login")
        },
    }
})


