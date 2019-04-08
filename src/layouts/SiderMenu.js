import React, {Component, Fragment} from 'react';
import {Icon, Menu, Layout} from "antd";
import {Link, withRouter} from 'react-router-dom';
import routes, {getCurrentRoutes} from '../router';
import './style/sider.less'

class SiderMenu extends Component{
  render() {
    const {location} = this.props;
    let currentRoutes = getCurrentRoutes(location);
    if (!currentRoutes.length)
      currentRoutes = [{path: '/'}];
    return (
        <Layout.Sider width={250} className='side-menu' style={{ background: '#fff' }}>
          <Fragment>
            <Menu mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                  defaultOpenKeys={[currentRoutes[0].path]}
                  style={{ height: '100%', borderRight: 0 }}
            >
              {
                routes.map(route => {
                    if (route.hidden) {
                        return null;
                    }
                    return (
                        <Menu.SubMenu key={route.path} title={<span><Icon type={route.icon} />{route.name}</span>}>
                            {
                                route.children.map(child => {
                                    if (child.hidden) {
                                        return null;
                                    }
                                    return (
                                        <Menu.Item key={`${child.path}`}>
                                            <Link to={`${child.path}`}>
                                                <Icon type={child.icon} />{child.name}
                                            </Link>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu.SubMenu>
                    )
                })
              }
            </Menu>
          </Fragment>
        </Layout.Sider>
    )
  }
}
export default withRouter(SiderMenu);
