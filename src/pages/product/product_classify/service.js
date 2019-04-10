import request from '../../../utils/request';
import upload from '../../../utils/upload';

export function getFirstClassify() {
    return request({
        url: `/category/list`,
        data: {
            pid: 1,
        }
    });
}

export function uploadImage(file) {
    return upload(file);
}