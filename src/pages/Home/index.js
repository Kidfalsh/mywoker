import React from 'react'
import './index.less'
import * as Api from './api'
export default class Home extends React.Component {
  state={
    weather:''
  }
  getWeather=() => {
    Api.getWeather({}).then(res=>{
      console.log(res)
    })
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