const initialState = {
	authenticated: false,
	user_id: null,
	firstname: '',
	lastname: '',
	email: '',
	items: [],
	lists: [],
	trips: [],
	selected_item: null,
	selected_list: null,
	selected_trip: null
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const GET_USER_DATA = 'GET_USER_DATA'
const LOGOUT_USER = 'LOGOUT_USER'
const SELECTED_ITEM = 'SELECTED_ITEM'
// const SELECTED_LIST = 'SELECTED_LIST'
// const SELECTED_TRIP = 'SELECTED_TRIP'



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

export function logoutUser(obj) {
	return {
		type: LOGOUT_USER,
		payload: obj
	}
}

export function select_item(item_id) {
	return {
		type: SELECTED_ITEM,
		payload: item_id
	}
}
// export function select_list(list_id) {
// 	return {
// 		type: SELECTED_LIST,
// 		payload: list_id
// 	}
// }

// export function select_trip(trip_id) {
// 	return {
// 		type: SELECTED_TRIP,
// 		payload: trip_id
// 	}
// }


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
		case LOGOUT_USER:
		return { 
			authenticated: false,
			user_id: 0,
			firstname: '',
			lastname: '',
			email: '',
			items: [],
			lists: [],
			trips: []
	}
		case SELECTED_ITEM:
		return { 
			...state, 
			selected_item: payload.item_id
	}
		default:
			return state
	}
}