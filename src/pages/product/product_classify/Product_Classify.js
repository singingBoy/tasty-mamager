import React, {Component, Fragment} from 'react';
import { Card, Icon, Empty, PageHeader, List, Typography, Button } from 'antd';

import Edit from './components/edit/Edit';

import { getFirstClassify } from './service';
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
    getList = () => {
        getFirstClassify().then(({data}) => {
            this.setState({
                rootClassify: data,
                loading: false
            })
        })
    };
    render() {
        const {rootClassify, loading} = this.state;
        return(
            <Fragment>
                <PageHeader className='product-classify'
                            title="类目管理" subTitle="网罗更多的类目，做最好的产品"
                            extra={[
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
                                            <div data-item={item} onClick={e => this.onEdit(e, item)}><Icon type="edit" /></div>,
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
}

export default Product_Classify;