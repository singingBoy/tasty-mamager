import React from 'react';
import {Breadcrumb} from "antd";
import {Link, BrowserRouter as Router, withRouter} from 'react-router-dom';
import './style/bread_crumb.less';
import {getCurrentRoutes} from '../router';

export default withRouter((props) => {
  const {location} = props;
  return (
      <Router>
        <Breadcrumb className='bread-crumb'>
          {
            getCurrentRoutes(location).map((route, index) =>(
                <Breadcrumb.Item key={index}>
                  {
                    index === 0 ? <span>{route.name}</span> :
                        <Link to={route.path}>{route.name}</Link>
                  }
                </Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      </Router>
  )
})
