import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { addUser } from '../redux/reducer'

import './Register.css'
import Nav from './Nav'

class Register extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = (event) => {

        event.preventDefault()

        axios.post('/auth/register', this.state)
            .then( response => {
                this.setState({
                    username: '',
                    password: '',
                    email: '',
                    first_name: '',
                    last_name: '',
                })
                this.props.addUser(response.data)
                this.props.history.push('/home')
            })
            .catch( error => {
                console.log(error)
            })
    }

    cancel = () => {

        this.setState({
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
        })

        this.props.history.push('/')
    }

    render() {
        return (
            <>
            <Nav />
            <div className="register">
                <form className="register">
                    <label>Username</label>
                    <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } />
                    <label>password</label>
                    <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } />
                    <label>Email</label>
                    <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange } />
                    <label>First Name</label>
                    <input type="text" name="first_name" value={ this.state.first_name } onChange={ this.handleChange } />
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={ this.state.last_name } onChange={ this.handleChange } />
                    <button onClick={ this.register }>Register</button>
                </form>
                <button onClick={ this.cancel }>Cancel</button>
            </div>
            </>
        )
    }
}

export default connect(null, { addUser })(Register)