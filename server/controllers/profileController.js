const getProfile = async (req, res) => {

    const errorMessage = 'Error editing profile'
    const { username } = req.params
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if(!foundUser[0]) {
        return res.status(404).send(errorMessage)
    }

    delete foundUser[0].password
    delete foundUser[0].active

    res.status(200).send(foundUser[0])
}

const editProfile = async (req, res) => {

    const errorMessage = 'Error editing profile'
    const { username, profile_pic, first_name, last_name, email } = req.body
    const { id } = req.params
    console.log(req.params)
    console.log(id, username, profile_pic, first_name, last_name, email)
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if(!foundUser[0]) {
        return res.status(404).send(errorMessage)
    }

    const editUser = await db.edit_user([first_name, last_name, email, id, profile_pic])

    req.session.user = {
        user_id: id,
        username,
        first_name,
        last_name,
        email
    }

    res.status(200).send(editUser[0])
}

module.exports = {
    getProfile,
    editProfile
}