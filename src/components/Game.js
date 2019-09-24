import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import './Game.css'

class Game extends Component {

    constructor() {
        super()

        this.state = {
            game: {},
            proxyUrl: 'https://cors-anywhere.herokuapp.com/',
            addList: false
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
                this.setState({
                    game: response.data[0]
                })
                this.getCover()
            })
            .catch(err => {
                console.error(err);
            });
        
    }

    getCover = () => {

        if(this.state.game.cover === undefined) {
            this.setState({
                url: "https://uwosh.edu/facilities/wp-content/uploads/sites/105/2018/09/no-photo.png"
            })
        }
        else {

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
                this.setState({
                    game: {...this.state.game, url: response.data[0].url}
                })
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    componentWillMount = () => {
        this.getGame(this.props.game.game_id)
    }

    listOptions = () => {

        this.setState({
            addList: !this.state.addList
        })
    }

    addToList = (event) => {

        let location = event.target.name

        const body = {
            location,
            user_id: this.props.user_id,
            game_id: this.props.game.id
        }
        
        axios.post('/api/game', body)
            .then( response => {

                this.createPost(location)
                this.setState({
                    addList: false
                })
            })
            .catch( error => {
                console.log(error)
            })
    }

    createPost = (location) => {

        let title

        switch(location) {
            case 'want_to_own':
                title = `${this.props.username} added ${this.state.game.name} to Want to own`
                break
            case 'want_to_play':
                title = `${this.props.username} added ${this.state.game.name} to Want to play`
                break
            case 'played':
                title = `${this.props.username} added ${this.state.game.name} to Played`
                break
            case 'owned':
                title = `${this.props.username} added ${this.state.game.name} to Owned`
                break
            default:
                return
        }

        const body = {
            location,
            title,
            game_id: this.props.game.id,
            type: 'add_game',
            user_id: this.props.user_id,
            content: null,
        }

        axios.post('/api/posts', body)
            .then( response => {

            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="game">
                <img src={ this.state.game.url } alt={this.state.game.name} />
                <div className="info">
                    <p>{ this.state.game.name }</p>
                    {
                        this.state.game.rating ?
                        <p> Rating: { Number.parseFloat(this.state.game.rating).toFixed(2) }</p>
                        :
                        null
                    }
                    {
                        this.state.addList ? 
                        <button onClick={ this.listOptions }>Cancel</button>
                        :
                        <button onClick={ this.listOptions }>Add to list</button>
                    }
                </div>
                {
                    this.state.addList ?
                    <div>
                        <button name="want_to_play" onClick={ this.addToList } >Want to play</button>
                        <button name="want_to_own" onClick={ this.addToList } >Want to own</button>
                        <button name="played" onClick={ this.addToList } >Played</button>
                        <button name="owned" onClick={ this.addToList } >Owned</button>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Game)