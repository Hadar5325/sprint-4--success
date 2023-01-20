import React, { useEffect, useState } from 'react'
import {GuestsModal} from './guestsModal.jsx'

export function Booking(){
    const [gModal,setgModal] = useState(false)


    return <section className="booking">
        Booking
        <div className="bookingBox">
            <div className="boxContantTop">
                <button className="checkInBtn bookingBtn" onClick={() => setgModal(true)}></button>
                <hr></hr>
                <button className="guests bookingBtn" onClick={() => setgModal(true)}></button>
            </div>
            {gModal && <GuestsModal/>}
        </div>
    </section>
}