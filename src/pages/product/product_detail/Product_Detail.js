import React, {Component} from 'react';
import {Button, Cascader, Form, Icon, Input, message, PageHeader, Upload} from "antd";
import {save, getDetail} from "../../../service/product.service";
import {getClassify} from "../../../service/classify.service";
import {uploadImage} from "../../../service/upload.service";

class Product_Detail extends Component {
    constructor(props) {
        super(props);
        const {id} = props.location.state || {};
        this.state = {
            classify: [],
            uploading: false,
            images: [],
            id,
            data: {},
        }
    }

    componentWillMount() {
        this.initClassify();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {classify, uploading, images, data} = this.state;
        const {formItemLayout, tailFormItemLayout} = this.createLayout();
        const fieldNames = {
            label: 'name', value: 'id', children: 'children'
        };

        return (
            <PageHeader
                title="商品详情"
                subTitle="贯彻绿色新鲜食材，不忘初心"
            >
                <Form className='mt20' {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名 称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input product name!',
                            }],
                            initialValue: data.name
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="分 类">
                        {getFieldDecorator('category_id', {
                            rules: [{
                                required: true, message: 'Please input product category!',
                            }],
                            initialValue: data.category_id
                        })(
                            <Cascader
                                placeholder='请选择'
                                options={classify}
                                loadData={this.loadClassify}
                                fieldNames={fieldNames}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="规 格">
                        {getFieldDecorator('sku_name', {
                            rules: [{
                                required: true, message: 'Please input product sku!',
                            }],
                            initialValue: data.sku_name
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="描 述">
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: 'Please input product description!',
                            }],
                            initialValue: data.description
                        })(
                            <Input.TextArea rows={4}/>
                        )}
                    </Form.Item>
                    <Form.Item label="商品码">
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true, message: 'Please input product code!',
                            }],
                            initialValue: data.code
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="进货价 / ￥">
                        {getFieldDecorator('cost_price', {
                            rules: [{
                                required: true, message: 'Please input product cost price!',
                            }],
                            initialValue: data.cost_price
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="售价 / ￥">
                        {getFieldDecorator('price', {
                            rules: [{
                                required: true, message: 'Please input product price!',
                            }],
                            initialValue: data.price
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="活动价 / ￥">
                        {getFieldDecorator('activity_price', {
                            rules: [{
                                required: true, message: 'Please input product activity price!',
                            }],
                            initialValue: data.activity_price
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label="产 地">
                        {getFieldDecorator('place', {
                            rules: [{
                                required: true, message: 'Please input product place!',
                            }],
                            initialValue: data.place
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item required label="图 片" help='图片小于2M'>
                        <Upload
                            name="image"
                            accept="image/*"
                            listType="picture-card"
                            fileList={images}
                            beforeUpload={this.beforeUpload}
                            customRequest={this.uploadImage}
                        >
                            <Icon type={uploading ? 'loading' : 'plus'}/>
                        </Upload>

                    </Form.Item>
                    <Form.Item className='mt30' {...tailFormItemLayout}>
                        <Button type="primary" icon='edit' htmlType="submit">保 存</Button>
                        <Button className='ml30' icon='rollback' onClick={this.navigateBack}>返 回</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        )
    }

    createLayout() {
        return {
            formItemLayout: {
                labelCol: {
                    span: 4
                },
                wrapperCol: {
                    span: 12
                },
            },
            tailFormItemLayout: {
                wrapperCol: {
                    span: 16,
                    offset: 4,
                },
            }
        }
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
        uploadImage(option.file)
            .then(res => {
                const {data} = res;
                // 过滤 empty 项（empty 来源未知）
                const imageFiles = this.state.images.filter(d => d);
                imageFiles.push({
                    uid: Date.now(),
                    status: 'done',
                    url: data.url
                });
                this.setState({
                    uploading: false,
                    images: imageFiles,
                });
            })
            .catch(() => {
                this.setState({
                    uploading: false,
                });
            })
    };

    initClassify = () => {
        const {id} = this.state;
        getClassify().then(({data}) => {
            this.setState({
                classify: data.map(d => ({...d, isLeaf: false,})),
            }, () => {
                id && this.initDetail();
            });
        })
    };

    initDetail = () => {
        getDetail(this.state.id).then(res => {
            const {data} = res;
            this.setState({
                images: data.images.map((img, index) => ({
                    uid: Date.now() + index,
                    status: 'done',
                    url: img
                })),
                data: {
                    ...data,
                    category_id: data.category.id,
                }
            })
        })
    };

    loadClassify = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const {id} = targetOption;

        getClassify(id).then(({data}) => {
            targetOption.loading = false;
            targetOption.children = data;
            this.setState({
                classify: [...this.state.classify],
            });
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {images} = this.state;
                if (!images.length) {
                    return message.warning('请上传商品图片');
                }
                save({
                    ...values,
                    category_id: values.category_id[1],
                    images: images.map(d => d.url),
                }).then(() => {
                    message.success('保存成功！');
                });
            }
        });
    };

    navigateBack = () => {
        this.props.history.push('/product_manager');
    }

}

export default Form.create({})(Product_Detail);