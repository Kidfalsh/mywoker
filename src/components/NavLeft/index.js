import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import MenuConfig from './../../config/menuConfig'
import './index.less'

// 引入redux
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  state = {
    menuTreeNode: null,
    currentKey: ''
  }
  handleClick = ({item,key}) => {
    // 进行事件派发
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey: key
    })
  }
  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    this.setState({
      menuTreeNode,
      currentKey
    })
  }
  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }
  render() {

    return (
      <div>
        <div className={'logo'}>
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>aAHGS</h1>
        </div>
        <Menu
          mode="vertical"
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
          theme={'dark'}>
          {this.state.menuTreeNode || null}
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)