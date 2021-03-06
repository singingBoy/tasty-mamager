import React from 'react';
import './users_analyse.less';
import {CircleChar} from '../../../components'

import {option} from './data';
import {PageHeader} from "antd";

export default class Users_Analyse extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      vipUsersAnalyseOptions: {},
    };
  }
  componentDidMount() {
   setTimeout(() => {
     this.setState({
       vipUsersAnalyseOptions: option,
     })
   }, 2000);
  }

  render() {
    const {vipUsersAnalyseOptions} = this.state;
    return(
        <div>
          <PageHeader title='用户分析' subTitle='洞悉用户实情，把握产品走向' />
          <div className='vip-users-analyse'>
            {/*<CircleChar option={vipUsersAnalyseOptions}/>*/}
          </div>
        </div>
    )
  }
}

