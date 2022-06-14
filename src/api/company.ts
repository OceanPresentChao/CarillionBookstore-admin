import request from '@/utils/request';

export function requestGetStaffList(params: { limit: number, page: number, s_name?: string }) {
    return request({
        url: '/mockApi/v1/company/staff',
        method: 'GET',
        params
    })
}

export function requestGetDepartList() {
    return request({
        url: '/mockApi/v1/company/department',
        method: 'GET',
    })
}

export function requestGetRoleList() {
    return request({
        url: '/mockApi/v1/company/role',
        method: 'GET',
    })
}