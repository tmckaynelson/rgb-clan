import React, { Component } from 'react'
import axios from 'axios'

export default class Game extends Component {

    constructor() {
        super()

        this.state = {
            game: {}
        }
    }

    getGame = (id) => {
        console.log(id)
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        axios({
            url: proxyUrl + "https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '176d09a31b52b2b83700b8837e12f39b'
            },
            data: "fields name, rating; where id = " + id +";"
          })
            .then(response => {
                console.log(response.data);
                this.setState({
                    game: response.data[0]
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentWillMount = () => {
        this.getGame(this.props.match.params.id)
    }

    render() {
        console.log(this.state)
        let game = this.setState.game
        return (
            <div>
                <p>{this.state.game.name}</p>
                <p>{this.state.game.rating}</p>
            </div>
        )
    }
}
