import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Layout from "@/components/layout/index.vue"
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/components/layout/dashboard/DashBoard.vue'),
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: 'carbon:home'
                }
            }
        ]
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('@/views/login/index.vue')
    // }
]

export const router = createRouter({
    routes: constantRoutes,
    history: createWebHashHistory()
})