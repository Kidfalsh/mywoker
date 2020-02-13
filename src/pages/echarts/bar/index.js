import React from 'react'
import {Card} from 'antd'
import './index.less'
import echartTheme from './../echartTheme'
//import 'echarts/lib/echarts'
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'      
import ReactEcharts from 'echarts-for-react'
export default class Bar extends React.Component{
  
  state = {
    count: 0
  }
  getOption = () => {
    let option = {
      title: {
        text:"用户"
      },
      tooltip: {
        trigger:'axis'
      },
      xAxis: {
        data:['周一','周二','周三','周四','周五','周六']
      },
      yAxis: {
        type :'value'
      },
      series:[
        {
          name:'订单量',
          type:'bar',
          data:[1000,2000,3000,4000,1500,2000]
        }
      ]
    }
    return option
  }
  getOption2 = () => {
    let option = {
      title: {
        text:"用户"
      },
      legend:{
        date:['ofo','moby','ssd']
      },
      tooltip: {
        trigger:'axis'
      },
      xAxis: {
        data:['周一','周二','周三','周四','周五','周六']
      },
      yAxis: {
        type :'value'
      },
      series:[
        {
          name:'ofo',
          type:'bar',
          data:[1000,2000,3000,4000,1500,800]
        },
        {
          name:'moby',
          type:'bar',
          data:[5500,2000,3000,4000,1524,2000]
        },
        {
          name:'lan',
          type:'bar',
          data:[1000,2000,3000,4000,1500,2000]
        }
      ]
    }
    return option
  }
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme)
  }
  render(){
    return <div className='content'>
      <Card title="柱状图1">
        <ReactEcharts
          option={this.getOption()}
          theme="Imooc"
        ></ReactEcharts>
      </Card> 
      <Card title="柱状图2" style={{marginTop:'15px'}}>
      <ReactEcharts
          option={this.getOption2()}
          theme="Imooc"
        ></ReactEcharts>
      </Card>  
    </div>
  }
}