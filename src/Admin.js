import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
// import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
export default class Admin extends React.Component {

  render() {
    return (
      <Row className='container'>
        {/* <Col span={4} className='nav-left'>
          <NavLeft />
        </Col>
        <Col span={20} className='main'>
          <Header />
          <Row className='content'>
            {this.props.children}
          </Row>
          <Footer />
        </Col> */}
        {/* <Col span={24} className='nav-left'>
          <NavLeft />
        </Col> */}
        <Col span={24} className='main'>
          <Header />
          <div className='content'>
            <div className='content-left'>
              <NavLeft />
            </div>
            <div className='content-right'>
              {this.props.children}
            </div>
          </div>
          {/* <Footer /> */}
        </Col>
      </Row>
    )
  }
}