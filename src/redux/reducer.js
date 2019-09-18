// initial state
const initialState = {
    username: ''
}

const ADD_USER = 'ADD_USER'

export function addUser(username) {
    return {
        type: ADD_USER,
        payload: {
            username
        }
    }
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action

    switch(type) {
        case ADD_USER:
            return Object.assign({}, {...state}, {...payload})
        default:
            return state
    }
}