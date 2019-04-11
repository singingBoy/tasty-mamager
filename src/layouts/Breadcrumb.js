import React, {Component} from 'react';
import {Breadcrumb} from "antd";
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import './style/bread_crumb.less';
import {getCurrentRoutes} from '../router';

class HeaderBreadcrumb extends Component{
    render() {
        const {history, location} = this.props;
        return (
            <Router>
                <Breadcrumb className='bread-crumb'>
                    {
                        getCurrentRoutes(location).map((route, index) =>(
                            <Breadcrumb.Item key={index}>
                                {
                                    index === 0 ? <span>{route.name}</span> :
                                        <a onClick={() => history.push(route.path)}>{route.name}</a >
                                }
                            </Breadcrumb.Item>
                        ))
                    }
                </Breadcrumb>
            </Router>
        )
    }
}
export default withRouter(HeaderBreadcrumb);
