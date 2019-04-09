import request, {RequestApi} from '../../../utils/request';

export function getFirstClassify() {
    return request({
        url: `${RequestApi}/category/list`,
        data: {
            pid: 1,
        }
    });
}