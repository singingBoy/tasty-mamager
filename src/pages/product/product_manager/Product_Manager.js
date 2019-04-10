import React, {Component} from 'react';
import './product_manager.less';
import {PageHeader, Form} from "antd";

export default class Product_Manager extends Component{
    handleSearch = () => {

    };
    render() {
        return (
            <PageHeader title="商品管理" subTitle="贯彻绿色新鲜食材，不忘初心">
                <Form onSubmit={this.handleSearch}>

                </Form>
            </PageHeader>
        )
    }
}
