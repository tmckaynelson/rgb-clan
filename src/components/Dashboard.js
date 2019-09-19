import React, { Component } from 'react'
import Post from './Post'
import Nav from './Nav'

class Dashboard extends Component {
    render() {
        return (
            <>
            <Nav />
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            </>
        )
    }
}

export default Dashboard