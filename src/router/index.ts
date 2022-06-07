import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from "@/layout/index.vue"
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
            // {
            //     path: "/book",
            //     component: () => import("@/views/product/book/BookList.vue"),
            //     name: "book",
            //     meta: {
            //         title: "书本管理",
            //         icon: "akar-icons:book",
            //         roles: ["sys:goodsCategory"],
            //         parentId: 34,
            //     },
            // },
            {
                path: "/press",
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
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@/views/error/404.vue"),
    }
]

export const router = createRouter({
    routes: [...menuRoutes, ...constantRoutes],
    history: createWebHashHistory()
})