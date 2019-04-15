import request from '../../utils/request';

export function ajaxLogin({account, password}) {
    return request({
        url: `/user/login`,
        data: {
            account,
            password
        }
    });
}