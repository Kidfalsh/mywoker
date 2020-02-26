import React from 'react';
import {  notification } from 'antd';
import './index.less';
import {connect} from 'react-redux';
import { switchBreadcrum } from 'red/action'
import { withRouter } from 'react-router-dom'
/** 左侧菜单栏 */
class LeftManager extends React.Component {
  state = {
    typeList: [
      { name: '应用管理', active: this.props.normalIndex === 0, path: '/ManagerApp/index', hasRight: true },
      { name: '应用审核', active: this.props.normalIndex === 1, path: '/ManagerApp/approve', hasRight: true },
      { name: '评论管理', active: this.props.normalIndex === 2, path: '/ManagerApp/comment', hasRight: true }
    ],
    userrole: '1',   // 普通用户
  }
  /** 改变左侧菜单类型 */
  changeType = (el, index) => {
    const { dispatch } = this.props;
    // 先跳转再赋值
    if(this.props.location.pathname!=='/singleType'){
      this.props.history.push({ pathname: el.path});
    }
    dispatch(switchBreadcrum(el.name))
    this.state.typeList.map(e => 
      e.active = false
    )
    el.active = true
    this.props.changeMunePath(el, index)
  }
  /** 错误提示 */
  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };
  componentDidMount() { }
  render() {
    const { typeList } = this.state;
    return (
      <div className={'myManegerLeftMenuContainer'}>
        {
          typeList.map((el, index) => {
            return <div className={'leftTop'}
              key={index} style={{ display: el.hasRight === true ? 'block' : 'none', color: el.active ? '#1890ff' : '', background: el.active ? '#2a82db' : '' }}
              onClick={this.changeType.bind(this, el, index)}
            >{el.name}
            </div>
          })
        }
      </div>
    );
  }
}
export default withRouter(connect()(LeftManager))