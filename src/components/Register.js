import React, { Component } from 'react'

import './Register.css'

class Register extends Component {
    render() {
        return (
            <div className="register">
                <label>Username</label>
                <input type="text" />
                <label>password</label>
                <input type="password" />
                <label>Email</label>
                <input type="text" />
                <label>First Name</label>
                <input type="text" />
                <label>Last Name</label>
                <input type="text" />
                <button>Register</button>
            </div>
        )
    }
}

export default Register 