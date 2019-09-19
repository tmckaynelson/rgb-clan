const bcrypt = require('bcryptjs')

const login = async (req, res) => {

    const { username, password } = req.body
    const db = req.app.get('db')
    const errorMessage = 'Invalid credentials.'
    

    const foundUser = await db.get_user([username])

    if (!foundUser[0]) {
        return res.status(401).send({errorMessage})
    }

    if (!bcrypt.compareSync(password, foundUser[0].password)) {
        return res.status(401).send({errorMessage})
    }

    delete foundUser[0].password
    delete foundUser[0].active

    req.session.user = foundUser[0]

    res.status(200).send(foundUser[0])
}

const register = async (req, res) => {

    const { username, password, first_name, last_name, email } = req.body
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if (foundUser[0]) {
        return res.status(409).send('Username already in use')
    }

    let salt = bcrypt.genSaltSync(13)
    let hashPass = bcrypt.hashSync(password, salt)

    const newUser = await db.register([username, hashPass, first_name, last_name, email])

    return res.status(200).send(newUser[0])
}

const deleteAccount = async (req, res) => {
    console.log('hit delete account')

    // const { username, password } = req.body
    // const db = req.app.get('db')

    // const foundUser = await db.get_user([username])

    // if(!foundUser[0]) {
    //     return res.status(404).send('Error deleting account')
    // }
}

const logout = (req, res) => {

    req.session.destroy()
    res.status(200).send('User logged out')
}

const edit = async (req, res) => {

    const errorMessage = 'Error editing profile'
    const { username, password, first_name, last_name, email } = req.body
    const { id } = req.params
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if(!foundUser[0]) {
        return res.status(404).send(errorMessage)
    }

    if(!bcrypt.compareSync(password, foundUser[0].password)) {
        return res.status.send(409).send(errorMessage)
    }

    const editUser = await db.edit_user([first_name, last_name, email, id])

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
    login,
    register,
    deleteAccount,
    logout,
    edit
}