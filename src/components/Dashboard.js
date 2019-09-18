import React, { Component } from 'react'
import Post from './Post'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        )
    }
}

export default Dashboard