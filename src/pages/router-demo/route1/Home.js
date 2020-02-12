import React from 'react'
import Main from './Main'
import About from './About'
import Topic from './Topic'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'

export default class Home extends React.Component{
  render() {
    return(
      <HashRouter>
        <div>
        <ul>
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topic">topic</Link>
            </li>
          </ul>
          <Switch>
            <Route exact={true} path='/main' component={Main}/>
            <Route path='/about' component={About}/>
            <Route path='/topic' component={Topic}/>
          </Switch>
          
        </div>
      </HashRouter>  
    );
  }
}