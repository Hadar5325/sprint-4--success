import { stayService } from '../services/stay.service.local.js'
import { orderService } from '../services/order.service.local'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, loadOrder, addOrder, updateOrder, removeOrder } from '../store/order.action'

export function StayMenegment() {
    const loggedinUser = useSelector((state) => state.userModule.user)

    const [stays, setStays] = useState([])
    const [myOrders, setMyOrders] = useState([])
    const [pendingNum, setPendingNum] = useState(0)
    const [info, setInfo] = useState('orders')


    useEffect(() => {
        loadStay()
        getMayOrders()
    }, [])


    useEffect(() => {
        numOfPending()
    }, [myOrders])

    async function getMayOrders() {
        try {
            const orders = await orderService.getOrdersByUserId(loggedinUser._id)
            setMyOrders(orders)
        } catch (err) {
            console.log(err)
        }
    }

    async function loadStay() {
        try {
            const stays = await stayService.getAllStays()
            const ownerStays = stays.filter(stay => stay.host._id === loggedinUser._id)
            setStays(ownerStays)
        } catch (err) {
            console.log(err)
        }
    }
    function numOfPending() {
        const pendingOrders = myOrders.filter(order => order.status === 'pending')
        setPendingNum(pendingOrders.length)
    }

    async function changStatus(event, orderId, status) {
        event.preventDefault()
        const orderToUp = await loadOrder(orderId)
        orderToUp.status = status
        updateOrder(orderToUp)
        getMayOrders()
        // setOrderStatus('reject')
    }

    if (!stays) return <section>Add a home</section>

    return <section className="stayMenegment">

        <div className='menegmentMnue'>
            <div className='buttons'>
                <button className={`showinfo  ${info === 'orders' && 'push'} right`} onClick={() => setInfo('orders')}>orders</button>
                <button className={`showinfo left ${info === 'stays' && 'push'}`} onClick={() => setInfo('stays')}>my stays</button>
            </div>
        </div>

        <div className='menegmentContant'>
            <div className='contantTitle'>
                hello {loggedinUser.fullname}! you have {pendingNum} pending orders
            </div>
            <div className='tableHead'>
                <div className='cell guest'>guest</div>
                <div className='cell stay'>stay</div>
                <div className='cell dates'>dates</div>
                <div className='cell price'>Price</div>
                <div className='cell status'>Status</div>
                <div className='cell actions'>Actions</div>


            </div>

            <div className='menegmentTable'>
                {
                    myOrders.map(order => {
                        return <section className={`tableRow cell ${order.status === 'pending' && 'pendingStatus'}`} key={order._id}>
                            <div className='cell guest'>guest</div>
                            <div className='cell stay'>stay</div>
                            <div className='cell dates'>dates</div>

                            <div className='cell price'>Price</div>
                            <div className={`cell status ${order.status}`}>{order.status}</div>
                            
                            <div className='cell actions'>
                                <button className='approveBtn' disabled={(order.status === 'pending') ? false : true} onClick={(event) => changStatus(event, order._id, 'approve')}>approve</button>
                                <button className='rejectBtn' disabled={(order.status === 'pending') ? false : true} onClick={(event) => changStatus(event, order._id, 'reject')}>reject</button>
                            </div>
                        </section>
                    })
                }    
            </div>
        </div>
    </section >
}

{/* <div className='order' >
    <div className='gusName'>{order.buyer}</div> */}