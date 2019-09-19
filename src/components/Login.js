import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser } from '../redux/reducer'
import axios from 'axios'

import './Login.css'
import Nav from './Nav'

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

    login = (event) => {

        event.preventDefault()

        axios.post('/auth/login', this.state)
            .then( response => {
                this.setState({
                    username: '',
                    password: ''
                })
                this.props.addUser(response.data)
                this.props.history.push('/home')
            })
            .catch( error => {
                console.log(error.errorMessage)
            })
    }

    render() {
        return (
            <>
            <Nav />
            <div>
                <form className="login">
                    <label>Username</label>
                    <input type="text" onChange={ this.handleChange } name="username" value={ this.state.username } />
                    <label>Password</label>
                    <input type="password" onChange={ this.handleChange } name="password" value={ this.state.password } />
                    <button onClick={ this.login }>Login</button>
                    <Link to="/register">Sign Up</Link>
                </form>
            </div>
            </>
        )
    }
}

export default connect(null, { addUser })(Login)