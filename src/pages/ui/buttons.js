import React from 'react'
import { Card, Button, Icon } from 'antd'
import './ui.less'

const ButtonGroup = Button.Group;
export default class Buttons extends React.Component {
  state = {
    loading: true
  }
  closeLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }
  render() {
    return (
      <div>
        <Card title="普通按钮">
          <Button type="primary">按钮</Button>
          <Button >按钮</Button>
          <Button type="dashed">按钮</Button>
          <Button type="danger">按钮</Button>
          <Button disabled>按钮</Button>
        </Card>
        <Card title="图形按钮">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search">删除</Button>
          <Button icon="search">搜索</Button>
          <Button icon="download">下载</Button>
        </Card>
        <Card title="loading按钮">
          <Button type="primary" loading={this.state.loading} >创建</Button>
          <Button loading={this.state.loading}>编辑</Button>
          <Button type="primary" onClick={this.closeLoading}>close </Button>
        </Card>
        <Card title="按钮组">
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button>OK</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button disabled>L</Button>
            <Button disabled>M</Button>
            <Button disabled>R</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>L</Button>
            <Button>M</Button>
            <Button>R</Button>
          </ButtonGroup>

          <h4>With Icon</h4>
          <ButtonGroup>
            <Button type="primary">
              <Icon type="left" />
              Go back
      </Button>
            <Button type="primary">
              Go forward
        <Icon type="right" />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" icon="cloud" />
            <Button type="primary" icon="cloud-download" />
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" size="small" icon="cloud" />
            <Button type="primary" size="small" icon="cloud-download" />
          </ButtonGroup>
        </Card>
      </div>
    );
  }
}