import { request } from '@/plugins/request'

export const getProfileByUsername = (username) => {

    return request({
        method: 'get',
        url: `/api/profiles/${username}`
    })
}

export const updateUserInfo = (data) => {
    return request({
        method: 'put',
        url: `/api/user`,
        data
    })
}