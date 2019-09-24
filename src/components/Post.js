import React from 'react'

export default function Post(props) {
    console.log(props)
    return (
        <div>
            <h1>{ props.post.title }</h1>
        </div>
    )
}
