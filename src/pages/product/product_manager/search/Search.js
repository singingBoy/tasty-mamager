import React, {Component} from 'react';
import {Button, Cascader, Col, Form, Input, Row} from "antd";
import {getClassify} from "../../../../service/classify.service";

class Search extends Component{
    state = {
        classify: [],
    };
    componentWillMount() {
        this.initClassify();
    }

    initClassify = () => {
        getClassify().then(({data}) => {
            this.setState({
                classify: data.map(d => ({...d, isLeaf: false,})),
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

    handleSearch = (e) => {
        e.preventDefault();
        const {form, search} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const {classify, name, query = {}} = values;
                if(name) query.name = name;
                if(classify && classify[1]) query.classify = classify[1];

                search(query);
            }
        });
    };

    onReset = () => {
        const {form, search} = this.props;
        form.resetFields();
        search();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { classify } = this.state;
        const fieldNames = {
            label: 'name', value: 'id', children: 'children'
        };
        return(
            <Form onSubmit={this.handleSearch} layout='inline'>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='名称:'>
                            {getFieldDecorator(`name`)(
                                <Input placeholder="商品名称" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='分类:'>
                            {getFieldDecorator(`classify`)(
                                <Cascader
                                    placeholder='请选择'
                                    options={classify}
                                    loadData={this.loadClassify}
                                    fieldNames={fieldNames}
                                    changeOnSelect
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" icon='search' htmlType="submit">Search</Button>
                        <Button className='ml15' icon='retweet' onClick={this.onReset}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create({})(Search);