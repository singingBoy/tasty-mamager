import React, {Fragment} from 'react';
import {Layout, Icon, Popover, List, Badge, Avatar, Menu} from "antd";
import moment from 'moment';
import './style/header.less';
import Breadcrumb from './Breadcrumb'

const {Header} = Layout;

const notifications = [
    {
      title: 'New User is registered.',
      date: new Date(Date.now() - 10000000),
    },
    {
      title: 'Application has been approved.',
      date: new Date(Date.now() - 50000000),
    },
];
function onAllNotificationsRead(){
  alert('清空消息');
}

function handleClickMenu(e) {
  e.key === 'SignOut' && alert('退出登录');
}
export default () => (
    <Header className="header" id="layoutHeader">
      <div className="brand">
        <div className='logo'>
          <img alt="logo" src='/logo.svg'/>
          <h1>小鲜味管理系统</h1>
        </div>
      </div>
      <div className="header-content">
        <div className='header-content-left'>
          <Breadcrumb />
        </div>
        <div className='header-content-right'>
          {/*消息栈点*/}
          <Popover
              placement="bottomRight"
              trigger="click"
              key="notifications"
              overlayClassName='notificationPopover'
              getPopupContainer={() => document.querySelector('#layoutHeader')}
              content={
                <div className='notification'>
                  <List
                      itemLayout="horizontal"
                      dataSource={notifications}
                      locale={{
                        emptyText: 'You have viewed all notifications',
                      }}
                      renderItem={item => (
                          <List.Item className='notificationItem'>
                            <List.Item.Meta title={item.title} description={moment(item.date).fromNow()}/>
                            <Icon style={{fontSize: 10, color: '#ccc'}} type="right" theme="outlined"/>
                          </List.Item>
                      )}
                  />
                  {notifications.length ? (
                      <div onClick={onAllNotificationsRead} className='clearButton'>
                        <Icon type="delete" alt='清空消息'/>
                      </div>
                  ) : null}
                </div>
              }
          >
            <Badge
                count={notifications.length}
                dot
                offset={[-10, 10]}
                className="iconButton"
            >
              <Icon className='iconFont' type="bell"/>
            </Badge>
          </Popover>

          {/*用户信息*/}
          <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
            <Menu.SubMenu
                title={
                  <Fragment>
                    <span style={{ color: '#999', marginRight: 4 }}>Hi,甘杨星</span>
                    <Avatar style={{ marginLeft: 8 }} src='https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png' />
                  </Fragment>
                }
            >
              <Menu.Item key="SignOut">Sign out</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    </Header>
)
