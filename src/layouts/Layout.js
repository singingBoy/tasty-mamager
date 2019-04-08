import React, {Suspense} from 'react';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {getAllRoutes} from '../router';
import Header from './Header';
import SideMenu from './SiderMenu';
import ErrorPage from '../pages/404/404';
import './style/layout.less';

const {Content} = Layout;

export default () => {
  return (
      <Router>
        <Layout>
          <Header/>
          <Layout>
            <SideMenu/>
            <Layout className='app-content'>
              <Content className='main-content'>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      {getAllRoutes().map((route, index) => (
                          <Route
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              component={route.component}
                          />
                      ))}
                      <Route component={ErrorPage} />
                    </Switch>
                  </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
  )
}
