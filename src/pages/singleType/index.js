import React from 'react'
import './index.less'
import NavLeft from './../../components/NavLeft'
export default class singleType extends React.Component {
  state={
    text:''
  }
  /** 通过接收过来的参数动态改变数据显示 */
  initState = (item) => {
    this.setState({
      text:item.sysValue
    })
  }
  componentDidMount() {}
  render() {
    return (
      <div className="singleType-wrap">
        <div className='content-left'>
          <NavLeft chooseItemHandle = {this.initState}/>
        </div>
        <div className='content-right'>
          {this.state.text}
        </div>
      </div>
    )
  }
}