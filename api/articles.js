// import request from '../utils/request'
import { request } from '@/plugins/request'

//获取文章列表
export const getArticles = (data) => {
    return request({
        url: '/api/articles',
        method: 'get',
        params: data
    })
}
// 新增文章
export const postArticle = (data) => {
    return request({
        url: '/api/articles',
        method: 'post',
        data
    })
}
export const getArticleDetail = (data) => {
    return request({
        url: `api/articles/${data}`,
        method: 'get',
    })
}
export const getComments = (data) => {
    return request({
        url: `/api/articles/${data}/comments`,
        method: 'get',
    })
}

// follow
export const postFollow = (username) => {
    return request({
        url: `/api/profiles/${username}/follow`,
        method: 'post',
    })
}
// unfollow
export const deleteFollow = (username) => {
    return request({
        url: `/api/profiles/${username}/follow`,
        method: 'delete',
    })
}

//  favorite
export const postFavorite = (slug) => {
    return request({
        url: `/api/articles/${slug}/favorite`,
        method: 'post',
    })
}
//  unfavorite
export const deleteFavorite = (slug) => {
    return request({
        url: `/api/articles/${slug}/favorite`,
        method: 'delete',
    })
}

// getComment
export const getComment = (slug) => {
    return request({
        url: `/api/articles/${slug}/comments`,
        method: 'get',
    })
}
// postComment
export const postComment = (slug, body) => {
    return request({
        method: 'post',
        url: `/api/articles/${slug}/comments`,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        data: body
    })
}
// delete comment
export const deleteComment = (slug, id) => {
    return request({
        method: 'delete',
        url: `/api/articles/${slug}/comments/${id}`,
    })
}

