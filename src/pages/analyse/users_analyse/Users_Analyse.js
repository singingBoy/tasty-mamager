import React from 'react';
import './users_analyse.less';
import {CircleChar} from '../../../components'

import {option} from './data';

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
          <h1>users_analyse</h1>
          <div className='vip-users-analyse'>
            <CircleChar option={vipUsersAnalyseOptions}/>
          </div>
        </div>
    )
  }
}

