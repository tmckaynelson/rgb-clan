import React, { Component } from 'react'
import axios from 'axios'

import './Game.css'

export default class Game extends Component {

    constructor() {
        super()

        this.state = {
            game: {},
            proxyUrl: 'https://cors-anywhere.herokuapp.com/'
        }
    }

    getGame = (id) => {
        axios({
            url: this.state.proxyUrl + "https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '176d09a31b52b2b83700b8837e12f39b'
            },
            data: "fields name, rating, cover; where id = " + id +";"
          })
            .then(response => {
                console.log(response.data);
                this.setState({
                    game: response.data[0]
                })
                this.getCover()
                this.getDeveloper()
            })
            .catch(err => {
                console.error(err);
            });
        
    }

    getCover = () => {
        axios({
            url: this.state.proxyUrl + "https://api-v3.igdb.com/covers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '176d09a31b52b2b83700b8837e12f39b'
            },
            data: "fields url; where id = " + this.state.game.cover +";"
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    game: {...this.state.game, url: response.data[0].url}
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    getDeveloper = () => {
        axios({
            url: this.state.proxyUrl + "https://api-v3.igdb.com/covers",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': '176d09a31b52b2b83700b8837e12f39b'
            },
            data: "fields url; where id = " + this.state.game.cover +";"
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    game: {...this.state.game, url: response.data[0].url}
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentWillMount = () => {
        this.getGame(this.props.gameID)
    }

    render() {
        console.log(this.state)
        return (
            <div className="game">
                <img src={ this.state.game.url } />
                <div className="info">
                    <p>{ this.state.game.name }</p>
                    <p> Rating: { Number.parseFloat(this.state.game.rating).toFixed(2) }</p>
                    <button>Add to list</button>
                </div>
            </div>
        )
    }
}
