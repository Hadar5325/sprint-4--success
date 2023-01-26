import { Link } from 'react-router-dom'
import { Routes, Route, useParams } from 'react-router-dom';
import { orderService } from '../services/order.service.local.js'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Book() {

    const loggedinUser = useSelector((state) => state.userModule.user)

    console.log(loggedinUser)
    // const params = new URLSearchParams(window.location.search)
    // const entries = params.entries()

    // const queryObject = Object.fromEntries(entries)

    let { hostId, timeStart, timeEnd, Adulst, kids, Infants, Pets, totalPrice, stay } = useParams()

    const [guests, setguests] = useState([])
    const [order, setOrder] = useState({})


    useEffect(() => {
        _numOfGuests(Adulst, kids, Infants, Pets)
        newOrder(hostId, totalPrice, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay)
    }, [])


    function newOrder(HostId, price, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay) {

        const newOrder = emptyOrder()

        newOrder.hostId = HostId
        newOrder.buyer = loggedinUser._id
        newOrder.totalPrice = price
        newOrder.startDate = timeStart
        newOrder.endDate = timeEnd
        newOrder.guests = { Adulst, kids, Infants, Pets }
        newOrder.stay = stay
        // order.msgs = []
        newOrder.status = "pending"

        setOrder(newOrder)
    }


    function _numOfGuests(Adulst, kids, Infants, Pets) {
        Adulst = Number(Adulst)
        kids = Number(kids)
        Infants = Number(Infants)
        Pets = Number(Pets)

        const adultsNum = Adulst + kids
        let line = adultsNum + 'guest'
        if (Infants > 0) {
            line = line + ', ' + Infants + ' Infants '
        }
        if (Pets > 0) {
            line = line + ', ' + Pets + ' Pets '
        }

        setguests(line)
    }

    function emptyOrder() {
        const order = orderService.getEmptyorder()
        return order
    }

    function saveOrder(event) {
        event.preventDefault()

        orderService.save(order)
    }


    return <section className='book'>

        <div className='RequestTitle'>
            <div className='RequestTitleContant'>
                <div className='backto'>←</div>
                <div className='RequestTitleContantTitle'>Request to book</div>
            </div>
        </div>

        <div className='mainBook'>


            {timeStart} - {timeEnd}

            <h4>Guests</h4>
            {guests}
            <button onClick={(event) => saveOrder(event)}>book</button>
        </div>

    </section>
}