import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.local'

import { StayManagement } from "../pages/stay-management"
import { orderService } from '../services/order.service.local'

const Row = (props) => {
    const { status, guests, checkIn, checkOut, booked, listing, totalPayout } = props
    console.log('hi!')
    return <h1>wowwwwwwww</h1>
    // console.log('hiiiiiiii')
    // return (<tr className="trip-tr-body">
    //     {console.log(status)}
    //     <td className={`trip-td-body ${status}`}>{status}</td>
    //     <td className="trip-td-body">{guests}</td>
    //     <td className="trip-td-body">{checkIn}</td>
    //     <td className="trip-td-body">{checkOut}</td>
    //     <td className="trip-td-body">{booked}</td>
    //     <td className="trip-td-body">{listing}</td>
    //     <td className="trip-td-body">{totalPayout}</td>
    // </tr>
    // )
}

const Table = (props) => {
    const { data } = props

    // const objUsers = { ...data }

    // const data = ...dataInObj)
    // console.log(...data)

    return (<table className="trip-table">
        <thead className="trip-thead">
            <tr className="trip-tr">
                <th key={10} className="trip-td">Status</th>
                <th key={11} className="trip-td">Guests</th>
                <th key={12} className="trip-td">Check-In</th>
                <th key={13} className="trip-td">Check-Out</th>
                <th key={14} className="trip-td">Booked</th>
                <th key={15} className="trip-td">Listing</th>
                <th key={16} className="trip-td">Total-Payout</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => {
                return (
                    <tr className="trip-tr-body">
                        <td key={1} className={`trip-td-body ${row.status}`}>{row.status}</td>
                        <td key={2} className="trip-td-body">{row.guests.Adulst}</td>
                        <td key={3} className="trip-td-body">{row.startDate}</td>
                        <td key={4} className="trip-td-body">{row.endDate}</td>
                        <td key={5} className="trip-td-body">{row.startDate}</td>
                        <td key={6} className="trip-td-body">{row.stay}</td>
                        <td key={7} className="trip-td-body">{row.totalPrice}</td>
                    </tr>)
            })}
        </tbody>
    </table>
    )
}

export function Trip() {

    const loggedinUser = useSelector((state) => state.userModule.user)
    const [myOrders, setMyOrders] = useState(null)
    // const [rows, setRows] = useState([])


    useEffect(() => {
        if (!loggedinUser) return
        const userId = loggedinUser._id
        console.log(userId)
        getMyOrders()
    }, [])

    useEffect(() => {
        console.log('changed my orderd!')
    }, [myOrders])


    async function getMyOrders() {
        try {
            console.log(loggedinUser)
            const orders = await orderService.getOrdersByBuyerId(loggedinUser._id)
            console.log(orders)
            setMyOrders(orders)
            // setRows(orders)
        } catch (err) {
            console.log(err)
        }
    }

    return <div>

        {!myOrders && <div>loading.........{console.log(myOrders)}</div>}
        {myOrders && <section className="trip-containter">
            <div className="trip-header">
                Reservation
                {console.log(myOrders)}
            </div>
            <div className="trip-data">
                <Table data={myOrders} />
            </div>
        </section>
        }
    </div>
}