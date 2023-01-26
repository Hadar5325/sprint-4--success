import { Booking } from './booking.jsx'
import { StayDetailes } from './stayDetailes.jsx'

import React, { useEffect, useState } from 'react'

export function Detailes({ dates, setDates ,stay ,order, guestsNum, setguests, guests, capacityModal,setCapacityModal,dateModal,setDateModal}){

    const rate = calcRate()

    function handleChange({ name: field, value }) {
        console.log('at handle change:', value)
        // setFilterBy({ ...filterBy, [field]: value })
    }

    function calcRate() {
        let sumRates = 0
        const numOfreviews = stay['reviews'].length
        stay['reviews'].forEach(review => {
            sumRates += review.rate
        })

        const rate = sumRates / numOfreviews
        return Math.floor(rate * 10) / 10;
    }

    const rates = stay['statReviews']
    let avgRate = calcaAvgRate()
    
    function calcaAvgRate() {
        
        const avg =(rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location)/6
        return Math.floor(avg * 10) / 10
    }

    // "Cleanliness": 0,
    //     "Communication": 0,
    //     "CheckIn": 0,
    //     "Accuracy": 0,
    //     "Location": 0,
    //     "Value": 0
    
    return <section className="detailes">
        
        <Booking dates={dates} setDates={setDates}stay={stay} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} rate={rate} avgRate={avgRate} capacityModal={capacityModal} setCapacityModal={setCapacityModal} dateModal={dateModal} setDateModal={setDateModal} handleChange={handleChange} />
        <StayDetailes stay={stay} rate={rate} avgRate={avgRate} setCapacityModal={setCapacityModal}/>
        
    </section>
}