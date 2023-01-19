import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams } from 'react-router-dom';
import { stayService } from '../services/stay.service.local.js'

import { TitleContant } from '../cmps/rooms/titleContant.jsx'
import { loadStay } from '../store/actions/stay.action'
import { GaleryLeft } from '../cmps/rooms/galeryLeft.jsx'
import { GaleryRight } from '../cmps/rooms/galertRight.jsx'
import { Detailes } from '../cmps/rooms/detailes.jsx'
import { Booking } from '../cmps/rooms/booking.jsx'
import { Reviwes } from '../cmps/rooms/reviwes.jsx'
import { Place } from '../cmps/rooms/place.jsx'
import { HostedLeft } from '../cmps/rooms/hosted-left.jsx'
import { HostedRight } from '../cmps/rooms/hosted-right.jsx'
import { ToKnow } from '../cmps/rooms/toKnow.jsx'
import { FirstFooter } from '../cmps/rooms/firstFooter.jsx'
import { SecendFooter } from '../cmps/rooms/secendFooter.jsx'



export function RoomDetails() {
    let { id } = useParams()

    const [stay,setStay] = useState(null)

    // const stay = useSelector((state) => state.stayModule.stay)


    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        maxCapacity: Infinity,
    })


    useEffect(() => {
        loadStay(id)
    }, [])

    async function loadStay(id) {
        try{
            const stay = await stayService.getById(id)
            setStay(stay)
        }catch(err){
            console.log(err)
        }
    }
    

    // const handleChange = (ev) => {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setFilterBy({ ...filterBy, [field]: value })
    // }

    if(!stay){
        return <section>loading...</section>
    }
    return <section className='rooms'>
        <TitleContant room={stay} />
        <GaleryLeft room={stay} />
        <GaleryRight room={stay} />
        <Detailes />
        <Booking />
        <Reviwes />
        <Place />
        <HostedLeft />
        <HostedRight />
        <ToKnow />
        <FirstFooter />
        <SecendFooter />

    </section>
}