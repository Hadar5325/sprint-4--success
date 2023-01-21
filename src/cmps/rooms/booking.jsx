import React, { useEffect, useState } from 'react'
// import {GuestsModal} from './guestsModal.jsx'
import { CapacityBooking } from './capacityTemp.jsx'
import { } from '../../'


export function Booking({ room, guestsNum, guests, setguests }) {
    const [gModal, setgModal] = useState(false)
    // const guestsList = guests

    // useEffect(() => {
    //     gustNum()
    // }, [guests])


    function handleChange({ name: field, value }) {
        console.log('at handle change:', field, value)

    }

    function addGuest(guest,diff) {

        const maxCapacity = room.capacity
        const numOfGuests = guests.Adults + guests.Kids
        if (numOfGuests < maxCapacity) {

            if (guest === 'Adults') {
                if (guests['Adults'] > 1) {
                    guests['Adults'] += diff
                }
                if (guests.Adults === 1 && diff === 1) {
                    guests['Adults'] += diff
                }
                
            }
            if (guest === 'Kids') {
                if (guests['Kids'] > 0) {
                    guests['Kids'] += diff
                } else {
                    if (guests['Kids'] === 0 && diff === 1) {
                        guests['Kids'] += diff
                    }
                }
            }


        } else {
            if (diff === -1) {

                if (guest === 'Adults') {
                    if (guests['Adults'] > 0) {
                        guests['Adults'] += diff
                    } else {
                        if (guests['Adults'] === 0 && diff === 1) {
                            guests['Adults'] += diff
                        }
                    }
                }
                if (guest === 'Kids') {
                    console.log('a')
                    if (guests['Kids'] > 0) {
                        guests['Kids'] += diff
                    } else {
                        if (guests['Kids'] === 0 && diff === 1) {
                            guests['Kids'] += diff
                        }
                    }
                }

            }
        }

        if (guest === 'Infants') {
            if (guests['Infants'] < 5) {

                if (guests['Infants'] > 0) {
                    guests['Infants'] += diff
                } else {
                    if (guests['Infants'] === 0 && diff === 1) {
                        guests['Infants'] += diff
                    }
                }
            } else {
                if (diff === -1) {
                    if (guests['Infants'] > 0) {
                        guests['Infants'] += diff
                    } else {
                        if (guests['Infants'] === 0 && diff === 1) {
                            guests['Infants'] += diff
                        }
                    }
                }
            }

        }
        if (guest === 'Pets') {
            if (guests['Pets'] < 5) {

                if (guests['Pets'] > 0) {
                    guests['Pets'] += diff
                } else {
                    if (guests['Pets'] === 0 && diff === 1) {
                        guests['Pets'] += diff
                    }
                }
            } else {
                if (diff === -1) {
                    if (guests['Pets'] > 0) {
                        guests['Pets'] += diff
                    } else {
                        if (guests['Pets'] === 0 && diff === 1) {
                            guests['Pets'] += diff
                        }
                    }
                }
            }

        }

        const cuurNumOfGuests = guests.Adults + guests.Kids
        console.log(cuurNumOfGuests)
        const newGuests = guests
        setguests({...guests,newGuests})

        
    }



    // "guests": {
    //     "adults": 0,
    //     "kids": 0
    //   }


    return <section className="booking">
        Booking
        <div className="bookingBox">
            <div className="boxContantTop">
                <button className="checkInBtn bookingBtn" onClick={() => setgModal(true)}></button>
                <hr></hr>
                <button className="guests bookingBtn" onClick={() => setgModal(true)}>{guestsNum}</button>
            </div>
            <div className='wontharged'>You won't be charged yet</div>

            {gModal && <CapacityBooking addGuest={addGuest} guests={guests} />}

            <button className="reservBtn">asdd</button>


        </div>

    </section>
}