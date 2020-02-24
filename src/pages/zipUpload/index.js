
import React from 'react';
import './index.less'
import * as api from './api'
import { notification,Input, Upload, Icon, Select, Progress, Divider, Modal,message, Button } from 'antd';

const Option = Select.Option;

export default class zipUpload extends React.Component {
	state = {
		normalIndex: 0,   		// 默认第一个亮 -- 应用管理页面
		appTagList:[],				// 应用标签列表
		appTypeList: [], 			// 应用分类列表
		approveList: [], 			// 审核人列表
		radioValue: '1', 			// 是否需要传参
		functionValue: 1, 		// 功能类型值 --默认是1 -- C/S应用
		/** 图片上传 */
		imgIntroList: [], 		// 介绍图片的文件list
		imgLogo: [],					// 当前的logo文件图标
		previewVisible: false,
    previewImage: '',
		uploading: false, 		// 上传状态

		imageUrl: "",
		radioValue: '1', 		  // 是否需要传参
		appName: '',  			  // 应用名称
		appType: '', 			    // 应用分类
		appMark: '', 					// 应用分类标签的值
		appCpb: 'Linux', 			// 兼容系统的值  --先默认为第一个
		isUserinfo: '', 		  // 是否需要传参
		approvalUserid:'', 		//审核人id
		appClass:"默认分类",
		icon: '', 			 	    // 图片上传的返回信息 path 
		cmdLine: 'http://', 	// B/S应用访问路径
								          // 安装依赖包的存储信息 C/S应用信息存储
		processes: '', 			  // 启动应用的路径
		process: '', 			  	// 启动应用的路径
		fileListAZ: [],
		isSetupAZ: false, 		// 安装文件的进度条
		SetupAZValue: 0, 		  // 依赖文件安装的值 安装百分比
		setupAZInfo: {}, 		  // 安装包成功后返回的信息
		uploadTimes: 0,       // 上传文件的次数

		/** 是否有安装文件了 */
		isAZsymbol: false, 	
		zipName: '',          // 需要保存zip包名字   
		exeIcons: '',					// 图片名字icon
	}
	/** 统一封装弹框 */
	openMessage = (type,words) => {
		message.config({
			top: '50%',
			duration: 2,
			maxCount: 1,
		});
		if(type === 'error'){
			message.open({
				content:<div style={{fontSize:18}}><Icon type="close-circle" theme="twoTone" twoToneColor="red" style={{fontSize:18}} />{words}</div>,
				duration: 2
			})
		}else if(type === 'success'){
			message.open({
				content:<div style={{fontSize:18}}><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize:18}} />{words}</div>,
				duration: 2
			})
		}else if(type === 'warning'){
			message.open({
				content:<div style={{fontSize:18}}><Icon type="exclamation-circle" theme="twoTone" twoToneColor="#e5d70b" style={{fontSize:18}} />{words}</div>,
				duration: 2
			})
		}
	}
	/**
	 * 提示信息
	 * @param {string} type // 提示信息的类型
	 * @param {string} msg  // 提示信息的内容
	 */
	noticeMsg = (type,msg) => {
		notification[type]({
			message: msg,
		});
	};
	/** 应用分类选择 */
	handleChangeType = (e) => {
		this.setState({
			appType: e,
		})
	}
	/** 选择应用进程 */
	handleChangeProcess  = (e) => {
		this.setState({
			process: e,
		})
		let exeIcons = this.state.exeIcons
		let arr = []
		if(exeIcons){
			arr = exeIcons.split(",")
			/** 只有一个exe文件 */
			if(arr.length===1){
				this.setState({
					imgLogo: exeIcons.split("|")[2],	
					icon: exeIcons.split("|")[1],	
					imageUrl: exeIcons.split("|")[2],	
				})
			}else if(arr.length>1){
				/** 遍历选择哪个 就显示那个的图标 */
				arr.map(el=>{
					if(el.split('|')[0] === e){
						this.setState({
							imgLogo: el.split("|")[2],	
							icon: el.split("|")[1],	
							imageUrl: el.split("|")[2],	
						})
					}
				})
			}
		}
	}
	/** 兼容系统选择 */
	handleChangeSys = (e) => {
		this.setState({
			appCpb: e
		})
	}
	/** 应用标签选择 */
	handleChangeBq = (e) => {
		this.setState({
			appMark: e.join(",")
		})
	}
	/** 功能类型选择 */
	changeFunction = (e) => {
		this.setState({
			functionValue: e,
		})
		/** 若为B/S应用 清空CS相关的东西 */
		if(e === 2){
			this.setState({
				processes:'',
				process:'',
				fileListAZ: [],
				isSetupAZ: false, 	// 安装文件的进度条
				SetupAZValue: 0, 		// 依赖文件安装的值 安装百分比
				setupAZInfo: {}, 		// 安装包成功后返回的信息
				fileListYL: [],  
				isSetupYL: false, 	// 依赖文件的进度条
				SetupYLValue: 0, 		// 依赖文件安装的值 安装百分比
				setupYLInfo: {}, 		// 依赖包成功后返回的信息
			})
		} else if(e===1){
			this.setState({
				cmdLine: 'http://'
			})
		}
	}
	/** 审核人选择 */
	handleChangeApprover = (e) => {
		this.setState({
			approvalUserid: e,
		})
	}
	/** 取消图片 --介绍图片 */
	handleCancel = () => {
		this.setState({ previewVisible: false })
	}
	
	/** 提交之前先检查必填项是否都填写 */
	checkMustData = () => {
		if(!this.state.appName){
			this.openMessage('warning', '应用名称不能为空！')
			return false
		}
		else if(!this.state.functionValue){
			this.openMessage('warning', '功能类型不能为空！')
			return false
		}
		else if(!this.state.appType){
			this.openMessage('warning', '应用分类不能为空！')
			return false
		}
		else if(!this.state.appCpb){
			this.openMessage('warning', '兼容系统为必选！')
			return false
		}else if(this.state.imgIntroList.length===0){
			this.openMessage('warning', '必须上传至少一张介绍图片！')
			return false
		} else if(!this.state.icon){
			this.openMessage('warning', '必须上传logo图标！')
			return false
		}else {
			return true
		}
	}
	/** 对于BS应用还需要检查链接是否合法 */
	checkUrlRight = (str_url) => {
		var strRegex = "^(https|http)://"
			+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
			+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
			+ "|" // 允许IP和DOMAIN（域名）
			+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
			+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
			+ "[a-z]{2,6})" // first level domain- .com or .museum 
			+ "(:[0-9]{1,4})?" // 端口- :80 
			+ "((/?)|" // a slash isn't required if there is no file name 
			+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
		var re = new RegExp(strRegex);
		//re.test()
		if (re.test(str_url)) {
			return (true);
		} else {
			return (false);
		}
	}
	/** 合并已经填写的信息 */
	initAppinfoSaveData = () => {
		let obj = {};
		obj.name = this.state.appName;
		obj.type = String(this.state.functionValue);
		obj.appType = this.state.appType;
		obj.developer = this.state.developer;
		obj.appLanguage = this.state.appLanguage;
		obj.contact = this.state.contact;
		obj.appCpb = this.state.appCpb;
		obj.appMark = this.state.appMark;
		obj.description = this.state.description;  // 应用介绍
		obj.feature = this.state.feature;  // 应用特性
		obj.icon = this.state.icon;	 // 应用图标
		obj.isUserinfo = (this.state.isUserinfo === 0 ||this.state.isUserinfo === 1)?this.state.isUserinfo:0;
		obj.approvalUserid = this.state.approvalUserid;
		obj.process = this.state.process;
		obj.processes = this.state.processes;
		/** 处理应用介绍图片 */
		let briefImages = []
		let imgIntroList = this.state.imgIntroList
		if(imgIntroList&&imgIntroList.length>0){
			imgIntroList.map(el=>{
				briefImages.push( el.response.content.fileId)
			})
		}
		briefImages = briefImages.join(",")
		obj.briefImages = briefImages
		/** 如果是B/S应用 */
		obj.cmdLine = this.state.cmdLine;
		obj.filesize = this.state.setupAZInfo.filesize;
		return obj
	}
	/** 合并两个文件的返回信息 */
	mergeAPPCreateInfo = (appFile) => {
		let submitData = {
			"id": null,
			"name": null,
			"appType": null,
			"title": null,
			"code": null,
			"singleton": null,
			"contact": "",
			"sn": null,
			"parentCode": null,
			"parentName": null,
			"type": "",
			"process": null,
			"cmdLine": "http://",
			"appClass": null,
			"status": null,
			"version": null,
			"meansCode": null,
			"isCommon": 0,  		// 是否常用应用
			"isInstall": 0,  		// 是否有安装文件
			"isDependency": 0, 	// 是否有依赖文件
			"filesize": 0,      // 文件大小
			"downloadCount": null,  
			"description": "",  // 应用描述
			"path": "",  // 安装文件路径
			"icon": "",	// logo路径
			"developer": "",		// 开发者名字
			"tag": null,
			"uploadUserid": null,
			"approvalUser":'',
			"uploadUserrole": null,
			"uploadDepartment": null,
			"uploadDate": null,
			"onlineDate": null,
			"offlineDate": null,
			"offlineReason": null,
			'processes':'',
			"processes": "",  // 应用进程 BS无
			"jars": null, 
			"isUserinfo": 0,     // 是否需要传参
			"appCpb": this.state.appCpb,      //  兼容性
			"appLanguage":"",  //  开发语言
			"appMark":"", // 应用标签编码，多个标签之间用逗号(,)隔开
			"approvalUserid":"", // 请求审批人员id
			"briefImages":"", //应用图片 数组
			'feature': '', // 应用特性
		}
		let totalFile = {};
		// 合并
		totalFile = Object.assign({},submitData,appFile)
		totalFile.filesize = appFile.filesize || 0;
		totalFile.isCommon = appFile.isCommon || submitData.isCommon;
		totalFile.isDependency = 0;  // 统一不需要依赖文件
		totalFile.isInstall = appFile.isInstall || 0; // 必须要有安装文件
		totalFile.processes = appFile.processes;
		totalFile.process = appFile.process;
		totalFile.path = appFile.path
		
		totalFile.description = this.state.description;
		/** 合并approvalUser 审核人姓名 */
		totalFile.approvalUser = ''
		this.state.approveList.map(el=>{
			if(el.userId===this.state.approvalUserid){
				totalFile.approvalUser = el.userName
			}
		})
		return totalFile;
	}
	/** 提交应用审核 */
	submitApproveData =	() => {
		/** 先检查必填项 */
		if(!this.checkMustData()){return }
		/** 初始化保存的信息 */
		let obj = this.initAppinfoSaveData();
		/** 先判断功能类型 1--c/s 需要检验setupAZInfo */
		if(this.state.functionValue === 1){
			if(JSON.stringify(this.state.setupAZInfo)!="{}"){
				let params = this.mergeAPPCreateInfo(this.state.setupAZInfo)
				params = Object.assign({},params,obj)
				params.zipName = this.state.zipName; //zipName 保存
				if(!params.approvalUser||!params.approvalUserid){
					this.openMessage('warning', '尚未选择审核人！')
					return
				}
				api.uploadAppInfoNew(params)
					.then(res =>{
						if(res.code === '200'){
							this.openMessage('success', res.msg)
							/** 需要清空数据  再返回页面 */
							this.clearAppinfo()
						}else {
							this.openMessage('error', res.msg)
						}
					})
			} else {
				this.openMessage('warning', '安装文件必须上传！')
				return false
			}
		} else if( this.state.functionValue === 2){
				/** 为B/S 类型 */

				let params = this.mergeAPPCreateInfo(obj)
				params = Object.assign({},params,obj)
				if(!params.approvalUser||!params.approvalUserid){
					this.openMessage('warning', '尚未选择审核人！')
					return
				}
				if (!this.checkUrlRight(this.state.cmdLine)) {
					this.openMessage('warning', '当前URL格式不正确，请正确输入！')
					return
				}
				api.uploadAppInfoNew(params)
					.then(res =>{
						console.log(res)
						if(res.code === '200'){
							this.openMessage('success', res.msg)
							/** 需要清空数据 */
							this.clearAppinfo()
						}else {
							this.openMessage('error', res.msg)
						}
					})
			}
	}
	/** 保存成功之后需要清空数据 */
	clearAppinfo = () => {
		this.setState({
			fileList: [], // 文件附件列表
			uploading: false, // 上传状态
			imageUrl: "",
			radioValue: '1', // 是否需要传参
			functionValue: 1, // 功能类型值 --默认是1
			appTagList:[],// 应用标签列表
			appTypeList: [], // 应用分类列表
			approveList: [], // 审核人列表
			appName: '',  // 应用名称
			appType: '', // 应用分类
			appMark: '', // 应用分类标签的值
			appCpb: '', // 兼容系统的值
			isUserinfo: '', // 是否需要传参
			approvalUserid:'', //审核人id
			appClass:"默认分类",
			icon: '', // 图片上传的返回信息 path 
			// 安装依赖包的存储信息 C/S应用信息存储
			fileListAZ: [],
			isSetupAZ: false, // 安装文件的进度条
			SetupAZValue: 0, // 依赖文件安装的值 安装百分比
			setupAZInfo: {}, // 安装包成功后返回的信息
		})
	}
	/** 获取变成base64 */
	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
	componentDidMount() {
		/** 先获取应用标签、获取应用分类、获取审核人列表*/
	}
	render() {
		const { normalIndex, imgIntroList,imgLogo,previewVisible,previewImage, uploading, imageUrl, appTagList, appTypeList, approveList,processes } = this.state;
		/** 应用标签多选框 */
		const children = [];
		const size = 'default';
		appTagList.map(i=>{
			children.push(<Option key={i.id} value={i.encoded}>{i.sysValue}</Option>);
		})
		/** 应用分类 */
		const childrenType = [];
		appTypeList.map(i=>{
			childrenType.push(<Option key={i.id} value={i.encoded}>{i.sysValue}</Option>);
		})
		/** 审核人列表 */
		const childrenApprovers = [];
		approveList.map(i=>{
			childrenApprovers.push(<Option key={i.userId} value={i.userId}>{i.userName}</Option>);
		})
		/** 图片介绍的上传 */
		const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
		);
		/** 上传应用介绍图片 最多五张 */
		const imgProps = {
			name:"file",
			accept:"image/*",
			listType:"picture-card",
			action:"/application-file/file/v1/upload", //默认上传
			headers: {
				'auth': localStorage.getItem('token'),
			},
			fileList: imgIntroList,
			onPreview: (file) => {
				this.setState({
					previewImage: file.response.content.url || file.thumbUrl,
					previewVisible: true,
				});
			},
			onChange:({ fileList }) => {
				this.setState({ imgIntroList:fileList})
			},
		}
		/** 应用logo的上传 */
		const uploadLogo = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图标</div>
      </div>
		);
		/** 保存logo 上传文件  */
		const imgLogoProps = {
			name: "file",
			accept:"image/png",
			listType: "picture-card",
			// action: "/application-file/file/v1/upload", //默认上传
			showUploadList:false,
			action: "/client-manager/api/apphall/resource/upload/icon", //默认上传
			fileList: imgLogo,
			headers: {
				'auth': localStorage.getItem('token'),
			},
			beforeUpload: (file) => {
				this.setState({ imgLogo: [] })
				const isJPG = file.type === 'image/png';
				if (!isJPG) {
					this.openMessage('error', '你只能上传 PNG 图片格式!')
				}
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.openMessage('error', '图片必须小于 2MB!')
				}
				return isJPG && isLt2M;
			},
			onChange:(info) => {
				this.setState({ imgLogo: info.fileList })
				if (info.file.status === 'uploading') {
					this.setState({ loading: true });
					return;
				}
				if (info.file.status === 'done') {
					// 上传完成 保存图片路径
					if(info.file.response && info.file.response.code === '200'){
						this.state.icon = info.file.response.data;
					}
					// Get this url from response in real world.
					this.getBase64(info.file.originFileObj, imageUrl => this.setState({
						imageUrl,
						loading: false,
					}));
				}
			},
		}
		/** 
		 * 安装文件的上传
		 * C/S安装依赖包的运行 远程的应用
		 */
		const propsAZ = {
			action: '/client-manager/api/apphall/resource/bundle',  // 默认会上传
			name: 'appFile',
			accept:".zip",
			headers: {
				'auth': localStorage.getItem('token'),
			},
			onRemove: (file) => {
				this.setState(({ fileListAZ }) => {
					const index = fileListAZ.indexOf(file);
					const newFileList = fileListAZ.slice();
					newFileList.splice(index, 1);
					return {
						fileListAZ: newFileList,
					};
				});
				/** 移除了安装包信息需要重新吧启动程序置空 */
				this.setState({
					processes: '',
					process: '',
					imgLogo: [],
					uploadTimes: 0,
					isSetupAZ: false,
				})
				processList = []
				processesArr = []
			},
			onChange: (file) => {
				/** file 对象里面有response 对象可以返服务器的返回值 */
				if(file.file.percent){
					this.setState({
						isSetupAZ: true,
						SetupAZValue: parseInt(Number(file.file.percent))
					})
					if(file.file.response&& file.file.response.code === '200'){
						this.openMessage('success', '上传服务器成功')
						/** 显示文件 进度条 */
						this.setState({
							isSetupAZ: false,
							SetupAZValue: file.file.percent,
							setupAZInfo: file.file.response.data,
							processes:file.file.response.data.processes,
							process: file.file.response.data.process,
							zipName: file.fileList[0].name, // 需要保存zipName
							uploadTimes : 1,               // 表示上传成功了的
						})
						this.state.exeIcons = file.file.response.data.exeIcons
					} else if(file.file.status&&file.file.status === 'error') {
						this.openMessage('error', '上传服务器失败！')
						/** 显示文件 进度条 */
						this.setState({
							isSetupAZ: false,
							SetupAZValue: 0,
							uploadTimes : 0,
							setupAZInfo: {},
							fileListAZ:[], // 上传不成功清掉
						})
					}
				}
			},
      beforeUpload: (file) => {
				if(this.state.uploadTimes===1){
					this.openMessage('warning', '当前只能上传一个zip文件。若需要提交，请删除当前已经上传的zip！')
					this.setState({
						isSetupAZ: false,
						SetupAZValue: 0,
					})
					return false
				}
				this.setState(({ fileListAZ }) => ({
					fileListAZ: [...fileListAZ, file],
				}));
				const { fileListAZ } = this.state;
				const formData = new FormData();
				fileListAZ.forEach((file) => {
					formData.append('files[]', file);
				});
      },
			fileList: this.state.fileListAZ,
		};
		/** 安装文件上传成功之后 */
		let processesArr = []
		let processList = []  // 选择应用程序进程的列表
		/** 有路径并且有多个 */
		if(processes&&processes.indexOf(',')>0){
			processesArr = processes.split(",")
			processesArr.map((el,index) => {
				processList.push(<Option key={index} value={el}>{el}</Option>);
			})
			this.setState.process = processes.split(",")[0]
		}else if(processes){
			this.setState.process = processes
			processList.push(<Option key={processes} value={processes}>{processes}</Option>);
		}
		return (
			<div className={'myAddApplication'}>
				<div className={'myAppcontent'}>
					{/* 右侧应用列表详情 */}
					<div className={'right'}>
						<div className={'rightContent'}>
							{/* 基本信息 */}
							<div className={'headerTitle'}>
								<Divider dashed orientation={'left'} style={{padding:0,margin: 0}}>基本信息 <span style={{color:"red"}}>(*为必填项)</span> </Divider>
							</div>
							<div className={'baseBody'}>
								<div  className={'bodyItem'}>
									<p><span className={'titleText'}>*</span>应用类型：</p>
									<Select defaultValue={1} className={'select'} onChange={this.changeFunction}>
										<Option value={1}>C/S离线应用</Option>
										<Option value={2}>B/S在线应用</Option>
									</Select>
								</div>
								<div  className={'bodyItem'}>
									<p><span className={'titleText'}>*</span>应用名称：</p>
									<Input placeholder="请输入应用名称"   onChange={e=>{this.setState({appName:e.target.value})}}/>
								</div>
								<div  className={'bodyItem'}>
									<p><span className={'titleText'}>*</span>应用分类：</p>
									<Select  className={'select'} onChange={this.handleChangeType} placeholder="请选择分类">
										{childrenType}
									</Select>
								</div>
								<div  className={'bodyItem'}>
									<p>开发者：</p><Input placeholder="请输入开发者姓名" onChange={e=>{this.setState({developer:e.target.value})}}/>
								</div>
								<div  className={'bodyItem'}>
									<p>开发语言：</p><Input  placeholder="请输入开发语言" onChange={e=>{this.setState({appLanguage:e.target.value})}} />
								</div>
								<div  className={'bodyItem'}>
									<p>联系方式：</p>
									<Input  placeholder="请输入联系方式" onChange={e=>{this.setState({contact:e.target.value})}}/>
									{/* <InputNumber placeholder="请输入联系方式" onChange={e=>{this.setState({contact:e.target.value})}}/> */}
								</div>
								{ 
									<div  className={'bodyItem'} /*style={{display:this.state.functionValue===1?'inline-block':'none'}}*/>
									<p><span className={'titleText'}>*</span>兼容系统：</p>
										<Select defaultValue={'Linux'} className={'select'}  onChange={this.handleChangeSys}>
											<Option value={'Linux'}>Linux</Option>
											<Option value={'Windows'}>Windows</Option>
											<Option value={'macOS'}>macOS</Option>
										</Select>
									</div>
								}
								<div  className={'bodyItem'} style={{width:'62%',height:'auto'}}>
									<p style={{textAlign:'right',width:'9.5%'}}>应用标签：</p>
									<Select
										// className={'selectmulti}
										mode="tags"
										size={size}
										placeholder="请选择应用标签"
										// defaultValue={['a10', 'c12']}
										onChange={this.handleChangeBq}
										style={{ width: '86%' }}
									>
										{children}
									</Select>
								</div>
								{/* 应用介绍 */}
								<div className={'bodyItemText'}>
									<p>应用介绍：</p>
									<textarea  style={{borderRadius:'4px'}}   onChange={e=>{this.setState({description:e.target.value})}}/>
								</div>
								{/* 应用特性 */}
								<div className={'bodyItemText'}>
									<p>应用特性：</p>
									<textarea  style={{borderRadius:'4px'}}  onChange={e=>{this.setState({feature:e.target.value})}}/>
								</div>
								{/* 图片介绍 */}
								<div className={'bodyPicIntro'}>
									<p><span className={'titleText'}>*</span>图片介绍：</p>
									<div className={'picIntro'}>
										<Upload {...imgProps}>
											{imgIntroList.length >=5 ? null : uploadButton}
										</Upload>
										<Modal visible={previewVisible} width={1100} footer={null} onCancel={this.handleCancel} bodyStyle={{width:1100,height:400,display:'flex',justifyContent:'center',alignItems:'center'}}>
											<img alt="example" style={{ maxWidth: '100%',textAlign:'center' }} src={previewImage} />
										</Modal>
									</div>
								</div>
							</div>
							{/* 安装文件 */}
							<div className={'headerTitle'}>
								<Divider dashed orientation={'left'}  style={{padding:0,margin: 0}}>安装文件</Divider>
							</div>
							{/* BS的时候   functionValue === 2 */}
							<div className={'baseBody'} style={{display:this.state.functionValue === 2?'flex':'none'}}>
								{/* 应用url */}
								<div  className={'bodyItem'}>
									<p>应用URL：</p><Input placeholder="请输入应用URL链接" onChange={e=>{this.setState({cmdLine:e.target.value})}} />
								</div>
								<div className={'bodyPicLogo'}>
									<p>应用图标：</p>
									<div className={'picLogo'}>
										<Upload {...imgLogoProps}>
											{imgLogo.length >=1&&imageUrl ? <img style={{maxWidth:'80px',height:'80px'}} src={imageUrl} alt="avatar" /> :  uploadButton}
										</Upload>
									</div>
								</div>
							</div>
							{/* CS的时候   functionValue === 1 */}
							<div className={'baseBody'} style={{display:this.state.functionValue===1?'flex':'none',justifyContent:'left'}}>
								<div  className={'bodyItem'} style={{display:this.state.functionValue===1?'inline-block':'none',height:'auto'}}>
									<p><span className={'titleText'}>*</span>安装文件：</p>
									<Upload {...propsAZ}>
										<Button>
											<Icon type="upload" /> 只能上传zip文件
										</Button>
									</Upload>
									{
										this.state.isSetupAZ?<Progress style={{flex:'1'}}  percent={this.state.SetupAZValue} />:''
									}
								</div>
								<div  className={'bodyItem'} style={{display:this.state.functionValue===1?'inline-block':'none'}}>
									<p>启动程序：</p>
									{/* <Input placeholder="请先上传安装文件" value={this.state.processes} disabled/> */}
									{
										processList.length>0?
										<Select  className={'select'} onChange={this.handleChangeProcess}  placeholder="请先上传安装文件">
											{processList}
										</Select>:<Input placeholder="请先上传安装文件" value={this.state.process}  disabled/>
									}
								</div>
								<div className={'CSpicLogo'}>
									<p><span className={'titleText'}>*</span>应用图标：</p>
									<div className={'picLogo'}>
										<Upload {...imgLogoProps}>
											{imgLogo.length >=1&&imageUrl ? <img style={{maxWidth:'80px',height:'80px'}} src={imageUrl} alt="avatar" /> :  uploadButton}
										</Upload>
									</div>
								</div>
							</div>
							{/* 审核人 */}
							<div className={'headerTitle'}>
								<Divider dashed orientation={'left'}  style={{padding:0,margin: 0}}>发布审批</Divider>
							</div>
							<div className={'baseBody'} >
								<div  className={'bodyItem'} >
									<p><span className={'titleText'}>*</span>审核人：</p>
									<Select  className={'select'} onChange={this.handleChangeApprover}  placeholder="请选择审核人">
										{childrenApprovers}
									</Select>
								</div>
							</div>
							{/* 保存按钮 */}
							<div className={'button'}>
								<Button >取消</Button>
								<Button type="primary" onClick={this.submitApproveData}>提交审核</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
