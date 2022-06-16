import request from '@/utils/request';

export function requestGetStaffList(params: { limit: number, page: number, s_name?: string }) {
    return request({
        url: '/realApi/v1/company/staff/',
        method: 'GET',
        params
    })
}

export function requestGetDepartList() {
    return request({
        url: '/realApi/v1/company/department/',
        method: 'GET',
    })
}

export function requestGetRoleList() {
    return request({
        url: '/realApi/v1/company/role/',
        method: 'GET',
    })
}

export function requestCreateStaff(body: { id: number, age: number, salary: number, card: string, telphone: string, role: number }) {
    return request({
        url: '/realApi/v1/company/staff/',
        method: 'POST',
        data: body
    })
}

export function requestUpdateStaff(body: { id: number, age: number, salary: number, card: string, telphone: string, roleId: number }) {
    return request({
        url: '/realApi/v1/company/staff/',
        method: 'PUT',
        data: body
    })
}

export function requestDeleteStaff(params: { id: number }) {
    return request({
        url: '/realApi/v1/company/staff/',
        method: 'DELETE',
        params
    })
}

export function requestPutSalary(body: { id: number, amount: number }) {
    return request({
        url: '/realApi/v1/company/deal/',
        method: 'GET',
        data: body
    })
}

export function requestGetDealList(params: { limit: number, page: number, s_typeId: number, s_orderId: number }) {
    return request({
        url: '/realApi/v1/company/deal/',
        method: 'GET',
        params
    })
}