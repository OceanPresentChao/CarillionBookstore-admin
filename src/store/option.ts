
import { requestGetDepartList, requestGetRoleList } from '@/api/company'
import { requestGetBookCategories } from '@/api/product'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

import { Types } from './type'

interface BookCategoryOption {
    id: number
    name: string
}


interface DepartmentOption {
    id: number
    name: string
}

interface RoleOption {
    id: number
    name: string
    parent: number
    depart: number
}

export const useOptionStore = defineStore({
    id: Types.OPTION,
    state: () => {
        const bookCateOptions: BookCategoryOption[] = []
        const departmentOptions: DepartmentOption[] = []
        const roleOptions: RoleOption[] = []
        return {
            bookCateOptions, departmentOptions, roleOptions
        }
    },
    getters: {

    },
    actions: {
        async getDepartmentOptions() {
            try {
                const { data } = await requestGetDepartList()
                this.departmentOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getRoleOptions() {
            try {
                const { data } = await requestGetRoleList()
                this.roleOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        async getBookCateOptions() {
            try {
                const { data } = await requestGetBookCategories()
                this.bookCateOptions = data.record
            } catch (error) {
                ElMessage({
                    type: "error",
                    message: String(error)
                })
            }
        },
        getDepartIdFromRoleId(roleId: number): number {
            let res = 0
            this.roleOptions.some((v) => {
                if (v.id === roleId) {
                    res = v.depart
                    return true
                }
                return false
            })
            return res
        },
        getDepartFromId(departId: number): string {
            let name = ''
            this.departmentOptions.some((v) => {
                if (v.id === departId) {
                    name = v.name
                    return true
                }
                return false
            })
            return name
        },
        getRoleFromId(roleId: number): string {
            let name = ''
            this.roleOptions.some((v) => {
                if (v.id === roleId) {
                    name = v.name
                    return true
                }
                return false
            })
            return name
        }
    }
})


