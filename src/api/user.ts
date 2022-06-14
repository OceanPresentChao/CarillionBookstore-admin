import request from '@/utils/request';

export function requestGetUserList(params: {
    limit: number,
    page: number,
    s_name?: string,
    s_level?: number
}) {
    return request({
        url: `/realApi/v1/vip/info/`,
        method: 'GET',
        params
    })
}

export function requestDeleteUser(params: {
    id: number,
}) {
    return request({
        url: `/realApi/v1/vip/info/`,
        method: 'DELETE',
        params
    })
}

