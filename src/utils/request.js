import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import { notification } from 'antd';
import NProgress from 'nprogress';
import qs from 'qs';
import {RequestApi} from '../api';
import {createBrowserHistory} from 'history';

axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
export default function request(options) {
    const { data, url, method = 'post' } = options;
    const cloneData = cloneDeep(data || {});

    options.method = options.method || 'post';
    options.url = RequestApi + (
        method.toLocaleLowerCase() === 'get'
            ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
            : url
    );
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    options.data = qs.stringify(cloneData);

    NProgress.start();
    return axios(options)
        .then(response => {
            const { msg, code, data } = response.data;

            if(code === 401) {
                createBrowserHistory({
                    forceRefresh: true
                }).push('login');
            }

            return Promise.resolve({
                success: true,
                msg,
                code,
                data,
            })
        })
        .catch(err => {
            const { status, message, error } = err.data;

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