export const SET_STAYS = 'SET_STAYS'
// export const REMOVE_TOY = 'REMOVE_TOY'
// export const ADD_TOY = 'ADD_TOY'
// export const UPDATE_TOY = 'UPDATE_TOY'

const initialState = {
    stays: []
}

export function stayReducer(state = initialState, action) {
    var stays
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }
        // case REMOVE_TOY:
        //     toys = state.toys.filter(toy => toy._id !== action.toyId)
        //     return { ...state, toys }
        // case ADD_TOY:
        //     toys = [action.toy, ...state.toys]
        //     return { ...state, toys }
        // case UPDATE_TOY:
        //     toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
        //     return { ...state, toys }
        default:
            return state;
    }
} 