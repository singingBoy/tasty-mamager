import request from '../../../utils/request';

export function getProducts(data) {
    return request({
        url: '/commodity/list',
        data
    })
}