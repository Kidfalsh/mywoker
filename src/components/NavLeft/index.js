import React from 'react'
import { Rate } from 'antd'
import { withRouter } from 'react-router-dom'
// import MenuConfig from './../../config/menuConfig'
import './index.less'
// import * as api from './api'

// 引入redux
import { connect } from 'react-redux'
import { switchBreadcrum } from './../../redux/action'
class NavLeft extends React.Component {
  state = {
    typeList: [], /** 应用分类 */
    topList: [],  /** top20 */
    bigTypeList: [
      { sysValue: '离线类', encoded: '1' },
      { sysValue: '在线类', encoded: '2' },
      { sysValue: '远程类', encoded: '3' },
      { sysValue: '本地类', encoded: '4' },
    ],
    chooseItem:{}, /** 选择的分类 需要传值给 singleType组件 */
  }
  handleClick = ({ item, key }) => {

  }
  /** 获取top3 排行 */
  getTopten() {
    this.setState({
      topList: [
        { appSize: 15778, name: '新的卡还是', icon: '/', id: 'jhhks', startCount: 4 },
        { appSize: 15778, name: '新的卡还是', icon: '/', id: 'jhhaks', startCount: 4 },
        { appSize: 15778, name: '新的卡还是', icon: '/', id: 'jhhsks', startCount: 4 },
      ]
    })
  }
  /** 获取应用分类 */
  getApplocationTypeList() {
    this.setState({
      typeList: [
        { sysValue: '应用类', encoded: '2001' },
        { sysValue: '工具类', encoded: '2002', id: 'asdh' },
        { sysValue: '数据类', encoded: '2003', id: 'ssss' },
        { sysValue: '服务类', encoded: '2004', id: 'assadsd' },
      ]
    })
  }
  /** 点击分类 --传入到上一层控制逻辑 */
  clickTypeofApps(item) {
    // 进行事件派发
    const { dispatch } = this.props;
    this.setState({
      chooseItem: item
    })
    // 先跳转再赋值
    if(this.props.location.pathname!=='/singleType'){
      this.props.history.push({ pathname: '/singleType'});
    }
    this.props.chooseItemHandle&&this.props.chooseItemHandle(item)
    dispatch(switchBreadcrum(item.sysValue))
  }
  /** 我的应用和我的工具 */
  gotoTools = (value, item) => {
    const { dispatch } = this.props;
    if (value === '1') {
      this.props.history.push({ pathname: '/myApps' });
      dispatch(switchBreadcrum('我的应用'))
    } else if (value === '2') {
      this.props.history.push({ pathname: '/myTool' });
      dispatch(switchBreadcrum('我的工具'))
    } else if (value === '3') {
      this.props.history.push({ pathname: '/appDetails', state: { item } });
      dispatch(switchBreadcrum(item.name))
    }
  }
  componentDidMount() {
    this.getApplocationTypeList()
    this.getTopten()
  }
  render() {
    const { typeList, topList, bigTypeList } = this.state
    let spanList = [] /** 分类列表 */
    let top20 = [];   /** top20排名 */
    let BIGlist = [];  /**  大分类名称 */
    if (typeList.length > 0) {
      spanList = typeList.map(el => {
        return <span key={el.encoded} onClick={this.clickTypeofApps.bind(this, el)} style={{ color: this.props.HeadBreadcrumb === el.sysValue ? '#1890ff' : '#333' }}>{el.sysValue}</span>
      })
    }
    if (topList.length > 0) {
      top20 = topList.map((el, index) => {
        /** 处理文件大小字段 */
        if (el.appSize === 0) {
          el.appSize = '暂无'
        }
        if (el.appSize > 0) {
          if (el.appSize < 1024) {
            el.appSize = (el.appSize / 1024).toFixed(1) + 'KB'
          } else if (el.appSize < 1048576) {
            el.appSize = (el.appSize / 1024).toFixed(1) + 'KB'
          } else if (el.appSize < 1073741824) {
            el.appSize = (el.appSize / 1024 / 1024).toFixed(1) + 'MB'
          } else {
            el.appSize = (el.appSize / 1024 / 1024 / 1024).toFixed(1) + 'GB'
          }
        }
        return <div className={'topContent'} key={el.id} onClick={this.gotoTools.bind(this, '3', el)}>
          <div >{index + 1}.{el.name}</div>
          <div className={'topBody'}>
            <img src={el.icon} alt='图片缺失' style={{ color: '#ddd', textAlign: 'center', lineHeight: '50px', fontSize: 12 }} />
            <div className={'rightBody'}>
              <span>{el.name}</span>
              <span>大小：
                  {el.appSize}
              </span>
              <Rate disabled defaultValue={Number(el.startCount)} allowHalf style={{ fontSize: 12 }} />
            </div>
          </div>
        </div>
      })
    }
    BIGlist = bigTypeList.map(el => {
      return <span key={el.encoded} onClick={this.clickTypeofApps.bind(this, el)} style={{ color: this.props.HeadBreadcrumb === el.sysValue ? '#1890ff' : '#333' }}>{el.sysValue}</span>
    })
    return (
      <div className={'navLeft'}>
        <div className={'homeLeft'}>
          <div className={'first'}>
            <span onClick={this.gotoTools.bind(this, '1')}>我的应用</span>
            <span onClick={this.gotoTools.bind(this, '2')}>我的工具</span>
          </div>
          <div className={'second'}>
            <div className={'titleMarket'}>应用市场</div>
            <div className={'secondContent'}>
              {spanList}
            </div>
            <div className={'secondContent'} style={{ borderTop: "1px solid #2a82db" }}>
              {BIGlist}
            </div>
          </div>
          <div className={'top'}>
            <div className={'titleTop'}>软件排行</div>
            <div className={'topContentContainer'}>
              {top20}
              {top20.length === 0 ? <p style={{ textAlign: 'center', color: '#ddd' }}>暂无排行信息</p> : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    HeadBreadcrumb: state.HeadBreadcrumb
  }
}
export default withRouter(connect(mapStateToProps)(NavLeft))