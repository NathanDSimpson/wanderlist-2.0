const initialState = {
	authenticated: false,
	user_id: null,
	firstname: '',
	lastname: '',
	email: '',
	items: [],
	lists: [],
	trips: []
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const GET_USER_DATA = 'GET_USER_DATA'


export function registerUser(obj) {
	return {
		type: REGISTER_USER,
		payload: obj
	}
}

export function loginUser(obj) {
	return {
		type: LOGIN_USER,
		payload: obj
	}
}

export function getUserData(obj){
	return{
		type: GET_USER_DATA,
		payload: obj
	}
}

export default function reducer(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case REGISTER_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.user_id,
				authenticated: payload.authenticated
			}
		case LOGIN_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.user_id,
				authenticated: payload.authenticated
        }
        case GET_USER_DATA:
        return {
            ...state,
            items: payload.items,
            lists: payload.lists_with_items,
            trips: payload.trips_with_lists,
        }
		default:
			return state
	}
}