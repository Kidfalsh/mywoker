import React from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
const FormItem = Form.Item
class FormLogin extends React.Component {

  submitHandle = () => {
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.username}恭喜你，通过本次表单学习，当前密码为${userInfo.password}`)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginTop: 50 }}>
          <Form layout="horizontal" style={{ width: 300 }}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '用户名不能为空' },
                    { pattern: new RegExp('^\\w+$','g') , message: '用户名必须为英文字母或数字' }
                  ],
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"></Input>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '密码不能为空' },
                    { min: 6, max: 10, message: '长度不在范围内' }
                  ]
                })(
                  <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"></Input>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox >记住密码</Checkbox>
                )
              }
              <a  href="#admin" alt="" style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button onClick={this.submitHandle} type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin);
