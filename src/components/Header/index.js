import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import { connect } from 'react-redux'
class Header extends React.Component {
  state = {
    userName: 'flash',
    sysTime: '',
  }
  componentDidMount() {
    this.setTimeDate()
  }
  setTimeDate = () => {
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000);
  }
  render() {
    return (
      <div className='header'>
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#asd">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            {/* 首页 */}
            {this.props.menuName}
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
// header 是获取数据
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)