import React from 'react'
import { Card, Button } from 'antd'
import './ui.less'

export default class Modals extends React.Component {
  state = {}
  render() {
    return (
      <div>
        <Card title="普通弹框" className="modals">
          <Button type="primary">open</Button>
          <Button type="primary">open</Button>
          <Button type="primary">open</Button>
          <Button type="primary">open</Button>
        </Card>
      </div>
    );
  }
}