import axios from 'axios';

let request = axios.create({
    baseURL: 'https://conduit.productionready.io',
})

export default request;