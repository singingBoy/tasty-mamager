import React, {Component, Fragment} from 'react';
import {Table, Empty, PageHeader, Button, Modal, message} from 'antd';
import Edit from '../product_classify/edit/Edit';

import './product_classify_detail.less';
import {delClassify, getClassify} from "../../../service/classify.service";

const {Column} = Table;
export default class Product_Classify_Detail extends Component {
    constructor(props) {
        super(props);
        const {id, name, description} = props.location.state || {};
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
        getClassify(pId).then(({data}) => {
            this.setState({
                classify: data,
            })
        });
    };

    onEdit = (item = {}) => {
        const {pId} = this.state;
        this.editor.show({
            pid: pId,
            ...item,
        });
    };

    onDel = (item) => {
        const {name, id} = item;
        Modal.confirm({
            title: `确定删除【${name}】?`,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                delClassify(id).then(() => {
                    message.success('删除成功！');
                    this.getList();
                });
            },
            onCancel() {
                message.info('取消删除~');
            },
        });
    }

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
                            onClick={() => this.onEdit()}
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
                            <Column title="操作" dataIndex="id" width={100} render={(id, item) => (
                                <Fragment>
                                    <p className='a-btn' onClick={() => this.onEdit(item)}>编辑</p>
                                    <p className="a-btn-red" onClick={() => this.onDel(item)}>删除</p>
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
