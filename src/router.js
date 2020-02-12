import React from 'react'
import App from './App'
import Admin from './Admin';
import Login from './pages/login'
import Buttons from './pages/ui/buttons.js'
import Modals from './pages/ui/modals.js'
import Gallery from './pages/ui/gallery.js'
import FormLogin from './pages/form/login'
import Home from './pages/Home'
import NoMatch from './pages/nomatch'
import { HashRouter, Route, Switch } from 'react-router-dom'
export default class IRouter extends React.Component {

  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login} />
          <Route path='/admin' render={() =>
            <Admin>
              <Switch>
                <Route path='/admin/home' component={Home} />
                <Route path='/admin/ui/buttons' component={Buttons} />
                <Route path='/admin/ui/modals' component={Modals} />
                <Route path='/admin/ui/gallery' component={Gallery} />
                <Route path='/admin/form/login' component={FormLogin} />
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          } />
          <Route path='/order/details' component={Login} />
        </App>
      </HashRouter>
    )
  }
}