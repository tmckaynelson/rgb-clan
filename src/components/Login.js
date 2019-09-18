import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Login.css'

class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = () => {

        axios.post('/auth/login', this.state)
            .then( response => {
                console.log(response)
                this.props.addUser(response.data)
            })
            .catch( error => {

            })
    }

    render() {
        console.log(this.props)
        return (
            <div className="login">
                <label>Username</label>
                <input type="text" onChange={ this.handleChange } name="username" value={ this.state.username } />
                <label>Password</label>
                <input type="password" onChange={ this.handleChange } name="password" value={ this.state.password } />
                <button onClick={ this.login }>Login</button>
                <Link to="/register">Sign Up</Link>
            </div>
        )
    }
}

export default Login