const axios = require('axios')
const createPost = (req, res) => {
    /*
    TODO test
    */

    const { user_id, type, title, content, game_id, location, review_id } = req.body
    const db = req.app.get('db')

    const newPost = db.create_post([user_id, type, title, content, game_id, location, review_id])

    res.status(200).send(newPost)
}

const getPostsHome = async (req, res) => {
/*
    TODO test
    */

    const db = req.app.get('db')
    const id = req.session.user.id

    const posts = await db.get_posts_exclude([id])

    res.status(200).send(posts)
}


const getPostsProfile = async (req, res) => {
    /*
    TODO test
    */

    const db = req.app.get('db')
    const { id } = req.params

    const posts = await db.get_posts_user([id])

    res.status(200).send(posts)
}

const getPost = async (req, res) => {
    /*
    TODO test
    */

    const db = req.app.get('db')
    const id = req.params

    const post = await db.get_post([id])

    res.status(200).send(post[0])

    // axios({
    //     url: "https://api-v3.igdb.com/games",
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'user-key': '176d09a31b52b2b83700b8837e12f39b'
    //     },
    //     data: 'fields *; where id = 1942;'
    //   })
    //     .then(response => {
    //         res.status(200).send(response.data);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
}

const searchPosts = (req, res) => {

    res.status(200).send()
}

const editPost = async (req, res) => {

    res.status(200).send()
}

const deletePost = async (req, res) => {

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