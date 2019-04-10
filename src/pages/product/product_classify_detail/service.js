import request from '../../../utils/request';

export function getFirstClassify(pid) {
    return request({
        url: `/category/list`,
        data: {
            pid,
        }
    });
}