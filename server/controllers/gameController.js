const createGame = async (req, res) => {

    const db = req.app.get('db')
    const { game_id, user_id, location } = req.body
    console.log(game_id, user_id, location)
    let addGame
    let foundGame

    switch(location) {
        case 'want_to_play':
            foundGame = await db.find_want_to_play([game_id, user_id])
            break
        case 'want_to_own':
            foundGame = await db.find_want_to_own([game_id, user_id])    
            break
        case 'owned':
            foundGame = await db.find_owned([game_id, user_id])
            break
        case 'played':
            foundGame = await db.find_played([game_id, user_id])
            break
        default:
            return res.status(404).send('Error adding game')
    }

    if(foundGame[0]) {
        return res.status(409).send('Game already on list')
    }

    switch(location) {
        case 'want_to_play':
            addGame = await db.add_want_to_play([game_id, user_id])
            break
        case 'want_to_own':
            addGame = await db.add_want_to_own([game_id, user_id])    
            break
        case 'owned':
            addGame = await db.add_owned([game_id, user_id])
            break
        case 'played':
            addGame = await db.add_played([game_id, user_id])
            break
        default:
            return res.status(404).send('Error adding game')
    }
    return res.status(200).send(addGame[0])

}

const getGames = async (req, res) => {

    const db = req.app.get('db')
    const { user_id } = req.params
    const { list } = req.query
    let games

    switch(list) {
        case 'want_to_play':
            games = await db.get_want_to_play([user_id])
            break
        case 'want_to_own':
            games = await db.get_want_to_own([user_id])
            break
        case 'owned':
            games = await db.get_owned([user_id])
            break
        case 'played':
            games = await db.get_played([user_id])
            break
        default:
            return res.status(404).send('Error adding game')
    }

    res.status(200).send(games)
}

const deleteGame = async (req, res) => {

    const db = req.app.get('db')
    const { user_id } = req.params
    const { list, id } = req.query
    const errorMessage = 'Error removing game from list'
    const successMessage = 'Game removed from list successfully'

    try {
        switch(list) {
            case 'played':
                db.delete_played([user_id, id])
                break
            case 'owned':
                db.delete_owned([user_id, id])
                break
            case 'want_to_play':
                db.delete_want_to_play([user_id, id])
                break
            case 'want_to_own':
                db.delete_want_to_own([user_id, id])
                break
            default:
                return res.status(404).send(errorMessage)
        }
    }
    catch(error) {
        console.log(error)
    }

    res.status(200).send(successMessage)
}


module.exports = {
    createGame,
    getGames,
    deleteGame
}