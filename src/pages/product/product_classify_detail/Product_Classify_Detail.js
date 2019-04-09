import React, {Component, Fragment} from 'react';
import {getFirstClassify} from './service';
import { Table } from 'antd';
import './product_classify_detail.less';

const {Column} = Table;
class Product_Classify_Detail extends Component {
    constructor(props) {
        super(props);
        const {id, name} = this.props.location.state;
        this.state = {
            classify: [],
            pId: id,
            pName: name
        };
    }

    componentWillMount() {
        const {pId} = this.state;
        getFirstClassify(pId).then(({data}) => {
            console.log(data);
            this.setState({
                classify: data,
            })
        })
    }

    render() {
        const {classify, pName} = this.state;
        return (
            <Fragment>
                <h1 className='content-header-title'>{pName}</h1>
                <div className='product-classify-detail pt20'>
                    <Table dataSource={classify} pagination={false} rowKey='id'>
                        <Column title="名称" dataIndex="name"/>
                        <Column title="说明" dataIndex="description"/>
                        <Column title="排序" dataIndex="sort"/>
                        <Column title="图片" dataIndex="image"render={img => (<span>{img}</span>)}/>
                        <Column title="操作" dataIndex="id" render={id => (<a>{id}</a>)}/>
                    </Table>
                </div>
            </Fragment>
        );
    }
}

export default Product_Classify_Detail;