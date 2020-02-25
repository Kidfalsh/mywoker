
import React from 'react';
import './index.less'
// import * as api from './api'
// import moment from 'moment';
import {  Input, Form,  Select, Button } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class zipUploadNew extends React.Component {
	state = {
		userInfo: {
			imputName: 'daiye'
		}
	}
	componentDidMount() { }
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
				sm: 10,
				md: 10,
				lg: 10,
			},
			className: 'formItem'
		}
		const offsetLayout = {
			wrapperCol: {
				xs: 24,
				sm: {
					span: 12,
					offset: 4
				},
			}
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
				lg: 3 ,
			},
			wrapperCol: {
				xs: 24,
				sm: 20,
				md: 20,
				lg: 20,
			},
			className: 'introformItem'
		}
		return (
			<div className={'myAddApplication'}>
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
									{ required: true, message: '应用名称不能为空' }
								]
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
					<FormItem label="开发者" {...formItemLayout}>
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
					<FormItem label="上传头像" {...offsetLayout}>
						{
							getFieldDecorator('imgUrl')(
								<Button onClick={this.handleSubmit}>提交</Button>
							)
						}
					</FormItem>
				</Form>
			</div>
		)
	}
}

export default Form.create()(zipUploadNew);
