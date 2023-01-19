export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

const initialState = {
    stays: [],
    stay:{}
}

export function stayReducer(state = initialState, action) {
    var stays
    
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }
        case SET_STAY:
            return { ...state, stay: action.stay }
        case REMOVE_STAY:
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays }
        case ADD_STAY:
            stays = [action.stay, ...state.stays]
            return { ...state, stays }
        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return { ...state, stays }
        default:
            return state;
    }
} 