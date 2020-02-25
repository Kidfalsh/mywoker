import React from 'react'
import './index.less'
export default class Home extends React.Component {
  state={
    weather:''
  }
  getWeather=() => {
    
  }
  componentDidMount() {
    this.getWeather()
  }
  render() {
    return (
      <div className="home-wrap">
        欢迎学习使用flash
      </div>
    )
  }
}