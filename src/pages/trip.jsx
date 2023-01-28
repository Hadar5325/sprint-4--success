import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service.local'

import { StayManagement } from "../pages/stay-management"

const Row = (props) => {
    const { status, guests, checkIn, checkOut, booked, listing, totalPayout } = props
    return (<tr className="trip-tr-body">
        <td className="trip-td-body">{status}</td>
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

    useEffect(() => {
        if (!loggedinUser) return
        const userId = loggedinUser._id
        console.log(userId)
        getTotalUserData(userId)
    }, [])


    async function getTotalUserData(userId) {
        try {
            const dataUser = await userService.getById(userId)
            console.log(dataUser)
        } catch (err) {
            console.log('could not get user data', err)
        }
    }
    const reservation = [
        {
            status: '',
            guests: '',
            checkIn: '',
            checkOut: '',
            booked: '',
            listing: '',
            totalPayout: ''
        },
        {
            status: 'a',
            guests: 'a',
            checkIn: 'a',
            checkOut: 'a',
            booked: 'a',
            listing: 'a',
            totalPayout: 'a'
        },
        {
            status: 'b',
            guests: 'b',
            checkIn: 'b',
            checkOut: 'b',
            booked: 'b',
            listing: 'b',
            totalPayout: 'b'
        }
    ]

    const [rows, setRows] = useState(reservation)

    console.log()
    return <section className="trip-containter">
        <div className="trip-header">
            Reservation
        </div>
        <div className="trip-data">
            <Table data={rows} />

            {/* <table className="trip-table">
                <thead className="trip-thead">
                    <tr className="trip-tr">
                        <td className="trip-td">Status</td>
                        <td className="trip-td">Guests</td>
                        <td className="trip-td">Check-in</td>
                        <td className="trip-td">Check-out</td>
                        <td className="trip-td">Booked</td>
                        <td className="trip-td">Listing</td>
                        <td className="trip-td">Total Payout</td>
                    </tr>
                </thead>
                <tbody>

                </tbody>
                <tr></tr>
            </table> */}
        </div>
    </section>
}
// לירדן!!!!! הורדתי את ה
//fixed from the header!!!!!!!!!!!!!!