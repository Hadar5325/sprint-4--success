import { orderService } from '../services/order.service.local'

export const SET_ORDERS = 'SET_STAYS'
export const SET_ORDER = 'SET_STAY'
export const REMOVE_ORDER = 'REMOVE_STAY'
export const ADD_ORDER = 'ADD_STAY'
export const UPDATE_ORDER = 'UPDATE_STAY'


const initialState = {
    orders: [],
    order: {},
}

export function orderReducer(state = initialState, action) {
    let orders
    let order
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders }
        case SET_ORDER:
            return { ...state, order: action.order }
        case REMOVE_ORDER:
            orders = state.orders.filter(order => order._id !== action.orderId)
            return { ...state, orders }
        case ADD_ORDER:
            orders = [state.orders,...action.order]
            return { ...state, orders }
        case UPDATE_ORDER:
            orders = state.orders.map(order => order._id === action.order._id ? action.order : order)
            return { ...state, orders }
        default:
            return state;
    }
} 