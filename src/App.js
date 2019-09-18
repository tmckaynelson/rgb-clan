import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import 'reset-css'

import { addUser } from './redux/reducer'

import Nav from './components/Nav'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Game from './components/Game'

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/login"]} component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/home" component={ Dashboard } />
          <Route path="/profile" component={ Profile } />
          <Route path="/game/:id" component={ Game } />
        </Switch>
      </div>
    )
  }
}



export default App