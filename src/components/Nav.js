import React, { Component } from 'react'
import { Search, Menu, X } from 'react-feather'
import { Link } from 'react-router-dom'

import './Nav.css'

class Nav extends Component {

    constructor() {
        super()

        this.state = {
            sidebar: false
        }
    }

    toggleMenu = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render() {
        return (
            <div className="navbar">
                {
                    this.state.sidebar ? 
                        <div className="sidebar">
                            <Link to="/home" onClick={ this.toggleMenu } >Home</Link>
                            <Link to="/profile" onClick={ this.toggleMenu } >Profile</Link>
                            <Link ></Link>
                            <Link ></Link>
                            <Link ></Link>
                        </div>
                    :
                    null
                }
                <Search />
                <h1 className="title">RGBclan</h1>
                {
                    this.state.sidebar ? <X onClick={ this.toggleMenu } /> : <Menu onClick={ this.toggleMenu } />
                }
            </div>
        )
    }
}

export default Nav