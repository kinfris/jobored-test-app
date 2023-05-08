import axios from "axios";

export const $api = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0',
    withCredentials: true,
    headers:{
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    }
})
