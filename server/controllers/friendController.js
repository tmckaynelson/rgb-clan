const addFriend = async (req, res) => {

    const { user_id, friend_id } = req.body
    const db = req.app.get('db')
    const errorMessage = 'Error adding friend'
    const successMessage = 'Added friend'

    const foundFriend = await db.find_friend([user_id, friend_id])

    if (foundFriend[0]) {
        return res.status(409).send(errorMessage)
    }

    db.add_friend([user_id, friend_id])
    res.status(200).send(successMessage)
}

const deleteFriend = async (req, res) => {
    
    const db = req.app.get('db')
    const { user_id } = req.params
    const { id } = req.query

    db.delete_friend([user_id, id])
    res.status(200).send('Friend successfully removed')
}

const getFriends = async (req, res) => {

    const db = req.app.get('db')
    const { id } = req.params

    const friends = await db.get_friends([id])

    res.status(200).send(friends)
}

module.exports = {
    addFriend,
    getFriends,
    deleteFriend
}