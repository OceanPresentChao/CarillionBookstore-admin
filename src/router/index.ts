import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from "@/components/layout/index.vue"
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
        name: "goods",
        meta: {
            title: "商品管理",
            icon: "Menu",
            roles: ["sys:goods"],
            parentId: 0,
        },
        children: [
            {
                path: "/staff",
                component: () => import("@/views/company/staff.vue"),
                name: "goodCategory",
                meta: {
                    title: "商品分类",
                    icon: "Menu",
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