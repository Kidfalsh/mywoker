import React from 'react'
import './index.less'

import NavLeft from './../../components/NavLeft'
export default class Home extends React.Component {
  state = {}
  componentDidMount() {
    document.title = ' 应用仓库'
  }
  render() {
    return (
      <div className="home-wrap">
        <div className='content-left'>
          <NavLeft />
        </div>
        <div className='content-right'>
          JHUANSG
        </div>
      </div>
    )
  }
}