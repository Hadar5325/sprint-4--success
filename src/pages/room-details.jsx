import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams } from 'react-router-dom';
import { stayService } from '../services/stay.service.local.js'

import { Ex } from '../cmps/ex.jsx'
import { TitleContant } from '../cmps/titleContant.jsx'
import { loadStay } from '../store/actions/stay.action'


export function RoomDetails() {
    let { id } = useParams()

    // const count = useSelector(storeState => storeState.userModule.count)


    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        maxCapacity: Infinity,
    })


    useEffect(() => {
            loadStay(id)
            .then(() => {
            })
            .catch((err) => {
            })

    }, [])


    // const handleChange = (ev) => {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setFilterBy({ ...filterBy, [field]: value })
    // }

    const stay = useSelector((state) => state.stayModule.stay)
    
    return <section className='rooms'>
        sdf
        <Ex />
        <TitleContant room={stay} />

    </section>
}