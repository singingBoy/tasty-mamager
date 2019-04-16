import React, {Component, Fragment} from 'react';
import {Button, Empty, PageHeader, Table} from "antd";
import Search from './search/Search'
import {getProducts} from './service';

import './product_manager.less';

const {Column} = Table;
export default class Product_Manager extends Component {
    state = {
        products: [],
        pagination: {
            current: 1,
            total: 0,
            hideOnSinglePage: true
        },
        loading: false,
    };

    componentWillMount() {
        this.getList();
    }

    getList = (query = {}) => {
        const {pagination} = this.state;
        getProducts({
            page: pagination.current - 1,
            ...query,
        }).then(({data}) => {
            const {number, content} = data;
            pagination.total = number;
            this.setState({
                products: content,
                pagination
            })
        })
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.getList();
    };

    navigateToDetail = () => {
        const {history} = this.props;
        history.push('/product_detail')
    };

    render() {
        const {products, pagination, loading} = this.state;
        return (
            <PageHeader
                title="商品管理" 
                subTitle="贯彻绿色新鲜食材，不忘初心"
                extra={[
                    <Button
                        className='mr20'
                        onClick={this.getList}
                        key='redo'
                        type="primary"
                        shape="circle"
                        icon="redo"
                    />,
                    <Button
                        onClick={this.navigateToDetail}
                        key='plus'
                        type="primary"
                        shape="circle"
                        icon="plus"
                    />
                ]}
            >
                <Search search={this.getList}/>

                <div className='product-list pt20'>
                    <Table dataSource={products}
                           loading={loading}
                           pagination={pagination}
                           rowKey='id'
                           onChange={this.handleTableChange}
                    >
                        <Column title="名称" dataIndex="name" width={100}/>
                        <Column title="规格" dataIndex="sku_name" align='left' width={200}/>
                        <Column title="商品码" dataIndex="code" align='left' width={200}/>
                        <Column title="售价/￥" dataIndex="price" width={250} align='left' sorter={(a,b) => a.price - b.price}/>
                        <Column title="进货价/￥" dataIndex="cost_price" width={250} align='left' sorter={(a,b) => a.cost_price - b.cost_price}/>
                        <Column title="产地" dataIndex="place" width={200} align='left'/>
                        <Column title="分类" dataIndex="category_name" width={200} align='left'/>
                        <Column title="图片" dataIndex="images" width={400} render={imgs => imgs.map(img => (
                            <img className='product-image mr5 mb5' src={img} />
                        ))}/>
                        <Column title="操作" dataIndex="id" width={100} fixed="right" render={(id, item) => (
                            <Fragment>
                                <p className='a-btn' onClick={() => this.onEdit(item)}>编辑</p>
                                <p className="a-btn-red" onClick={() => this.onDel(item)}>删除</p>
                            </Fragment>
                        )}/>
                    </Table>
                </div>
            </PageHeader>
        )
    }
}
