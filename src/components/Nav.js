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
            sidebar: !this.state.sidebar,
            searchbar: false
        })
    }

    toggleSearch = () => {
        this.setState({
            searchbar: !this.state.searchbar,
            sidebar: false
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
                    // mobile search button
                    this.props.username ?
                    
                    this.state.searchbar ? <X onClick={ this.toggleSearch } className="hover mobile" /> : <Search onClick={ this.toggleSearch } className="hover mobile" />
                    :
                    null
                }

                {/* desktop searchbaar */}
                {
                    this.props.username ?

                    <div className="desktop desktop-search">
                        <input type="text" name="search" value={ this.state.search } onChange={ this.handleChange } />
                        <Search className="search-search" onClick={ this.search }/>
                    </div>
                    :
                    null
                }
                
                <h1 className="title">Game Tracker</h1>
              
                {/* desktop nav bar */}
                {
                    this.props.username ?
                    <div className="desktop">
                        <ul className="desktop-navbar">
                            <li><Link to="/home" className="desktop-link">Home</Link></li>
                            <li><Link to={`/profile/${this.props.username}`} className="desktop-link">Profile</Link></li>
                            <li><button className="logout" onClick={ this.logout }>Logout</button></li>
                        </ul>
                    </div>
                    :
                    null
                }

                {
                    // mobile menu
                    this.props.username ? 
                    
                    this.state.sidebar ? <X onClick={ this.toggleMenu } className="hover mobile" /> : <Menu onClick={ this.toggleMenu } className="hover mobile" />
                    :
                    null
                }
            </div>

            {
                // mobile search bar
                    this.state.searchbar ?
                    <div className="searchbar">
                        <input type="text" name="search" value={ this.state.search } onChange={ this.handleChange } />
                        <Search onClick={ this.search } className="search hover" />
                    </div>
                    :
                    null
            }

{
                // mobile sidebar
                this.state.sidebar ? 
                <div className="sidebar">
                    <div className="sidebar-links">
                        <Link to="/home" onClick={ this.toggleMenu } >Home</Link>
                        <Link to={`/profile/${this.props.username}`} onClick={ this.toggleMenu } >Profile</Link>
                    </div>
                    <button onClick={ this.logout } className="logout">Logout</button>
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