const axios = require('axios')
const createPost = (req, res) => {
    /*
    TODO test
    */
    console.log('hit create post')

    const { user_id, type, title, content, game_id, location, review_id } = req.body
    const db = req.app.get('db')

    const newPost = db.create_post([user_id, type, title, content, game_id, location, review_id])

    res.status(200).send(newPost)
}

const getPostsHome = async (req, res) => {
/*
    TODO test
    */
       console.log('hit get posts home')

    const db = req.app.get('db')
    const id = req.session.user.id

    const posts = await db.get_posts_exclude([id])

    res.status(200).send(posts)
}


const getPostsProfile = async (req, res) => {
    /*
    TODO test
    */
    console.log('hit get posts profile')

    const db = req.app.get('db')
    const { id } = req.params

    const posts = await db.get_posts_user([id])

    res.status(200).send(posts)
}

const getPost = (req, res) => {
    console.log('hit get post')

    axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': '176d09a31b52b2b83700b8837e12f39b'
        },
        data: 'fields *; where id = 1942;'
      })
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
            console.error(err);
        });

    
}

const searchPosts = (req, res) => {
    console.log('hit search posts')

    res.status(200).send()
}

const editPost = (req, res) => {
    console.log('hit edit post')

    res.status(200).send()
}

const deletePost = (req, res) => {
    console.log('hit delete post')

    res.status(200).send()
}

module.exports = {
    createPost,
    getPostsHome,
    getPostsProfile,
    getPost,
    searchPosts,
    editPost,
    deletePost
}