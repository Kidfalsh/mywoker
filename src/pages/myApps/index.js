import React from 'react'
import Header from './../../components/Header'
import './index.less'
export default class myApps extends React.Component {
  state={}
  componentDidMount() {
  }
  render() {
    return (
      <div className="myApps-wrap">
        <Header />
        我的应用
      </div>
    )
  }
}