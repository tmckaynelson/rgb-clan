require('dotenv').config()

const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')

// controllers
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

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
app.put('/auth/edit-account', authCtrl.edit)
app.delete('/auth/delete-account', authCtrl.deleteAccount)

// post endpoints
app.post('/api/posts', postCtrl.createPost)
app.get('/api/posts', postCtrl.getPosts)
app.get('/api/posts/:id', postCtrl.getPost)
app.get()

// set up app to listen
app.listen(SERVER_PORT, () => {
    console.log('server running')
})