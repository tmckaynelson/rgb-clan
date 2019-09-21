import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import 'reset-css'

import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={["/", "/login"]} component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/home" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
        </Switch>
      </div>
    )
  }
}



export default App