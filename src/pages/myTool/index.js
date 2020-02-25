import React from 'react'
import Header from './../../components/Header'
import './index.less'
export default class myTool extends React.Component {
  state={}
  componentDidMount() {
  }
  render() {
    return (
      <div className="myTool-wrap">
        <Header />
        myTool
      </div>
    )
  }
}