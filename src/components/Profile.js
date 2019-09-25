import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Edit2 } from 'react-feather'
import axios from 'axios'
import { updateUser } from '../redux/reducer'

import Nav from './Nav'
import Game from './Game'

import './Profile.css'

class Profile extends Component {

    constructor() {
        super()
            
        this.state = {
            games: [],
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            profile_pic: '',
            edit: false
        }
    }

    componentDidMount = () => {

        axios.get(`/api/profile/${this.props.match.params.username}`)
        .then( response => {
            
            const { username, first_name, last_name, email, profile_pic, user_id } = response.data
            
            this.setState({
                games: [],
                edit: false,
                username,
                first_name, 
                last_name,
                email,
                profile_pic,
                user_id
            })
            this.setGameList('owned')
        })
        .catch( error => {
            console.log(error)
            
            this.setState({
                username: '',
                first_name: '',
                last_name: '',
                profile_pic: '',
                email: ''
            })
        })
        
    }

    toggleEdit = (event) => {

        this.setState({
            edit: !this.state.edit
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    edit = (event) => {

        event.preventDefault()

        axios.put(`/api/profile/edit/${this.props.user_id}`, this.state)
            .then( response => {
                this.props.updateUser(response)
                this.toggleEdit()
            })
            .catch( error => {
                console.log(error)
            })
    }

    setGameList = (list) => {

        axios.get(`/api/game/${this.state.user_id}?list=${list}`)
            .then( response => {
                this.setState({
                    games: response.data
                })
            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {

        let mappedGames = this.state.games.map( (element, index) => {
            return (
                <Game game={ element } key={ index } />
            )
        })

        return (
            <>
                <Nav />
                <div className="profile-container">
                    {
                        this.state.edit ?
                        // edit profile
                        <form className="profile">
                            <img src={ this.props.profile_pic } alt="profile pic"/>
                            <input type="text" name="profile_pic" value={ this.state.profile_pic } onChange={ this.handleChange } />
                            <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } />
                            <input type="text" name="first_name" value={ this.state.first_name } onChange={ this.handleChange } />
                            <input type="text" name="last_name" value={ this.state.last_name } onChange={ this.handleChange } />
                            <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange } />
                            <button onClick={ this.edit }>Save changes</button>
                            <button onClick={ this.toggleEdit }>Cancel</button>
                        </form>
                        :
                        // non edit profile
                        <div className="profile">
                            <div>
                                <img src={ this.state.profile_pic } alt="profile pic"/>
                                {
                                    this.state.user_id === this.props.user_id ? <Edit2 className="edit" onClick={ this.toggleEdit } /> : null
                                }
                            </div>
                            <div className="profile-container">
                                    <h1>{ this.state.username }</h1>
                                    <h2>{ this.state.first_name } { this.state.last_name }</h2>
                                    <h2>{ this.state.email }</h2>
                            </div>
                        </div>
                    }
                    
                    <div className="profile-nav">
                        <button
                            className={"profile-button"} 
                            onClick={ () => this.setGameList('played')}
                        >
                            Played
                        </button>
                        <div className="verticle-separator"></div>
                        <button className="profile-button" onClick={ () => this.setGameList('want_to_own')}>Want to own</button>
                        <div className="verticle-separator"></div>
                        <button className="profile-button" onClick={ () => this.setGameList('want_to_play')}>Want to play</button>
                        <div className="verticle-separator"></div>
                        <button className="profile-button" onClick={ () => this.setGameList('owned')}>Owned</button>
                    </div>
                    <div className="game-container">
                        { mappedGames }
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { updateUser })(Profile)