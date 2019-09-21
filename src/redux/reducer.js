// initial state
const initialState = {
    username: '',
    user_id: '',
    first_name: '',
    last_name: ''
}

const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

export function addUser(username) {
    return {
        type: ADD_USER,
        payload: { ...username }
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action

    switch(type) {
        case ADD_USER:
            return Object.assign({}, {...state}, {...payload})
        case REMOVE_USER:
            return Object.assign({}, initialState)
        case UPDATE_USER:
            return Object.assign({}, {...state}, {...payload})
        default:
            return state
    }
}