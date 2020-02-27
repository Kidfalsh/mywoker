
import React from 'react';
import './index.less'
import * as api from './api'
// import moment from 'moment';
import { Input, Form, Select, Button, Upload, Icon, Progress, message } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class addApplication extends React.Component {
  state = {
    userInfo: {
      imputName: 'daiye'
    },
    isSetupYL: false,
    SetupYLValue: 0,
    setupYLInfo: {},
    fileListYL: [],
  }
  /** 统一封装弹框 */
  openMessage = (type, words) => {
    message.config({
      top: '50%',
      duration: 2,
      maxCount: 1,
    });
    if (type === 'error') {
      message.open({
        content: <div style={{ fontSize: 18 }}><Icon type="close-circle" theme="twoTone" twoToneColor="red" style={{ fontSize: 18 }} />{words}</div>,
        duration: 2
      })
    } else if (type === 'success') {
      message.open({
        content: <div style={{ fontSize: 18 }}><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 18 }} />{words}</div>,
        duration: 2
      })
    } else if (type === 'warning') {
      message.open({
        content: <div style={{ fontSize: 18 }}><Icon type="exclamation-circle" theme="twoTone" twoToneColor="#e5d70b" style={{ fontSize: 18 }} />{words}</div>,
        duration: 2
      })
    }
  }
  /** 提交数据 */
  submit = () => {
    let info = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      console.log(err)
      if (!err) {
        message.success(`恭喜你，通过本次表单验证`)
      }
    })
    let params = {
      "name": info.appName,
      "appType": "1",
      "appTypeName": "数据类",
      "contact": "15196759114",
      "type": "C/S",
      "process": "startApp.exe",
      "cmdLine": "cmdline.exe",
      "appClass": "工具类",
      "version": "1.0.0",
      "isInstall": "0",
      "filesize": "12332112",
      "downloadCount": 0,
      "description": "这是一个描述测试应用",
      "path": "app/test/exeName",
      "icon": "42147198142241214",
      "developer": "syh",
      "uploadUserid": "wddwdwwdwd",
      "uploadUser": "admin",
      "processes": "dsds,sdffsd,sdfdsf",
      "app_cpb": "windows",
      "appLanguage": "java",
      "appMark": "1002,12,323,3332",
      "briefImages": "asddasdsa,213ws,swqdqwszd,adsda22",
      "approvalStatus": 0,
      "feature": "sssadsdads应用特征",
      "versionId": "adsasd212",
      "appUpdateId": "qwwqe1231",
      "zipName": "dwwdq12312",
      "dependencyFileId": this.state.setupYLInfo
    }
    api.buildApps(params).then(res=>{
      if(res.code==='200'){
        message.success("添加成功！")
      }else{
        message.error(res.msg)
      }
    })
  }
  componentDidMount() {}
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 8,
        md: 8,
        lg: 8,
      },
      wrapperCol: {
        xs: 24,
        sm: 16,
        md: 16,
        lg: 16,
      },
      className: 'formItem'
    }
    const appMarksLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
        md: 4,
        lg: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 17,
        md: 17,
        lg: 17,
      },
      className: 'appMarksformItem'
    }
    /**应用介绍、应用特性 */
    const introLayout = {
      labelCol: {
        xs: 24,
        sm: 3,
        md: 3,
        lg: 3,
      },
      wrapperCol: {
        xs: 24,
        sm: 21,
        md: 21,
        lg: 21,
      },
      className: 'introformItem'
    }
    /**依赖包布局 */
    const depLayout = {
      labelCol: {
        xs: 24,
        sm: 8,
        md: 8,
        lg: 8,
      },
      wrapperCol: {
        xs: 24,
        sm: 10,
        md: 10,
        lg: 10,
      },
      className: 'depFormItem'
    }
    /**保存按钮布局 */
    const submitLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 4,
          offset: 10
        },
        md: {
          span: 4,
          offset: 10
        },
        lg: {
          span: 4,
          offset: 10
        },
      },
      className: 'submitFormItem'
    }
    /** 
		 * 安装文件的上传
		 * C/S安装依赖包的运行 远程的应用
		 */
    const propsYL = {
      action: '/client-manager/api/apphall/resource/dependency/file',  // 默认会上传
      name: 'depFile',
      accept: ".zip",
      headers: {
        'auth': localStorage.getItem('token'),
      },
      onRemove: (file) => {
        this.setState(({ fileListYL }) => {
          const index = fileListYL.indexOf(file);
          const newFileList = fileListYL.slice();
          newFileList.splice(index, 1);
          return {
            fileListYL: newFileList,
          };
        });
        /** 移除了安装包信息需要重新吧启动程序置空 */
        this.setState({
          isSetupYL: false,
        })
      },
      onChange: (file) => {
        /** file 对象里面有response 对象可以返服务器的返回值 */
        if (file.file.percent) {
          this.setState({
            isSetupYL: true,
            SetupYLValue: parseInt(Number(file.file.percent))
          })
          if (file.file.response && file.file.response.code === '200') {
            this.openMessage('success', '上传服务器成功')
            /** 显示文件 进度条 */
            this.setState({
              isSetupYL: false,
              SetupYLValue: file.file.percent,
              setupYLInfo: file.file.response.data,
            })
          } else if (file.file.status && file.file.status === 'error') {
            this.openMessage('error', '上传服务器失败！')
            /** 显示文件 进度条 */
            this.setState({
              isSetupYL: false,
              SetupYLValue: 0,
              setupYLInfo: {},
              fileListYL: [], // 上传不成功清掉
            })
          }
        }
      },
      beforeUpload: (file) => {
        if (this.state.uploadTimes === 1) {
          this.openMessage('warning', '当前只能上传一个zip文件。若需要提交，请删除当前已经上传的zip！')
          this.setState({
            isSetupAZ: false,
            SetupAZValue: 0,
          })
          return false
        }
        this.setState(({ fileListYL }) => ({
          fileListYL: [...fileListYL, file],
        }));
        const { fileListYL } = this.state;
        const formData = new FormData();
        fileListYL.forEach((file) => {
          formData.append('files[]', file);
        });
      },
      fileList: this.state.fileListYL,
    };
    return (
      <div className={'AddApplication-wrap'}>
        <Form layout="inline" className={'Form'}>
          <FormItem label="应用类型" {...formItemLayout}>
            {
              getFieldDecorator('appType', {
                initialValue: '1',
                rules: [
                  { required: true, message: '应用类型不能为空' }
                ],
              })(
                <Select>
                  <Option value="1">BS</Option>
                  <Option value="2">CS</Option>
                  <Option value="3">远程</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="应用名称" {...formItemLayout}>
            {
              getFieldDecorator('appName', {
                initialValue: '',
                rules: [
                  { required: true, message: '应用名称不能为空' },
                  { min: 6, max: 10, message: '长度不在范围内' }
                ],
                help: '请输入长度为6-11的名字'
              })(
                <Input placeholder="请输入应用名称"></Input>
              )
            }
          </FormItem>
          <FormItem label="应用分类" {...formItemLayout}>
            {
              getFieldDecorator('sex', {
                initialValue: '1',
                rules: [
                  { required: true, message: '应用分类必选' }
                ]
              })(
                <Select>
                  <Option value="1">应用类</Option>
                  <Option value="2">工具类</Option>
                  <Option value="3">数据类</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="开发者"   {...formItemLayout}>
            {
              getFieldDecorator('appDeveloper', {
                initialValue: '',
              })(
                <Input placeholder="请输入开发者"></Input>
              )
            }
          </FormItem>
          <FormItem label="开发语言" {...formItemLayout}>
            {
              getFieldDecorator('Language', {
                initialValue: '',
              })(
                <Input placeholder="请输入开发语言"></Input>
              )
            }
          </FormItem>
          <FormItem label="联系方式" {...formItemLayout}>
            {
              getFieldDecorator('Content', {
                initialValue: '',
              })(
                <Input placeholder="请输入联系方式"></Input>
              )
            }
          </FormItem>
          <FormItem label="兼容系统" {...formItemLayout}>
            {
              getFieldDecorator('Apppcb', {
                initialValue: '1',
                rules: [
                  { required: true, message: '兼容系统必选' }
                ]
              })(
                <Select>
                  <Option value="1">Linux</Option>
                  <Option value="2">Windows</Option>
                  <Option value="3">macOS</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="应用标签" {...appMarksLayout}>
            {
              getFieldDecorator('appMarks', {
                initialValue: ['1', '2'],
              })(
                <Select mode="multiple">
                  <Option value="1">听英语</Option>
                  <Option value="2">游泳</Option>
                  <Option value="3">篮球</Option>
                  <Option value="4">桌球</Option>
                  <Option value="5">麦霸</Option>
                  <Option value="5">爬山</Option>
                  <Option value="5">跑步</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="应用介绍" {...introLayout}>
            {
              getFieldDecorator('address', {
                initialValue: '成都市天府新区。。。'
              })(
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 6 }}
                ></TextArea>
              )
            }
          </FormItem>
          <FormItem label="应用特性" {...introLayout}>
            {
              getFieldDecorator('address', {
                initialValue: '成都市天府新区。。。'
              })(
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 6 }}
                ></TextArea>
              )
            }
          </FormItem>
          <FormItem label="依赖包上传" {...depLayout}>
            {
              getFieldDecorator('imgUrl')(
                <Upload {...propsYL}>
                  <Button>
                    <Icon type="upload" /> 只能上传zip文件
										</Button>
                  {
                    this.state.isSetupYL ? <Progress style={{ flex: '1' }} percent={this.state.SetupYLValue} /> : ''
                  }
                </Upload>
              )
            }
          </FormItem>
          <FormItem   {...submitLayout}>
            <Button type='default' className={'submitButton'}>取消</Button>
            <Button onClick={this.submit} type='primary' className={'submitButton'}>保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(addApplication);
