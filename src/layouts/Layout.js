import React from 'react';
import {Layout} from 'antd';
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from '../router';
import Header from './Header';
import SideMenu from './SiderMenu'
import './style/layout.less';

const { Content } = Layout;

export default () => {
  return(
      <Layout>
        <Header />
        <Layout>
            <SideMenu />
            <Layout className='app-content'>
              <Content className='main-content'>
                <Router>
                  {routes.map((route, index) => (
                      <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                      />
                  ))}
                </Router>
              </Content>
            </Layout>

        </Layout>
      </Layout>
  )
}
