import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

class Login extends Component {
    render() {
        return (
            <div className="login">
                <label>Username</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
                <button>Login</button>
                <Link to="/register">Sign Up</Link>
            </div>
        )
    }
}

export default Login