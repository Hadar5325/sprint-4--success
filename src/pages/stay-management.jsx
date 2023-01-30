import { stayService } from '../services/stay.service.local.js'
import { orderService } from '../services/order.service.local'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, loadOrder, addOrder, updateOrder, removeOrder } from '../store/order.action'
import { OrderShow } from '../cmps/stayMnegmant/orders'
import {StaysShow} from '../cmps/stayMnegmant/stays'



export function StayManagement() {
    const loggedinUser = useSelector((state) => state.userModule.user)

    const [myStays, setMyStays] = useState([])
    const [myOrders, setMyOrders] = useState([])
    const [pendingNum, setPendingNum] = useState(0)
    const [info, setInfo] = useState('orders')


    useEffect(() => {
        getMayStays()
        getMayOrders()
    }, [])


    useEffect(() => {
        numOfPending()
        getMayOrders()
    }, [myOrders])

    async function getMayOrders() {
        try {
            const orders = await orderService.getOrdersByUserId(loggedinUser._id)
            setMyOrders(orders)
        } catch (err) {
            console.log(err)
        }
    }
    async function getMayStays() {
        try {
            const stays = await stayService.getStaysByUserId(loggedinUser._id)
            setMyStays(stays)
        } catch (err) {
            console.log(err)
        }
    }

    // async function loadStay() {
    //     try {
    //         const stays = await stayService.getAllStays()
    //         const ownerStays = stays.filter(stay => stay.host._id === loggedinUser._id)
    //         setMyStays(ownerStays)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    function numOfPending() {
        const pendingOrders = myOrders.filter(order => order.status === 'pending')
        setPendingNum(pendingOrders.length)
    }

    async function changStatus(orderId, status) {
        const orderToUp = await loadOrder(orderId)
        orderToUp.status = status
        updateOrder(orderToUp)
        getMayOrders()
    }

    if (!myStays) return <section>Add a home</section>
    return <section className="stayMenegment">
        {info === 'orders' && < OrderShow loggedinUser={loggedinUser} pendingNum={pendingNum} myOrders={myOrders} changStatus={changStatus} />}
        {info === 'stays' && < StaysShow loggedinUser={loggedinUser} myStays={myStays} myOrders={myOrders} changStatus={changStatus} />}
        

    </section>
}

{/* <div className='order' >
    <div className='gusName'>{order.buyer}</div> */}