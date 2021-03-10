import axios from 'axios';

const request = axios.create({
    baseURL: 'https://conduit.productionready.io',
})


export { request };
//  在这里使用插件是因为我们想拿到上下文对象，对象中包括app ， store ，req ， resp , params , query ... 
// export default (context )=>{
export default ({ store }) => {
    // 返回数据拦截处理
    request.interceptors.response.use(function (response) {
        return response;
    }, function ({ response }) {
        if (response.status === 401) {
            alert("登陆状态已过期")
            window.location.href = "/login"
        }
        return response;
    })
    // response => {
    //     //code... 你的逻辑
    //     return response.data; //直接返回后台返回的json object
    // },
    // ({ response }) => {
    //     if (response.status == 401) {
    //         alert("用户信息过期，请重新登陆")
    //         window.location.href = "/login";
    //     } else {
    //         Promise.reject(response);
    //     }
    // }
    // Add a request interceptor
    request.interceptors.request.use(function (config) {
        // Do something before request is sent
        let { user } = store.state;
        // console.log(user);
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        // console.log('config', config);
        return config;
    }, function (error) {
        // Do something with request error
        // return Promise.reject(error);
        return Promise.reject(error);
    });
    return request;
    // Add a response interceptor
    // request.interceptors.response.use(function (response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     return response;
    // }, function (error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     return Promise.reject(error);
    // });

}
