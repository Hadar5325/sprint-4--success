import { Booking } from './booking.jsx'
import { StayDetailes } from './stayDetailes.jsx'

import React, { useEffect, useState } from 'react'

export function Detailes({room ,order, guestsNum, setguests, guests}){

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

    const rates = room['statReviews']
    let avgRate = calcaAvgRate()
    
    function calcaAvgRate() {
        const avg =(rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location)/6
        return Math.floor(avg * 10) / 10;
    }

    // "Cleanliness": 0,
    //     "Communication": 0,
    //     "CheckIn": 0,
    //     "Accuracy": 0,
    //     "Location": 0,
    //     "Value": 0
    
    return <section className="detailes">
        
        <Booking room={room} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} rate={rate} avgRate={avgRate} />
        <StayDetailes room={room} rate={rate} avgRate={avgRate}/>
        
    </section>
}