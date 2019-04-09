import request, {RequestApi} from '../../../utils/request';

export function getFirstClassify(pid) {
    return request({
        url: `${RequestApi}/category/list`,
        data: {
            pid,
        }
    });
}