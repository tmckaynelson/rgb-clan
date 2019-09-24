import React, { Component } from 'react'
import { Search, Menu, X } from 'react-feather'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { removeUser, updateSearch } from '../redux/reducer'

import './Nav.css'

class Nav extends Component {

    constructor() {
        super()

        this.state = {
            sidebar: false,
            searchbar: false,
            search: ''
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

    search = (event) => {

        event.preventDefault()
        
        axios({
            url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '176d09a31b52b2b83700b8837e12f39b'
            },
            data: `fields id; search "${this.state.search}"; limit 50;`
          })
            .then(response => {
                let data = response.data.map( game => game.id)
                this.props.updateSearch(data)
                this.props.history.push('/search')
            })
            .catch(err => {
                console.error(err);
            });

        this.setState({
            search: '',
            searchbar: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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
                        <Link to={`/profile/${this.props.username}`} onClick={ this.toggleMenu } >Profile</Link>
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
                <h1 className="title">Game Tracker</h1>
                {
                    this.props.username ? 
                    
                    this.state.sidebar ? <X onClick={ this.toggleMenu } /> : <Menu onClick={ this.toggleMenu } />
                    :
                    null
                }
            </div>
            {
                    this.state.searchbar ?
                    <div className="searchbar">
                        <input type="text" name="search" value={ this.state.search } onChange={ this.handleChange } />
                        <Search onClick={ this.search } className="search" />
                    </div>
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

export default withRouter(connect(mapStateToProps, { removeUser, updateSearch })(Nav))