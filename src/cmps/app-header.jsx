import { Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MainFilter } from './main-filter'
import routes from '../routes'
// import {setIsFilterShown} from '../store/actions/stay.actions'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import hamburger from '../assets/img/hamburger.svg'
import lence from '../assets/img/lence.svg'
import userDfault from '../assets/img/user-default.svg'
import logo from '../assets/img/logo.png'
import i18n from '../assets/img/i18n.svg'

import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { setIsFilterShown } from '../store/actions/stay.actions'


export function AppHeader({ }) {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)
    const isFilterShown = useSelector((state) => state.stayModule.isFilterShown)

    // const stay = useSelector((state) => state.stayModule.stay)
    const location = useLocation().pathname
    // const stayId = stay._id
    const roomDetiles = `/rooms`

    const [filterType, setFilterType] = useState('location')
    const [isModalOpen, SetIsModalOpen] = useState(false)

    function onShowFilter(type) {
        setIsFilterShown(true)
        setFilterType(type)
    }

    function setLocationTxt() {
        const { txt, region } = currFilterBy
        if ((!txt && !region) || region === 'flexible') return "Anywhere"
        return region
    }



    // {`app-header full ${location.includes(`/rooms`)} ? 'main-layout-detailes' : 'main-layout'}`}>
    let divName
    if (location.match(`/rooms`)) {
        divName = 'app-header-room full rooms'
    } else {
        divName = 'app-header full main-layout'
    }

    function setDateTxt(type) {
        let date = (type === 'in') ? currFilterBy.datesRange.timeStampStart : currFilterBy.datesRange.timeStampEnd
        console.log('type at setDateTxt:', type)
        const txt = `${new Date(date).toLocaleString('en', { month: 'short' })} ${new Date(date).getDate()}`
        console.log('txt at setDateTxt:', txt)
        return txt
    }

    function openUserModal() {
        return <section className='user-modal'>
            <div className='log-in' >Log in</div>
            <div className='sign-up'>Sign up</div>
            <div className='host'>B&bAir your home</div>
        </section>
    }

    const { timeStampStart, timeStampEnd } = currFilterBy.datesRange
    console.log('isModalOpen:', isModalOpen)
    return (
        <header className={divName}>
            <div className='main-content flex'>
                <div className="logo-container"><img src={logo} alt="" /></div>
                <div className='header-container flex'>
                    <div className='header-buttons'>
                        <Link className="host-link" to="/hosting">Switch to hosting</Link>
                        <button className='i18n-btn'><div className='i18n img-container'><img src={i18n} alt="" /></div></button>
                    </div>
                    <button className='user-nav flex'>
                        <div className='img-container hamburger'>
                            <img src={hamburger} alt="" />
                        </div >
                        <div className='img-container user' onClick={() => SetIsModalOpen(true)}>
                            <img className='user-img' src={userDfault} alt="" />
                        </div>
                    </button>
                </div>
                <div className={`filter-container flex ${(isFilterShown) ? 'close' : ''}`}>
                    <button onClick={() => onShowFilter('location')}><div className='btn-txt'>{setLocationTxt()}</div></button><span className='line'></span>
                    <button onClick={() => onShowFilter('date')}><div className='btn-txt'>{timeStampStart ? `${setDateTxt('in')} - ${setDateTxt('out')}` : 'Any week'}</div>
                    </button><span className='line'></span>
                    <button className='guests flex align-center' onClick={() => onShowFilter('capacity')}>
                        <div className='btn-txt'>{currFilterBy.capacity.total ? currFilterBy.capacity.total + ' guests' : 'Add guests'}</div>
                        <div className="search-image img-container" onClick={(ev) => {
                            ev.stopPropagation()
                            onShowFilter('where')
                        }} >
                            <svg className='svg-white' viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                <g fill="none">
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
                {isFilterShown && <MainFilter onShowFilter={onShowFilter} filterType={filterType} isFilterShown={isFilterShown}
                    setIsFilterShown={setIsFilterShown} setLocationTxt={setLocationTxt} setDateTxt={setDateTxt} />
                }


            </div>

            {isModalOpen && openUserModal()}
        </header>
    )


}
