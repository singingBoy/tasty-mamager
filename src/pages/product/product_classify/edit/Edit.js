import React from 'react';
import {Drawer, Form, Icon, Input, message, Upload, InputNumber, Button} from 'antd';
import Rules from './rules';
import { uploadImage, saveClassify } from '../service';
import './edit.less';

class Edit extends React.Component {
    state = {
        visible: false,
        title: '新增分类',
        item: {
            id: null,
            name: null,
            description: null,
            image: null,
            sort: null,
        },
        uploading: false,
    };
    show = (item) => {
        this.setState({
            visible: true,
            title: item.id ? '编辑分类' : '新增分类',
            item: {
                ...item,
            }
        });
    };
    close = () => {
        this.setState({
            visible: false,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {form, callback} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {item} = this.state;
                if (!item.image) {
                    return message.error('请上传封面图!');
                }
                saveClassify({
                    ...item,
                    ...values,
                }).then(res => {
                    message.success('保存成功~');
                    this.close();
                    callback && callback();
                });
            }
        });
    };
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('请上传图片格式!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小限制2M!');
        }
        return isJPG && isLt2M;
    };
    uploadImage = (option) => {
        this.setState({
            uploading: true,
        });
        uploadImage(option.file).then(res => {
            const {data} = res;
            const {item} = this.state;
            item.image = data.url;
            this.setState({
                uploading: false,
                item,
            });
        })
    };

    render() {
        const {item, title, uploading} = this.state;
        const {name, description, sort, image} = item;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        return (
            <Drawer
                width={400}
                title={<span className='a-btn'>{title}</span>}
                placement="right"
                closable={false}
                onClose={this.close}
                visible={this.state.visible}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名 称" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: Rules.name,
                            initialValue: name
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="说 明" hasFeedback>
                        {getFieldDecorator('description', {
                            rules: Rules.description,
                            initialValue: description
                        })(
                            <Input.TextArea rows={5} type="description"/>
                        )}
                    </Form.Item>
                    <Form.Item required label="图 片" help='图片小于2M'>
                        <Upload
                            name="image"
                            accept="image/*"
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            customRequest={this.uploadImage}
                        >
                            {
                                image ?
                                    <img className='edit-classify-image' src={image} alt="图片"/> :
                                    <Icon type={uploading ? 'loading' : 'plus'}/>
                            }
                        </Upload>

                    </Form.Item>
                    <Form.Item label="排 序" hasFeedback>
                        {getFieldDecorator('sort', {
                            rules: Rules.sort,
                            initialValue: sort
                        })(
                            <InputNumber min={1} />
                        )}
                    </Form.Item>
                    <Form.Item className='mt50 ml50'>
                        <Button type="primary" size='large' htmlType="submit">保 存</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
}

export default Form.create({})(Edit);