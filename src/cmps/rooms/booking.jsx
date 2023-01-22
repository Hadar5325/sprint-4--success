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

    const rate = calcRate()

    function calcRate() {
        let sumRates = 0
        const numOfreviews = room['reviews'].length
        room['reviews'].forEach(review => {
            sumRates += review.rate
        })

        const rate = sumRates / numOfreviews
        return Math.floor(rate * 10) / 10;
    }


    function handleChange({ name: field, value }) {
        console.log('at handle change:', field, value)

    }

    function addGuest(guest, diff) {

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
        setguests({ ...guests, newGuests })


    }





    // "guests": {
    //     "adults": 0,
    //     "kids": 0
    //   }


    return <section className="booking">

        <div className="bookingBox">
            <div className='topBookingBox'>
                <span className='price'><span className='currency'>&#x20aa;</span>{room.price}<span className='night'> night</span></span>

                <div className='rate'>
                    ★{rate}·<span className='reviewsBtn'>15 reviews</span>
                </div>
            </div>

            <div className="boxContantTop">
                <button className="checkInBtn bookingBtn" onClick={() => setgModal(true)}></button>
                <button className="guests bookingBtn" onClick={() => setgModal(true)}>{guestsNum}</button>
            </div>

            {gModal && <CapacityBooking addGuest={addGuest} guests={guests} />}

            <button className="reservBtn">Reserve</button>
            <div className='wontharged'>You won't be charged yet</div>

            <div className='sum'>
                <div className='billingCalc'>
                    <div className='calcDetail'>&#x20aa;{room.price} x 7 nights</div>
                    <div className='calc'> &#x20aa;{room.price * 7} </div>
                </div>

                <div className='billingCalc'>
                    <div className='calcDetail'>Cleaning fee</div>
                    <div className='calc'>&#x20aa;185 </div>
                </div>

                <div className='billingCalc'>
                    <div className='calcDetail'>Service fee</div>
                    <div className='calc'>&#x20aa;537 </div>
                </div>

            </div>


            <div className='total'>
                <div className='calcDetail'>Total</div>
                <div className='calc'>&#x20aa;1,282 </div>
            </div>


        </div>

    </section>
}