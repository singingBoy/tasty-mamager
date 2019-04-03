import React from 'react';
import {Breadcrumb} from "antd";
import {Link, BrowserRouter as Router,} from 'react-router-dom';
import './style/bread_crumb.less';

export default () => (
    <Router>
      <Breadcrumb className='bread-crumb'>
        <Breadcrumb.Item>
          <Link to="/#">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/#">List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/#">APP</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Router>
)
