import request from '@/utils/request';

export function requestGetFoodList(params: {
    limit: number,
    page: number,
}) {
    return request({
        url: `/realApi/v1/food/list/`,
        method: 'GET',
        params
    })
}

export function requestCreateFood(body: {
    name: string,
    password: string,
    email: string,
}) {
    return request({
        url: `/realApi/v1/vip/register/`,
        method: 'POST',
        data: body
    })
}

export function requestUpdateFood(body: {
    id: number,
    password: string,
    mail: string,
    birthday: string
}) {
    return request({
        url: `/realApi/v1/vip/update/`,
        method: 'POST',
        data: body
    })
}

export function requestDeleteFood(params: {
    id: number,
}) {
    return request({
        url: `/realApi/v1/vip/info/`,
        method: 'DELETE',
        params
    })
}

