import React, { Component } from 'react'
import { Search, Menu, X } from 'react-feather'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { removeUser } from '../redux/reducer'

import './Nav.css'

class Nav extends Component {

    constructor() {
        super()

        this.state = {
            sidebar: false,
            searchbar: false
        }
    }

    toggleMenu = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    toggleSearch = () => {
        this.setState({
            searchbar: !this.state.searchbar
        })
    }

    logout = () => {
        console.log('hit logout')
        axios.delete('/auth/logout')
            .then( response => {
                this.setState({
                    sidebar: false,
                    searchbar: false
                })
                this.props.removeUser()
                this.props.history.push('/')
            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
            <div className="navbar">
                {
                    this.state.sidebar ? 
                    <div className="sidebar">
                        <Link to="/home" onClick={ this.toggleMenu } >Home</Link>
                        <Link to="/profile" onClick={ this.toggleMenu } >Profile</Link>
                        <button onClick={ this.logout }>Logout</button>
                    </div>
                    :
                    null
                }
                
                {
                    this.props.username ?
                    this.state.searchbar ? <X onClick={ this.toggleSearch } /> : <Search onClick={ this.toggleSearch } />
                    :
                    null
                }
                <h1 className="title">RGBclan</h1>
                {
                    this.props.username ? 
                    
                    this.state.sidebar ? <X onClick={ this.toggleMenu } /> : <Menu onClick={ this.toggleMenu } />
                    :
                    null
                }
            </div>
            {
                    this.state.searchbar ?
                    <form className="searchbar">
                        <input type="text" /><Search className="search" />
                    </form>
                    :
                    null
            }
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps, { removeUser })(Nav))