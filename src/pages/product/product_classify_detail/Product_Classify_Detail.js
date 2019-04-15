import React, {Component, Fragment} from 'react';
import {getFirstClassify} from './service';
import {Table, Empty, PageHeader, Button} from 'antd';
import Edit from '../product_classify/edit/Edit';

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
       this.getList();
    }

    getList = () => {
        const {pId} = this.state;
        getFirstClassify(pId).then(({data}) => {
            this.setState({
                classify: data,
            })
        });
    };

    onEdit = () => {
        const {pId} = this.state;
        this.editor.show({
            pid: pId,
        });
    };

    render() {
        const {classify, pName, description} = this.state;
        return (
            <Fragment>
                <PageHeader
                    title={pName}
                    subTitle={<p className='mr120'>{description}</p>}
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
                            onClick={this.onEdit}
                            key='plus'
                            type="primary"
                            shape="circle"
                            icon="plus"
                        />
                    ]}
                >
                    <div className='product-classify-detail pt20'>
                        <Table dataSource={classify} pagination={false} rowKey='id'>
                            <Column title="名称" dataIndex="name" width={100}/>
                            <Column title="说明" dataIndex="description" align='left' width={200}/>
                            <Column title="排序" dataIndex="sort" width={100} align='left' sorter={(a,b) => a.sort - b.sort}/>
                            <Column title="图片" dataIndex="image" width={100} render={img => (
                                img ? <img className='classify-detail-image' src={img} /> : <Empty description=""/>
                            )}/>
                            <Column title="操作" dataIndex="id" width={100} render={id => (
                                <Fragment>
                                    <p className='a-btn'>编辑</p>
                                    <p className="a-btn-red">删除</p>
                                </Fragment>
                            )}/>
                        </Table>
                    </div>
                </PageHeader>
                <Edit wrappedComponentRef={dom => this.editor = dom} callback={this.getList}/>
            </Fragment>
        );
    }
}
