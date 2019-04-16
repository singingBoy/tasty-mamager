import request from "../../../utils/request";

export function save(data) {
    console.log(data);
    return request({
        url: `/commodity/save`,
        data
    });
}