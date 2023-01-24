import React, { useEffect, useState } from 'react'
// import {GuestsModal} from './guestsModal.jsx'
import { CapacityBooking } from './capacityTemp.jsx'
import { } from '../../'


export function Booking({ room, guestsNum, guests, setguests, avgRate }) {
    const [gModal, setgModal] = useState(false)
    // const guestsList = guests
    // useEffect(() => {
    //     gustNum()
    // }, [guests])




    function handleChange({ name: field, value }) {
        console.log('at handle change:', field, value)

    }

    function addGuest(guest, diff) {

        const maxCapacity = room.capacity
        const numOfGuests = guests.Adults + guests.Kids

        if (numOfGuests < maxCapacity) {
            guests[guest] += diff

            if (guests['Adults'] < 1) guests['Adults'] = 1
            if (guests['Kids'] < 0) guests['Kids'] = 0

            // if (guest === 'Infants') {
            //     if (guests['Infants'] < 0) guests['Infants'] = 0
            //     if (guests['Infants'] > 5) guests['Infants'] = 5
            // }
            // if (guest === 'Pets') {

            //     if (guests['Pets'] < 0) guests['Pets'] = 0
            //     if (guests['Pets'] > 5) guests['Pets'] = 5
            // }

        } else {
            if (diff === -1 && guest != 'Infants' && guest != 'Pets') {
                
                guests[guest] += diff
                if (guests['Adults'] < 1) guests['Adults'] = 1
                if (guests['Kids'] < 0) guests['Kids'] = 0
            }
        }

        if (guest === 'Infants') {
            guests[guest] += diff

            if (guests['Infants'] < 0) guests['Infants'] = 0
            if (guests['Infants'] > 5) guests['Infants'] = 5
        }
        if (guest === 'Pets') {
            guests[guest] += diff

            if (guests['Pets'] < 0) guests['Pets'] = 0
            if (guests['Pets'] > 5) guests['Pets'] = 5
        }




        // if (guests['Infants'] < 5) {

        //     if (guests['Infants'] > 0) {
        //         guests['Infants'] += diff
        //     } else {
        //         if (guests['Infants'] === 0 && diff === 1) {
        //             guests['Infants'] += diff
        //         }
        //     }
        // } else {
        //     if (diff === -1) {
        //         if (guests['Infants'] > 0) {
        //             guests['Infants'] += diff
        //         } else {
        //             if (guests['Infants'] === 0 && diff === 1) {
        //                 guests['Infants'] += diff
        //             }
        //         }
        //     }
        // }

        // if (guest === 'Pets') {
        //     if (guests['Pets'] < 5) {

        //         if (guests['Pets'] > 0) {
        //             guests['Pets'] += diff
        //         } else {
        //             if (guests['Pets'] === 0 && diff === 1) {
        //                 guests['Pets'] += diff
        //             }
        //         }
        //     } else {
        //         if (diff === -1) {
        //             if (guests['Pets'] > 0) {
        //                 guests['Pets'] += diff
        //             } else {
        //                 if (guests['Pets'] === 0 && diff === 1) {
        //                     guests['Pets'] += diff
        //                 }
        //             }
        //         }
        //     }

        // }

        const cuurNumOfGuests = guests.Adults + guests.Kids
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
                    ★{avgRate}·<span className='reviewsBtn'>15 reviews</span>
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