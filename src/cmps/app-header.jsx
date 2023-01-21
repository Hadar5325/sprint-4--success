import { Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StayFilter } from './main-filter'
import routes from '../routes'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import hamburger from '../assets/img/hamburger.svg'
import lence from '../assets/img/lence.svg'
import userDfault from '../assets/img/user-default.svg'
import logo from '../assets/img/logo.png'
import i18n from '../assets/img/i18n.svg'

import { Routes, Route, useParams, useLocation } from 'react-router-dom';


export function AppHeader() {

    const stay = useSelector((state) => state.stayModule.stay)
    const location = useLocation();
    const stayId = stay._id
    const roomDetiles = `/rooms`

    const [isFilterShown, setIsFilterShown] = useState(false)
    const [filterType, setFilterType] = useState('location')

    function onShowFilter(type) {
        setIsFilterShown(true)
        setFilterType(type)
    }


    if (location !== roomDetiles) {

        return (
            <header className="app-header flex Rdetiles ">
                <div className="logo-container"><img src={logo} alt="" /></div>
                <div className="filter-container flex align-center">
                    <button ><div className='btn-txt' onClick={() => onShowFilter('location')}>Anywhere</div></button><span className='line'>|</span>
                    <button ><div className='btn-txt' onClick={() => onShowFilter('date')}>Anyweek</div></button><span className='line'>|</span>
                    <button className='guests flex align-center' onClick={() => onShowFilter('capacity')}><div className='btn-txt'>Add guests</div>
                        <div className="search-image img-container" onClick={(ev) => {
                            ev.stopPropagation()
                            onShowFilter('where')
                        }} >
                            <svg className='svg-white' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                <g fill="none">
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
                <div className='flex'>
                    <div className='header-buttons'>
                        <Link className="host-link" to="/hosting">Switch to hosting</Link>
                        <button><div className='i18n img-container'><img src={i18n} alt="" /></div></button>
                    </div>
                    <button className='user-nav flex'>
                        <div className='img-container hamburger'>
                            <img src={hamburger} alt="" />
                        </div >
                        <div className='img-container user'>
                            <img className='user-img' src={userDfault} alt="" />
                        </div>
                    </button>
                    {isFilterShown && <StayFilter onShowFilter={onShowFilter} filterType={filterType} />}

                </div>

            </header>
        )
    } else {
        return <h1>I am a room!</h1>
    }
}
 //     const user = useSelector(storeState => storeState.userModule.user)

    //     async function onLogin(credentials) {
    //         try {
    //             const user = await login(credentials)
    //             showSuccessMsg(`Welcome: ${user.fullname}`)
    //         } catch(err) {
    //             showErrorMsg('Cannot login')
    //         }
    //     }
    //     async function onSignup(credentials) {
    //         try {
    //             const user = await signup(credentials)
    //             showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //         } catch(err) {
    //             showErrorMsg('Cannot signup')
    //         }
    //     }
    //     async function onLogout() {
    //         try {
    //             await logout()
    //             showSuccessMsg(`Bye now`)
    //         } catch(err) {
    //             showErrorMsg('Cannot logout')
    //         }
    //     }

// <nav>
//                 {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
