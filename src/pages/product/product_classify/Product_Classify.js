import React, {Component, Fragment} from 'react';
import { Card, Icon, Empty } from 'antd';
import { getFirstClassify } from './service';
import './product_classify.less';

class Product_Classify extends Component{
    constructor(props){
        super(props);
        this.state = {
            rootClassify: [],
        };
    }
    componentWillMount() {
        getFirstClassify().then(({data}) => {
            this.setState({
                rootClassify: data,
            })
        })
    }
    render() {
        const {rootClassify} = this.state;
        return(
            <Fragment>
                <h1 className='content-header-title'>类目管理</h1>
                <div className='product-classify pt20'>
                    {
                        rootClassify.map(item => (
                            <Card
                                key={item.id}
                                hoverable
                                className='mr10 mb10'
                                style={{ width: 220 }}
                                cover={item.image ? <img alt="海鲜" src={item.image} /> : <Empty description="暂无图片"/>}
                                actions={[
                                    <div onClick={() => this.navigateToDetail(item)}><Icon type="ordered-list"/></div>,
                                    <div data-item={item} onClick={() => this.onEdit(item)}><Icon type="edit" /></div>,
                                ]}
                            >
                                <Card.Meta
                                    title={item.name}
                                    description={item.description || '暂无描述'}
                                />
                            </Card>
                        ))
                    }

                </div>
            </Fragment>
        );
    }

    navigateToDetail = (item) => {
        const {history} = this.props;
        const {id, name} = item;
        history.push(`/product_classify_detail`, { id, name });
    };

    onEdit = (item) => {
        console.log(item);
    };
}

export default Product_Classify;