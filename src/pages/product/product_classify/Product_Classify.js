import React, {Component, Fragment} from 'react';
import { Card, Icon, Empty, PageHeader, List, Typography, Button, Modal, message } from 'antd';

import Edit from './edit/Edit';

import { getClassify, delClassify } from './service';
import './product_classify.less';

class Product_Classify extends Component{
    constructor(props){
        super(props);
        this.state = {
            rootClassify: [],
            loading: true,
        };
    }
    componentWillMount() {
        this.getList();
    }

    render() {
        const {rootClassify, loading} = this.state;
        return(
            <Fragment>
                <PageHeader className='product-classify'
                            title="类目管理" subTitle="网罗更多的类目，做最好的产品"
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
                                    onClick={e => this.onEdit(e, {pid: 1})}
                                    key='plus'
                                    type="primary"
                                    shape="circle"
                                    icon="plus"
                                />
                            ]}
                >
                    <List
                        className='mt30'
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 24, lg: 5, md: 3, sm: 2, xs: 1 }}
                        dataSource={[...rootClassify]}
                        renderItem={item =>
                            (
                                <List.Item key={item.id}>
                                    <Card
                                        hoverable
                                        cover={item.image ? <img className='cover-image' alt="海鲜" src={item.image} /> : <Empty description="暂无图片"/>}
                                        actions={[
                                            <div onClick={e => this.navigateToDetail(e, item)}><Icon type="ordered-list"/></div>,
                                            <div onClick={e => this.onEdit(e, item)}><Icon type="edit" /></div>,
                                            <div onClick={e => this.onDel(e, item)}><Icon type="close" /></div>,
                                        ]}
                                        onClick={e => this.navigateToDetail(e, item)}
                                    >
                                        <Card.Meta
                                            title={item.name}
                                            description={
                                                <Typography.Paragraph ellipsis={{ rows: 3 }}>
                                                    {item.description|| '暂无描述'}
                                                </Typography.Paragraph>
                                            }
                                        />
                                    </Card>
                                </List.Item>
                            )
                        }
                    />
                    <Edit wrappedComponentRef={dom => this.editor = dom} callback={this.getList}/>
                </PageHeader>
            </Fragment>
        );
    }

    getList = () => {
        getClassify().then(({data}) => {
            this.setState({
                rootClassify: data,
                loading: false
            })
        })
    };

    navigateToDetail = (e, item) => {
        e.stopPropagation();
        const {history} = this.props;
        const {id, name, description} = item;
        history.push(`/product_classify_detail`, { id, name, description });
    };

    onEdit = (e, item) => {
        e.stopPropagation();
        this.editor.show(item);
    };

    onDel = (e, item) => {
        e.stopPropagation();
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
}

export default Product_Classify;