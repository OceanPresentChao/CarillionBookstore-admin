import { defineStore } from 'pinia'
import { type Tab, Types } from './type'

export const useTabsStore = defineStore({
    id: Types.TABS,
    state: () => {
        let data: Tab[] = []
        return {
            count: 0,
            collapse: false,
            tabsList: data
        }
    },
    getters: {
        getCount(): number {
            return this.count;
        },
        //获取collapse
        getCollapse(): boolean {
            return this.collapse;
        },
        getTabsList(): any[] {
            return this.tabsList
        }
    },
    actions: {
        setCount(count: number) {
            this.$state.count = count
        },
        setCollapse(collapse: boolean) {
            this.$state.collapse = collapse
        },
        addTab(tab: Tab) {
            if (this.$state.tabsList.some(item => item.path === tab.path)) return;
            this.$state.tabsList.push(tab)
        }
    }

})