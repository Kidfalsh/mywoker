import React from 'react'
import './index.less'
import *　as api from './api'
import NavLeft from './../../components/NavLeft'
import { message, Button } from 'antd'
export default class Home extends React.Component {
  state = {
    appList: []
  }
  getAppList = () => {
    api.getAppList({}).then(res => {
      console.log(res)
      if (res.result === 200) {
        message.success('查询成功！')
        this.setState({
          appList: res.content
        })
      } else {
        message.warning(res.message)
      }
    })
  }
  /** 下载依赖包 */ 
  downloadApp = (item) => {
    console.log(window)
    let url = `/client-manager/apphall/resource/application/dependency/file?dependencyFileId=${item.dependencyFileId}`
    window.open(window.location.origin + url,"_self")
  }
  componentDidMount() {
    document.title = ' 应用仓库'
    this.getAppList()
  }
  render() {
    const { appList } = this.state;
    let applist = []
    if (appList && appList.length > 0) {
      applist = appList.map(el => {
        return <div className={'appTypeItem'} key={el.id}>
          <div className={'imgBox'}>
            <img alt='图片缺失'
              style={{ color: '#ddd', textAlign: 'center', lineHeight: '60px' }}
              src={el.icon}
              onError={(e) => { e.target.onerror = null; e.target.src = '' }}
              className={'orgin'} />
            <img alt="" className={'appTypeLogo'} />
          </div>
          <p>{el.name}</p>
          <Button type="primary" size={"small"} onClick={this.downloadApp.bind(this, el, false)}>下载</Button>
          <Button size={"small"}>安装</Button>
        </div>
      })
    }
    return (
      <div className="home-wrap" >
        <div className='content-left'>
          <NavLeft />
        </div>
        <div className='content-right'>
          <div className={'appType'}>
            <div className={'appTypeName'}>123</div>
            <div className={'appTypeContent'} style={{ height: 'auto' }}>{applist}</div>
          </div>
        </div>
      </div>
    )
  }
}