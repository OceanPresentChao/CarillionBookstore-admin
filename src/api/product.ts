import request from '@/utils/request';

export function requestGetPressList(params: { limit: number, page: number, s_name?: string }) {
    return request({
        url: '/mockApi/v1/press/list',
        method: 'GET',
        params
    })
}

export function requestGetBookList(params: {
    limit: number,
    page: number,
    s_name?: string,
    s_categoryIds?: number[],
    s_pressId?: number,
    s_isShow?: boolean,
}) {
    return request({
        url: '/mockApi/v1/book/list',
        method: 'GET',
        params
    })
}

export function requestGetBookCategories(params: Object = {}) {
    return request({
        url: '/mockApi/v1/book/category',
        method: 'GET',
        params
    })
}