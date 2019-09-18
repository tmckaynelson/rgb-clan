import React, { Component } from 'react'

class Profile extends Component {
    render() {
        return (
            <div>
                <div className="profile">
                    <img src="../images/no-profile-pic-icon-5.jpg" alt="profile pic"/>
                    <h1>username</h1>
                    <h2>first name + last name</h2>
                    <h2>num games</h2>
                </div>
                <div className="profile-nav">
                    <button>want to own/play</button>
                    <button>my games</button>
                    <button>reviews</button>
                </div>
                <div>
                    <p>mapped stuff</p>
                </div>
            </div>
        )
    }
}

export default Profile