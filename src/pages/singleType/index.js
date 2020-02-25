import React from 'react'
import './index.less'
export default class singleType extends React.Component {
  state={}
  componentDidMount() {
    // 接收参数
    console.log(this.props.location.state)
  }
  render() {
    return (
      <div className="singleType-wrap">
        singleType
      </div>
    )
  }
}