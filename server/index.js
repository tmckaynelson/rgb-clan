require('dotenv').config()

const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')

// controllers
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')
const gameCtrl = require('./controllers/gameController')
const friendCtrl = require('./controllers/friendController')
const profileCtrl = require('./controllers/profileController')

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env

// app instance
const app = express()

// TLMs
app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 86400000
    },
}))

// setup db connection
massive(CONNECTION_STRING)
    .then( db => {
        app.set('db', db)
        console.log('db connected')
    })
    .catch( error => {
        console.log(error)
    })

// auth endpoints
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/delete-account', authCtrl.deleteAccount)

// post endpoints
app.post('/api/posts', postCtrl.createPost)
app.get('/api/posts/search', postCtrl.searchPosts)
app.get('/api/posts/single/:id', postCtrl.getPost)
app.get('/api/posts', postCtrl.getPostsHome)
app.get('/api/posts/:id', postCtrl.getPostsProfile)
app.put('/api/posts/:id', postCtrl.editPost)
app.delete('/api/posts/:id', postCtrl.deletePost)

// game endpoints
app.post('/api/game', gameCtrl.createGame)
app.get('/api/game/:user_id', gameCtrl.getGames)
app.delete('/api/game/:user_id', gameCtrl.deleteGame)

// friend endpoints
app.post('/api/friend', friendCtrl.addFriend)
app.get('/api/friend/:user_id', friendCtrl.getFriends)
app.delete('/api/friend/:user_id', friendCtrl.deleteFriend)

// profile endpoints
app.put('/api/profile/edit/:id', profileCtrl.edit)

// set up app to listen
app.listen(SERVER_PORT, () => {
    console.log('server running')
})