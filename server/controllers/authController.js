const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    console.log('hit login')

    const { username, password } = req.body
    const db = req.app.get('db')
    const errorMessage = 'Invalid credentials.'
    

    const foundUser = await db.get_user([username])

    if (!foundUser[0]) {
        return res.status(404).send(errorMessage)
    }

    
}

const register = async (req, res) => {

    const { username, password, first_name, last_name } = req.body
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if (foundUser[0]) {
        return res.status(409).send('Username already in use')
    }

    let salt = bcrypt.genSaltSync(13)
    let hashPass = bcrypt.hashSync(password, salt)

    const newUser = await db.register([username, hashPass, first_name, last_name])

    return res.status(200).send(newUser[0])
}

const deleteAccount = async (req, res) => {
    console.log('hit delete account')
}

const logout = async (req, res) => {
    console.log('hit logout')
}

const edit = async (req, res) => {
    console.log('hit edit')
}


module.exports = {
    login,
    register,
    deleteAccount,
    logout,
    edit
}