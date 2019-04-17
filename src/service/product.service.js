import request from "../utils/request";

export function getProducts(data) {
    return request({
        url: '/commodity/list',
        data
    })
}

export function save(data) {
    return request({
        url: `/commodity/save`,
        data
    });
}

export function getDetail(id) {
    return request({
        url: `/commodity/get`,
        data: {
            id
        }
    });
}