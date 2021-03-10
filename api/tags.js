import { request } from '@/plugins/request'

export const getTags = (data) => {
    return request({
        method: 'get',
        url: '/api/tags',
        data
    })
}