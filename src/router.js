import React from 'react'
import App from './App'
import Admin from './Admin';
import Home from './pages/Home'
import SingleType from './pages/singleType'
import MyTool from './pages/myTool'
import MyApps from './pages/myApps'
import AppDetails from './pages/appDetails'
import ZipUploadNew from './pages/zipUploadNew/index'
import NoMatch from './pages/nomatch'
// import Bar from './pages/echarts/bar'
// import Line from './pages/echarts/line'
// import Rich from './pages/rich/index'
// import User from './pages/user/index'
// import Login from './pages/login'
// import Buttons from './pages/ui/buttons.js'
// import Modals from './pages/ui/modals.js'
// import Gallery from './pages/ui/gallery.js'
// import FormLogin from './pages/form/login'
// import FormRegister from './pages/form/register'
// 应用管理页面组件
import Application from 'pages/AppManager/AppManager'
import ApproveApps from 'pages/AppManager/ApproveManeger'
import CommentApps from 'pages/AppManager/CommentManager'
import AddApplication from 'pages/AppManager/AddApplication'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
export default class IRouter extends React.Component {

  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            {/* <Route path='/login' component={Login} />
            <Route path='/order/details' component={Login} /> */}
            <Route path='/myApps' component={MyApps} />
            <Route path='/myTool' component={MyTool} />
            <Route path='/appDetails' component={AppDetails} />
            {/* 应用管理路由 */}
            <Route path='/ManagerApp/index' component={Application} />
            <Route path='/ManagerApp/approve' component={ApproveApps} />
            <Route path='/ManagerApp/comment' component={CommentApps} />
            {/* 主页路由 */}
            <Route path='/' render={() =>
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/singleType' component={SingleType} />
                  <Route path='/NewZipUpload' component={ZipUploadNew} />
                  <Route path='/addApplication' component={AddApplication} />
                  <Redirect to="/home"></Redirect>
                  <Route component={NoMatch} />
                  {/* <Route path='/ui/buttons' component={Buttons} />
                  <Route path='/ui/modals' component={Modals} />
                  <Route path='/ui/gallery' component={Gallery} />
                  <Route path='/form/login' component={FormLogin} />
                  <Route path='/form/register' component={FormRegister} />
                  <Route path='/charts/bar' component={Bar} />
                  <Route path='/charts/line' component={Line} />
                  <Route path='/rich' component={Rich} />
                  <Route path='/permission' component={User} /> */}
                  {/* <Redirect to="/home"></Redirect> */}
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}