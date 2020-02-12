import React from 'react'

export default class Info extends React.Component{
  render() {
    return(
        <div>
         这里是设置动态理由
         动态路由得只是{this.props.match.params.value}
        </div>
    );
  }
}