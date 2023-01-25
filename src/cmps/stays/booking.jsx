import React, { useEffect, useState } from 'react'
// import {GuestsModal} from './guestsModal.jsx'
import {DateFilter } from '../date-filter.jsx'
import { CapacityBooking } from './capacityTemp.jsx'


export function Booking({ stay, guestsNum, guests, setguests, avgRate, setCapacityModal, capacityModal, dateModal, setDateModal,handleChange }) {
    // const [gModal, setgModal] = useState(false)
    const [price, setPrice] = useState({})

    useEffect(() => {
        calcPrice()
    }, [])
    function handleChange({ name: field, value }) {
        console.log('at handle change:', field, value)

    }

    function addGuest(guest, diff) {

        const maxCapacity = stay.capacity
        const numOfGuests = guests.Adults + guests.Kids

        if (numOfGuests < maxCapacity) {
            guests[guest] += diff

            if (guests['Adults'] < 1) guests['Adults'] = 1
            if (guests['Kids'] < 0) guests['Kids'] = 0

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
        const cuurNumOfGuests = guests.Adults + guests.Kids
        const newGuests = guests
        setguests({ ...guests, newGuests })
    }



    function calcPrice() {
        const totalNightsPrice = stay.price * 6
        const servicefee = 0.1 * stay.price * 6
        setPrice({ totalNightsPrice, servicefee, total: totalNightsPrice + servicefee })
    }
    console.log(capacityModal)
    return <section className="booking" >


        <div className="bookingBox">
            <div className='topBookingBox'>
                <span className='price'><span className='currency'>&#x20aa;</span>{stay.price}<span className='night'> night</span></span>
                {
                    avgRate > 0 &&
                    <div className='rate'>
                        ★{avgRate}·<span className='reviewsBtn'>{stay.reviews.length} reviews</span>
                    </div>
                }
            </div>

            <div className="boxContantTop">
                <button className="checkInBtn bookingBtn" onClick={() => setDateModal(true)}></button>
                <button className="guests bookingBtn" onClick={() => setCapacityModal(true)}>{guestsNum}</button>
            </div>
            {capacityModal && <CapacityBooking addGuest={addGuest} guests={guests}  />}
            {dateModal && <div className='calender'><DateFilter handleChange={handleChange}/></div>}
            <button className="reservBtn">Reserve</button>
            <div className='wontharged'>You won't be charged yet</div>

            <div className='sum'>
                <div className='billingCalc'>
                    <div className='calcDetail'>&#x20aa;{stay.price} x 6 nights</div>
                    <div className='calc'> &#x20aa;{price.totalNightsPrice} </div>
                </div>

                <div className='billingCalc'>
                    <div className='calcDetail'>Service fee</div>
                    <div className='calc'>&#x20aa;{price.servicefee} </div>
                </div>

            </div>


            <div className='total'>
                <div className='calcDetail'>Total</div>
                <div className='calc'>&#x20aa;{price.total} </div>
            </div>


        </div>

    </section>
}