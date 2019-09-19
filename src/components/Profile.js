import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Game from './Game'

class Profile extends Component {

    constructor() {
        super()
        
        this.state = {
            games: [1942, 1, 13]
        }
    }

    render() {

        let mappedGames = this.state.games.map( (element, index) => {
            return (
                <Game gameID={ element } key={ index } />
            )
        })

        return (
            <>
                <Nav />
                <div>
                    <div className="profile">
                        <img src="/home/mckay/Desktop/devmtn/projects/rgb-clan/src/images/no-profile-pic-icon-5.jpg" alt="profile pic"/>
                        <h1>{ this.props.username }</h1>
                        <h2>{ this.props.first_name } { this.props.last_name }</h2>
                    </div>
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

export default connect(mapStateToProps)(Profile)