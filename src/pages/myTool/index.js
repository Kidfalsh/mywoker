import React from 'react'
import { connect } from 'react-redux'
import Header from './../../components/Header'
import { message } from 'antd';
import './index.less'
import { switchBreadcrum } from './../../redux/action'
class myTool extends React.Component { 
	state = {
		toolList: [
			{name:'应用管理', img:  require('./img/icon_4.png'), path: '/ManagerApp/index' },
			{name:'资源监控', img:  require('./img/icon_2.png'), path: '/ResourceControl' },
			{name:'系统设置', img:  require('./img/icon_3.png'), path: '/ManagerApp' },
			{name:'下载代理', img:  require('./img/icon_5.png'), path: '/ManagerApp' },
			{name:'网络映射', img:  require('./img/icon_6.png'), path: '/NetMapping' },
		],
		RouterArr: [
			{pathName:'我的工具', path:'/mytool',isWeight: true, isgoto: true},
		]
	}
	/**跳转进去apps */
	gotoApps = (item) => {
    const { dispatch } = this.props;
    dispatch(switchBreadcrum(item.name))
		if(item.name === '应用管理' || item.name === '资源监控'){
      this.props.history.push({ pathname: item.path});
		}else if(item.name === '下载代理'){
			let url = `/store/application/down_agent/v1.0`
    		window.open(window.location.origin + url,'_self')  
		}else{
			message.warning("功能【"+item.name+"】处于开发中", 0.5)
		}
	}
	componentDidMount() {
		// document.title = "我的工具"
	}
	render() {
		const { toolList } = this.state;
		return (
			<div className={'myTool-wrap'}>
				<Header />
				<div className={'mytoolcontent'}>
					{/* 右侧应用列表详情 */}
					<div className={'right'}>
						<div className={'rightContent'}>
							{
								toolList.map((el,index) => {
									return <div className={'commonItems'} key={index} onClick={this.gotoApps.bind(this,el)}>
										<img src={el.img} alt="图片"/>
										<p>{el.name}</p>
									</div>
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect()(myTool)