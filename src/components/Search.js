import React, { Component } from 'react'
import { connect } from 'react-redux'

import Game from './Game'
import Nav from './Nav'

import './Search.css'

class Search extends Component {

    constructor() {
        super()
        
        this.state = {
            games: []
        }
    }

    render() {

        const mappedGames = this.props.search.map( (game, index) => {
            return (<Game game={ {game_id: game }} key={ index } /> )
        }) 
        console.log(mappedGames)

        return (
            <>
                <Nav />
                <div className="search-page">
                    <h1>Search Results</h1>
                    { mappedGames }
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Search)