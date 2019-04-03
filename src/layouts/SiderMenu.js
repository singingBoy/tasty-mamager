import React from 'react';
import {Icon, Menu, Layout} from "antd";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import routes from '../router';
import './style/sider.less'

export default () => {
  return (
      <Layout.Sider width={250} className='side-menu' style={{ background: '#fff' }}>
        <Router>
          <Menu mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[routes[0].path]}
                style={{ height: '100%', borderRight: 0 }}
          >
            {
              routes.map(route => (
                  <Menu.SubMenu key={route.path} title={<span><Icon type={route.icon} />{route.name}</span>}>
                    {
                      route.children.map(child => (
                          <Menu.Item key={`${route.path}${child.path}`}>
                            <Link to={`${route.path}${child.path}`}>
                              <Icon type={child.icon} />{child.name}
                            </Link>
                          </Menu.Item>
                      ))
                    }
                  </Menu.SubMenu>
              ))
            }
          </Menu>
        </Router>
      </Layout.Sider>
  )
}
