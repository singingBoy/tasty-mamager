import request from '../../../utils/request';
import upload from '../../../utils/upload';

export function getClassify(pid = 1) {
    return request({
        url: `/category/list`,
        data: {
            pid,
        }
    });
}

export function saveClassify(data) {
    return request({
        url: '/category/save',
        data,
    })
}

export function uploadImage(file) {
    return upload(file);
}

export function delClassify(id) {
    return request({
        url: '/category/del',
        data: {
            id,
        },
    })
}
