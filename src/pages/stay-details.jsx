import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams } from 'react-router-dom';
import { stayService } from '../services/stay.service.local.js'
import { orderService } from '../services/order.service.local.js'


import { TitleContant } from '../cmps/stays/titleContant.jsx'

import { Detailes } from '../cmps/stays/detailes.jsx'
import { Reviwes } from '../cmps/stays/reviwes.jsx'
import { Place } from '../cmps/stays/place.jsx'
import { HostedLeft } from '../cmps/stays/hosted-left.jsx'
import { HostedRight } from '../cmps/stays/hosted-right.jsx'
import { ToKnow } from '../cmps/stays/toKnow.jsx'
import { FirstFooter } from '../cmps/stays/firstFooter.jsx'
import { SecendFooter } from '../cmps/stays/secendFooter.jsx'
import { Galery } from '../cmps/stays/galery.jsx'


export function StayDetails() {



    let id = useParams()
    let {aviv} =  useParams()
    console.log('params',aviv)


    const [capacityModal, setCapacityModal] = useState(false)
    const [dateModal,setDateModal] = useState(false)
    const [stay, setStay] = useState(null)
    const [order, setOrder] = useState({})
    const [guests, setguests] = useState({})
    const [guestsNum, setGuestsNum] = useState(1 + 'guest')
    // const [rate, setRate] = useState(0)  


    // const stay = useSelector((state) => state.stayModule.stay)


    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        maxCapacity: Infinity,
    })




    useEffect(() => {
        loadStay(id)

    }, [])

    useEffect(() => {
        initOrder()
    }, [])

    useEffect(() => {
        onAddGuest(guests)
    }, [guests])


    async function loadStay(id) {
        try {
            const stay = await stayService.getById(id)
            setStay(stay)

        } catch (err) {
            console.log(err)
        }
    }


    function initOrder() {
        const newOrder = _emptyOrder()
        newOrder.status = "pending"
        newOrder.guests = { Adults: 1, Kids: 0, Infants: 0, Pets: 0 }
        // const stayOrder = [stay._id,stay.name,stay.price]
        // newOrder.stay = stayOrder
        setOrder(newOrder)
        setguests(newOrder.guests)
    }


    function onAddGuest(gusts) {
        const sum = _numOfGuests()
        setGuestsNum(sum)
    }

    function _numOfGuests() {
        const gusts = guests
        const adultsNum = gusts.Adults + gusts.Kids
        let line = adultsNum + 'guest'
        if (gusts.Infants > 0) {
            line = line + ', ' + gusts.Infants + ' Infants '
        }
        if (gusts.Pets > 0) {
            line = line + ', ' + gusts.Pets + ' Pets '
        }

        return line
    }

    function _emptyOrder() {

        const order = orderService.getEmptyorder()
        return order
    }






    // const handleChange = (ev) => {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setFilterBy({ ...filterBy, [field]: value })
    // }

    //booking functions



    if (!stay) {
        return <section>loading...</section>
    }

    const handleClick = event => {
        const txt = 'eact-datepicker__day react-datepicker__day--react-datepicker__day--disabled'
        const target = event.target.className

        const notOpenCapacity =['title','guestsModal','guests bookingBtn','capacityLabel','chosingGuestsBtn','capacityLabel first','chosingGuests','<empty string>']
        
        if(!notOpenCapacity.includes(event.target.className, 0)) setCapacityModal(false)
        if(!target.match(`react-datepicker`) && !target.match(`checkInBtn bookingBtn`)) setDateModal(false)
      }




    return <section className='stays' onClick={handleClick} >


        <TitleContant stay={stay} setCapacityModal={setCapacityModal} />
        <Galery stay={stay} setCapacityModal={setCapacityModal} />

        <Detailes stay={stay} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} capacityModal={capacityModal} setCapacityModal={setCapacityModal} setDateModal={setDateModal} dateModal = {dateModal} />


        <Reviwes stay={stay} setCapacityModal={setCapacityModal} />
        {/* <Place />
        <HostedLeft />
        <HostedRight />
        <ToKnow />
        <SecendFooter /> */}
        <FirstFooter setCapacityModal={setCapacityModal} />

    </section>
}