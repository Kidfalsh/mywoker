import React from 'react'
import { Icon, Card, Form, Input, Radio, Select, Switch, DatePicker, TimePicker, InputNumber, Upload, Checkbox, Button } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends React.Component {
  state = {
    imgUrl:null,
    fileList:[]
  }
  getBase64 = (img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleSubmit=() => {
    let userInfo = this.props.form.getFieldsValue()
    console.log(userInfo)
    this.props.form.validateFields((err, values) => {
      
    })
  }
  handleChange = (info) => {
    this.setState({ fileList: info.fileList });
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imgUrl =>
        this.setState({
          imgUrl,
          loading: false,
        }),
      );
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 8
      }
    }
    const offsetLayout = {
      wrapperCol:{
        xs:24,
        sm:{
          span:12,
          offset:4
        }
      }
    }
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '用户名不能为空' }
                  ],
                })(
                  <Input prefix={<Icon type="user" />} placeholder="请输入用户名"></Input>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '密码不能为空' }
                  ]
                })(
                  <Input prefix={<Icon type="lock" />} placeholder="请输入密码"></Input>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                })(
                  <RadioGroup >
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18,
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '1',
                })(
                  <Select>
                    <Option value="1">咸鱼</Option>
                    <Option value="2">才子</Option>
                    <Option value="3">天才</Option>
                    <Option value="4">百度FE</Option>
                    <Option value="5">创业</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('hubit', {
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
            <FormItem label="是否结婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthDay', {
                  initialValue: moment('2020-02-12')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  ></DatePicker>
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
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
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('13:30:56', 'HH:mm:ss')
                })(
                  <TimePicker
                    showTime
                    // defaultValue={moment('13:30:56', 'HH:mm:ss')}
                  ></TimePicker>
                )
              }
            </FormItem>
            <FormItem label="上传头像" {...formItemLayout}>
              {
                getFieldDecorator('imgUrl')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    fileList={this.state.fileList}
                    action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                    onChange={this.handleChange}
                  >
                    {this.state.imgUrl?<img  style={{maxWidth:'100px'}} alt="" src={this.state.imgUrl}/>:<Icon type="plus"/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem label="上传头像" {...offsetLayout}>
              {
                getFieldDecorator('imgUrl')(
                  <Checkbox>我已经阅读过</Checkbox>  
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
        </Card>
      </div>
    )
  }
}
export default Form.create()(FormRegister);