import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Game from './Game'
import Nav from './Nav'

import './Dashboard.css'

class Dashboard extends Component {

    constructor() {
        super()

        this.state = {
            games: []
        }
    }

    componentDidMount = () => {

        axios.get(`/api/game/${this.props.user_id}`)
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

        let mappedGames = this.state.games.map( (game, index) => {
            return ( <Game game={ {game_id: game} } key={ index } />)
        })

        return (
            <>
            <Nav />
            <div className="dashboard">
                { mappedGames }
            </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Dashboard)