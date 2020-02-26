import React from 'react'
import Header from 'components/Header'
import { Button, Tabs, Pagination, Input, Table, message, Icon } from 'antd'
import './index.less'
import LeftMenu from './../LeftManager';
import *　as api from './api'
const Search = Input.Search;
const TabPane = Tabs.TabPane;
export default class AppManager extends React.Component {
	state = {
		normalIndex: 0,
		PAGE: 1, 			// 当前为第一页
		size: 10,			// 每页table的数量
		total: 0, 		// 总数量
		current: 1, 	// 当前页码
		appName: '',	// 搜索关键字
		approveList: []
	}
	/** 统一封装弹框 */
	openMessage = (type, words) => {
		message.config({
			top: '10%',
			duration: 2,
			maxCount: 1,
		});
		if (type === 'error') {
			message.open({
				content: <div style={{ fontSize: 14 }}><Icon type="close-circle" theme="twoTone" twoToneColor="red" style={{ fontSize: 14 }} />{words}</div>,
				duration: 2
			})
		} else if (type === 'success') {
			message.open({
				content: <div style={{ fontSize: 14 }}><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 14 }} />{words}</div>,
				duration: 2
			})
		} else if (type === 'warning') {
			message.open({
				content: <div style={{ fontSize: 14 }}><Icon type="exclamation-circle" theme="twoTone" twoToneColor="#e5d70b" style={{ fontSize: 14 }} />{words}</div>,
				duration: 2
			})
		}
	}
	/** 应用新增 */
	addApps = () => {
		this.props.history.push({pathname:'/addApplication'})
	}
	/**跳转进去页面 */
	changeMunePath = (data, index) => {
		this.setState({
			normalIndex: index
		})
		this.props.history.push({ pathname: data.path })
	}
	/**
	 * 查询列表
	 * @param {string} status // 类型状态 上线、下线、审核中
	 * @param {number} page 	// 当前查询的页数
	 * @param {number} size 	// 每页的数量
	 */
	getApproveList = (status, page, size) => {
		let params = {
			approvalStatus: status,
			page: page,
			size: size,
			name: this.state.appName,
		};
		let approvalStatus = this.state.approvalStatus
		api.getApproveList(params).then(res => {
			if (res.result === 200) {
				if (status === 0) {
					res.content.list = res.content.list.map((i, index) => {
						return {
							...i,
							key: index,
							status: approvalStatus === '0' ? '审核中' : '未通过',
							approvalType: i.version === '1.0.0' ? '应用发布' : '应用更新'
						}
					})
				} else if (status === 2) {
					res.content.list = res.content.list.map((i, index) => {
						return {
							...i,
							key: index,
							status: approvalStatus === '0' ? '审核中' : '未通过',
							approvalType: i.nowVersion === '1.0.0' ? '应用发布' : '应用更新'
						}
					})
				}

				this.setState({
					approveList: res.content.list,
					total: res.total,
				})
			} else if (res.result === 401) {
				this.openMessage('warning', '当前会话已过期，请退出后重新登录！')
			} else {
				this.openMessage('warning', '获取审核应用失败')
			}
		})
	}
	/** 切换tab */
	onChangeStatus = (e) => {
		/** 切换了之后 */
		this.setState({
			appName: '',
			PAGE: 1, 							// 当前为第一页
			size: 10,							// 每页table的数量		
			current: 1,
			approvalStatus: e
		})
		this.getApproveList(e, 1, 10)
	}
	/** 点击分页书 查询列表(审核未通过) */
	changePageNumberOffApprove = (number) => {
		this.setState({
			PAGE: number,
			current: number
		})
		this.getApproveList('2', number, this.state.size)
	}
	/** 点击分页书 查询列表(审核中的应用)  */
	changePageNumberOnApprove = (number) => {
		this.setState({
			PAGE: number,
			current: number
		})
		this.getApproveList('0', number, this.state.size)
	}
	/** 搜索框事件 */
	onSearchHandle = (value) => {
		this.setState({
			PAGE: 1,
			current: 1,
			appName: value
		})
		this.getApproveList(this.state.approvalStatus, this.state.PAGE, this.state.size)
	}
	componentDidMount() { }
	render() {
		const { normalIndex, approveList } = this.state;
		const columnsApprove = [
			{
				title: '应用名称',
				dataIndex: 'name',
				width: '10%',
				align: 'left'
			}, {
				title: '应用类型',
				dataIndex: 'appTypeName',
				width: '10%',
				align: 'center',
			}, {
				title: '类别',
				dataIndex: 'approvalType',
				width: '10%',
				align: 'center',
			}, {
				title: '发布人',
				dataIndex: 'uploadUser',
				width: '10%',
				align: 'center',
			}, {
				title: '发布日期',
				dataIndex: 'uploadDate',
				width: '10%',
				align: 'center',
			}, {
				title: '当前状态',
				dataIndex: 'status',
				width: '10%',
				align: 'center',
			}, {
				title: '版本号',
				dataIndex: 'nowVersion',
				width: '10%',
				align: 'center',
			}, {
				title: '操作',
				key: 'code',
				align: 'center',
				render: (text, record, index) => <div key={index}>
					<Button type="primary" className={'button'} onClick={this.ApproveApp.bind(this, record)} disabled={record.isApproval === 1 ? false : true}>审批</Button>
				</div>
			}
		];
		const columnsApproveOff = [
			{
				title: '应用名称',
				dataIndex: 'name',
				width: '10%',
				align: 'left'
			}, {
				title: '应用类型',
				dataIndex: 'appTypeName',
				width: '10%',
				align: 'center',
			}, {
				title: '类别',
				dataIndex: 'approvalType',
				width: '10%',
				align: 'center',
			}, {
				title: '提交人',
				dataIndex: 'uploadUser',
				width: '10%',
				align: 'center',
			}, {
				title: '发布时间',
				dataIndex: 'uploadDate',
				width: '10%',
				align: 'center',
			}, {
				title: '当前状态',
				dataIndex: 'status',
				width: '10%',
				align: 'center',
			}, {
				title: '版本号',
				dataIndex: 'nowVersion',
				width: '10%',
				align: 'center',
			}, {
				title: '操作',
				key: 'code',
				align: 'center',
				width: '35%',
				render: (text, record, index) => <div key={index}>
					<Button type="primary" className={'button'} onClick={this.ChangeApp.bind(this, record)} disabled={record.isOwn === 0 ? true : false}>修改</Button>
					<Button type="primary" className={'button'} onClick={this.DeleteApp.bind(this, record)} disabled={record.isOwn === 0 ? true : false}>删除</Button>
				</div>
			}
		];
		return (
			<div className={'Appmaneger-wrap'}>
				<Header />
				<div className={'Appmaneger-box'}>
					<LeftMenu
						normalIndex={normalIndex}
						changeMunePath={this.changeMunePath}
					/>
					<div className={'Appmaneger-container'}>
						{/* 右侧应用列表详情 */}
						<div className={'right'}>
							<div className={'header'}>
								<Search
									placeholder="请输入应用名称"
									enterButton="搜索"
									size="default"
									onSearch={value => this.onSearchHandle(value)}
									style={{ width: '40%', marginRight: '20px' }}
								/>
								<div>
									<Button type="primary" icon="plus-circle" onClick={this.addApps} style={{ borderRadius: '8px', margin: '0 5px' }}>应用新增</Button>
								</div>
							</div>
							<Tabs className={'AppmanegerrightContent'} onChange={this.onChangeStatus}>
								<TabPane tab="审核中应用" key="0">
									<Table
										columns={columnsApprove}
										dataSource={approveList}
										bordered={true}
										pagination={false}
										size={'small'}
										locale={{
											emptyText: '暂无数据',
										}}
									/>
									<Pagination
										style={{ marginTop: '20px', textAlign: 'left', }}
										defaultCurrent={1}  // 默认在第一页
										current={this.state.current} // 当前页数
										total={this.state.total}  // 数据总数	
										pageSize={this.state.size} // 每页条数
										hideOnSinglePage={true} // 只有一页时是否隐藏分页器	
										onChange={e => { this.changePageNumberOnApprove(e) }} // 页码改变的回调，参数是改变后的页码及每页条数
										onShowSizeChange={e => { console.log(e) }} // pageSize 变化的回调
									/>
								</TabPane>
								<TabPane tab="审核未通过" key="2">
									<Table
										columns={columnsApproveOff}
										bordered={true}
										dataSource={approveList}
										pagination={false}
										size={'small'}
										locale={{
											emptyText: '暂无数据',
										}}
									/>
									<Pagination
										style={{ marginTop: '20px', textAlign: 'left', }}
										defaultCurrent={1}  // 默认在第一页
										total={this.state.total}  // 数据总数	
										pageSize={this.state.size} // 每页条数
										hideOnSinglePage={true} // 只有一页时是否隐藏分页器	
										onChange={e => { this.changePageNumberOffApprove(e) }} // 页码改变的回调，参数是改变后的页码及每页条数
									/>
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
