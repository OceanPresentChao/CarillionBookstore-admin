import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"
import Login from "@/views/login/Login.vue"
import NProgress from "nprogress";
// const { t } = useI18n()
export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        component: Layout,
        meta: {
            title: "首页",
            icon: "carbon:home",
            roles: ["sys:manage"]
        }
    },
    {
        path: "/company",
        component: Layout,
        name: "company",
        meta: {
            title: "公司管理",
            icon: "carbon:id-management",
            roles: ["sys:goods"],
            parentId: 0,
        },
        children: [
            {
                path: "/staff",
                component: () => import("@/views/company/staff.vue"),
                name: "staff",
                meta: {
                    title: "员工管理",
                    icon: "ic:baseline-manage-accounts",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                },
            },
            {
                path: "/deal",
                component: () => import("@/views/company/deal.vue"),
                name: "deal",
                meta: {
                    title: "财务管理",
                    icon: "carbon:order-details",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                },
            },
        ],
    },
    {
        path: "/product",
        component: Layout,
        name: "product",
        meta: {
            title: "商品管理",
            icon: "carbon:product",
            roles: ["sys:goods"],
            parentId: 0,
        },
        children: [
            {
                path: "/product/book",
                component: () => import("@/views/product/book/BookList.vue"),
                name: "book",
                meta: {
                    title: "图书列表",
                    icon: "akar-icons:book",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                }
            },
            {
                path: "/product/updateBook",
                component: () => import("@/views/product/book/BookDetail.vue"),
                name: "updateBook",
                props: {
                    isEdit: true
                },
                meta: {
                    title: "更新图书",
                    icon: "carbon:word-cloud",
                    roles: ["sys:goodsCategory"],
                    hidden: true
                },
            },
            {
                path: "/product/createBook",
                component: () => import("@/views/product/book/BookDetail.vue"),
                name: "createBook",
                props: {
                    isEdit: false
                },
                meta: {
                    title: "添加图书",
                    icon: "carbon:word-cloud",
                    roles: ["sys:goodsCategory"],
                },
            },
            {
                path: "/product/press",
                component: () => import("@/views/product/press/PressList.vue"),
                name: "press",
                meta: {
                    title: "出版社管理",
                    icon: "carbon:word-cloud",
                    roles: ["sys:goodsCategory"],
                    parentId: 34,
                },
            },
        ],
    },
]

const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@/views/error/404.vue"),
    }
]

export const router = createRouter({
    routes: [...menuRoutes, ...constantRoutes],
    history: createWebHashHistory()
})
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    NProgress.start()
    if (authStore.getToken()) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (authStore.roles.length === 0) { // 判断当前用户是否已拉取完
                authStore.getAdminInfo()
                next({ ...to, replace: true })
            } else {
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})