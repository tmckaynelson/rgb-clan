import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Search from './components/Search'

import './reset.css'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path={["/", "/login"]} component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/home" component={ Dashboard } />
          <Route path="/profile/:username" component={ Profile } />
          <Route path="/search" component={ Search } />
        </Switch>
      </div>
    )
  }
}



export default App