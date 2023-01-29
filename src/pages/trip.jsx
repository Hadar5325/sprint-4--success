import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.local'

import { StayManagement } from "../pages/stay-management"
import { orderService } from '../services/order.service.local'

const Row = (props) => {
    const { status, guests, checkIn, checkOut, booked, listing, totalPayout } = props

    const whichStatusColor = (ev, status)=>{
        console.log(ev)
        console.log(status)
        return <div>hello!</div>
    }
    // function whichStatusColor1(status) {
    //     // console.log(ev)
    //     switch (status) {
    //         case 'Pending':
    //             break
    //         case 'Approved':
    //             break
    //         case 'Declined':
    //             break
    //     }

    // }
    return (<tr className="trip-tr-body">
        {/* <td className="trip-td-body trip-status">{whichStatusColor(status)}</td> */}
        {/* <td className="trip-td-body trip-status">{(ev)=> whichStatusColor(ev, status)}</td> */}
        
        
        {/* <td className="trip-td-body trip-status">{whichStatusColor(status)}</td> */}
        
        <td className={`trip-td-body ${status}`}>{status}</td>
        <td className="trip-td-body">{guests}</td>
        <td className="trip-td-body">{checkIn}</td>
        <td className="trip-td-body">{checkOut}</td>
        <td className="trip-td-body">{booked}</td>
        <td className="trip-td-body">{listing}</td>
        <td className="trip-td-body">{totalPayout}</td>
    </tr>
    )
}

const Table = (props) => {
    const { data } = props
    return (<table className="trip-table">
        <thead className="trip-thead">
            <tr className="trip-tr">
                <th className="trip-td">Status</th>
                <th className="trip-td">Guests</th>
                <th className="trip-td">Check-In</th>
                <th className="trip-td">Check-Out</th>
                <th className="trip-td">Booked</th>
                <th className="trip-td">Listing</th>
                <th className="trip-td">Total-Payout</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) =>
                <Row key={`key-${index}`}
                    status={row.status}
                    guests={row.guests}
                    checkIn={row.checkIn}
                    checkOut={row.checkOut}
                    booked={row.booked}
                    listing={row.listing}
                    totalPayout={row.totalPayout}
                />
            )}
        </tbody>
    </table>
    )
}
export function Trip() {

    const loggedinUser = useSelector((state) => state.userModule.user)
    const [myOrders, setMyOrders] = useState([])


    useEffect(() => {
        if (!loggedinUser) return
        const userId = loggedinUser._id
        console.log(userId)
        getTotalUserData(userId)

        getMyOrders()
    }, [])


    async function getTotalUserData(userId) {
        try {
            const dataUser = await userService.getById(userId)
            console.log(dataUser)
        } catch (err) {
            console.log('could not get user data', err)
        }
    }

    async function getMyOrders() {
        try {
            const orders = await orderService.getOrdersByUserId(loggedinUser._id)
            console.log(orders)
            setMyOrders(orders)
        } catch (err) {
            console.log(err)
        }
    }
    const reservation = [
        {
            status: 'Declined',
            guests: 'c',
            checkIn: 'c',
            checkOut: 'c',
            booked: 'c',
            listing: 'c',
            totalPayout: 'c',
            action: 'c'
        },
        {
            status: 'Approved',
            guests: 'a',
            checkIn: 'a',
            checkOut: 'a',
            booked: 'a',
            listing: 'a',
            totalPayout: 'a',
            action: 'a'
        },
        {
            status: 'Pending',
            guests: 'b',
            checkIn: 'b',
            checkOut: 'b',
            booked: 'b',
            listing: 'b',
            totalPayout: 'b',
            action: 'b'
        }
    ]

    const [rows, setRows] = useState(reservation)



    return <section className="trip-containter">
        <div className="trip-header">
            Reservation
        </div>
        <div className="trip-data">
            <Table data={rows} />
        </div>
    </section>
}
