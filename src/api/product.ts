import request from '@/utils/request';

export function requestGetPressList(params: { limit: number, page: number, keyword?: string }) {
    return request({
        url: '/api/v1/press',
        method: 'GET',
        params
    })
}