import axios from 'axios';
import {RequestApi} from '../api';
import {notification} from "antd";
import NProgress from "nprogress";

export default function uploadFile(file) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const formData = new FormData();
    formData.append('file', file);
    
    NProgress.start();
    return axios.post(`${RequestApi}/images/upload`, formData, config).then(response => {
        const {msg, code, data} = response.data;
        return Promise.resolve({
            success: true,
            msg,
            code,
            data,
        })
    }).catch(err => {
        const {status, message, error} = err;

        notification['error']({
            message: error || '服务器出错',
            description: message,
        });
        return Promise.reject({
            success: false,
            code: status,
            msg: error,
        })
    }).finally(() => {
        NProgress.done();
    })
}