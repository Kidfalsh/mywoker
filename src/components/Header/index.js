import React from 'react'
import { Row, Col, Breadcrumb, Icon } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom";
import { switchBreadcrum } from './../../redux/action'
class Header extends React.Component {
  state = {
    userName: 'flash',
  }
  componentDidMount() {}
  gotoRouter= (value) => {
    const { dispatch } = this.props;
    if(value === 'gotoHome'){
      this.props.history.push({pathname : '/home'});
      dispatch(switchBreadcrum(''))
    }else{
      dispatch(switchBreadcrum(value))
    }
  }
  render() {
    let breadList = [];
    if(this.props.HeadBreadcrumb.indexOf(',')!=='-1'){
      breadList = this.props.HeadBreadcrumb.split(",").map((el, index) => {
        return <Breadcrumb.Item onClick={this.gotoRouter(el)} className={'backHome'} key={index}>{el}</Breadcrumb.Item>
      })
    }
    return (
      <div className='header'>
        <Row className="header-top">
          <Col span={4} align="left" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/favicon.png" alt="" />
            <span style={{ marginLeft: '20px', fontSize: '20px' }}>应用仓库</span>
          </Col>
          <Col span={20}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#asd">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            {/* 首页 */}
            <Breadcrumb separator=">">
              <Breadcrumb.Item onClick={this.gotoRouter.bind(this,"gotoHome")} className={'backHome'}><Icon type="home" theme="filled" className={'icons'} />首页</Breadcrumb.Item>
              {breadList}
            </Breadcrumb>
          </Col>
          <Col span={20} className="weather">
            <span className="date">xxxxx</span>
          </Col>
        </Row>
      </div>
    )
  }
}
// header 是获取数据
const mapStateToProps = state => {
  return {
    menuName: state.menuName,
    HeadBreadcrumb: state.HeadBreadcrumb
  }
}

export default withRouter(connect(mapStateToProps)(Header))