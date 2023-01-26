import { orderService } from '../services/order.service'
import { store } from "./store.js"
import { SET_ORDERS, SET_ORDER, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER} from './order.reducer'

export function getActionRemoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        stay: order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        stay: order
    }
}


export async function loadStay(orderId) {
    try {
        const order = await orderService.getById(orderId)
        store.dispatch({ type: SET_ORDER    , order })
        return order
    } catch (err) {
        console.log('Cannot load order: ', err)
        throw err
    }
}

export async function loadOrders() {
    try {
        const orders = await orderService.getOrders()
        return orders

    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function removeOrder(orderId) {
    try {
        await stayService.remove(orderId)
        store.dispatch(getActionRemoveOrder(orderId))
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await stayService.save(order)
        console.log('Added Order', savedOrder)
        store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export function updateOrder(order) {
    return orderService.save(order)
        .then(savedOrder => {
            console.log('Updated order:', savedOrder)
            store.dispatch(getActionUpdateOrder(savedOrder))

            return savedOrder
        })
        .catch(err => {
            console.log('Cannot save order', err)
            throw err
        })
}
