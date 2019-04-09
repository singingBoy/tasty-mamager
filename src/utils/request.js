import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import { notification } from 'antd';
import NProgress from 'nprogress';
import qs from 'qs';

export const RequestApi = 'http://tastyapi.gyxing.vip';

axios.defaults.timeout = 6000;
export default function request(options) {
    const { data, url, method = 'post' } = options;
    options.method = options.method || 'post';
    const cloneData = cloneDeep(data || {});
    options.url =
        method.toLocaleLowerCase() === 'get'
            ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
            : url;
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    options.data = qs.stringify(cloneData);

    NProgress.start();
    return axios(options)
        .then(response => {
            const { msg, code, data } = response;

            let result = {};
            if (typeof data === 'object') {
                result = data;
                if (Array.isArray(data)) {
                    result.list = data;
                }
            } else {
                result.data = data
            }

            return Promise.resolve({
                success: true,
                msg,
                code,
                ...result,
            })
        })
        .catch(err => {
            const { status, message, error } = err;

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