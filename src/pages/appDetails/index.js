import React from 'react'
import './index.less'
import Header from './../../components/Header'
export default class appDetails extends React.Component {
  state={}
  componentDidMount() {
    // 接收参数
    console.log(this.props.location.state)
  }
  render() {
    return (
      <div className="appDetails-wrap">
        <Header />
        appDetails
      </div>
    )
  }
}