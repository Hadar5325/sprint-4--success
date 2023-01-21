import { Booking } from './booking.jsx'
import { StayDetailes } from './stayDetailes.jsx'

import React, { useEffect, useState } from 'react'

export function Detailes({room ,order, guestsNum, setguests, guests}){

    
    return <section className="detailes">
        
        <Booking room={room} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} />
        <StayDetailes room={room}/>
        
    </section>
}