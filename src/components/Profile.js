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
            games: [1942, 1, 13],
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            profile_pic: '',
            edit: false
        }
    }

    componentDidMount = () => {
        this.setState({
            username: this.props.username,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            profile_pic: this.props.profile_pic,
            email: this.props.email,
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

    render() {
        console.log(this.state)
        console.log(this.props)

        let mappedGames = this.state.games.map( (element, index) => {
            return (
                <Game gameID={ element } key={ index } />
            )
        })

        return (
            <>
                <Nav />
                <div>
                    {
                        this.state.edit ?
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
                        <div className="profile">
                            <img src={ this.props.profile_pic } alt="profile pic"/>
                            <Edit2 className="edit" onClick={ this.toggleEdit } />
                            <h1>{ this.state.username }</h1>
                            <h2>{ this.state.first_name } { this.state.last_name }</h2>
                            <h2>{ this.state.email }</h2>
                        </div>
                    }
                    
                    <div className="profile-nav">
                        <button>want to own</button>
                        <button>want to play</button>
                        <button>played</button>
                        <button>owned</button>
                    </div>
                    <div>
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