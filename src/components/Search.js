import React, { Component } from 'react'
import { connect } from 'react-redux'

import Game from './Game'
import Nav from './Nav'

class Search extends Component {

    constructor() {
        super()
        
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        this.setState({
            games: this.props.search
        })
    }

    render() {

        const mappedGames = this.state.games.map( (game, index) => {
            return (<Game game={ {game_id: game }} key={ index } /> )
        })
        
        return (
            <>
                <Nav />
                <div>
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