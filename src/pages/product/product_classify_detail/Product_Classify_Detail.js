import React, {Component, Fragment} from 'react';
import {getFirstClassify} from './service';
import {Table, Empty, PageHeader} from 'antd';
import './product_classify_detail.less';

const {Column} = Table;
export default class Product_Classify_Detail extends Component {
    constructor(props) {
        super(props);
        const {id, name, description} = this.props.location.state;
        this.state = {
            classify: [],
            pId: id,
            pName: name,
            description,
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
        const {classify, pName, description} = this.state;
        return (
            <Fragment>
                <PageHeader title={pName} subTitle={description} />
                <div className='product-classify-detail pt20'>
                    <Table dataSource={classify} pagination={false} rowKey='id'>
                        <Column title="名称" dataIndex="name"/>
                        <Column title="说明" dataIndex="description"/>
                        <Column title="排序" dataIndex="sort"/>
                        <Column title="图片" dataIndex="image" render={img => (
                            img ? <span>{img}</span> : <Empty description=""/>
                        )}/>
                        <Column title="操作" dataIndex="id" render={id => (<a>{id}</a>)}/>
                    </Table>
                </div>
            </Fragment>
        );
    }
}
