export default {
    name: [
        {required: true, message: '请填写分类名称!', whitespace: true}
    ],
    description: [
        {required: true, message: '请填写分类说明!', whitespace: true}
    ],
    sort: [
        {required: true, message: '请填写排序!', type: 'number'}
    ],
}