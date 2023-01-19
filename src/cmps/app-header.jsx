import { Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StayFilter } from '../cmps/stay-filter'
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

    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        capacity: -Infinity,
    })

    const [isFilterShown, setIsFilterShown] = useState(false)

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }


    function onSaveFilter(ev) {
        ev.preventDefault()
        console.log('hi from save filter:')
    }

    function onShowFilter(by) {
        console.log('by at ShowFilter:', by)
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

    const stay = useSelector((state) => state.stayModule.stay)

    const stayId = stay._id

    const location = useLocation();

  

    

    const roomDetiles = `/rooms`


    if (location !== roomDetiles) {
        console.log('work!!')
        return (
            <header className="app-header flex Rdetiles ">
                <div className="logo-container"><img src={logo} alt="" /></div>
                <div className="filter-container flex align-center">
                    <button ><div className='btn-txt'>Anywhere</div></button><span className='line'>|</span>
                    <button ><div className='btn-txt'>Anyweek</div></button><span className='line'>|</span>
                    <button className='guests flex align-center' ><div className='btn-txt'>Add guests</div>
                        <div className="search-image img-container"><img src={lence} alt="" /></div>
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
                            <StayFilter filterBy={filterBy} handleChange={handleChange} onSaveFilter={onSaveFilter}>
                                <button className='loaction-filter'><div className='btn-txt'><div className='title'>where</div><div className='desc'>Search destination</div></div></button>

                            </StayFilter>
                        </div>
                    </button>
                </div>




            </header>
        )
    }
    return (
        <header className="app-header flex ">
            <div className="logo-container"><img src={logo} alt="" /></div>
            <div className="filter-container flex align-center">
                <button ><div className='btn-txt'>Anywhere</div></button><span className='line'>|</span>
                <button ><div className='btn-txt'>Anyweek</div></button><span className='line'>|</span>
                <button className='guests flex align-center' ><div className='btn-txt'>Add guests</div>
                    <div className="search-image img-container">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                            focusable="false" ><g fill="none"></g>
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
                        <StayFilter filterBy={filterBy} handleChange={handleChange} onSaveFilter={onSaveFilter} onShowFilter={onShowFilter} />
                    </div>
                </button>
            </div>




        </header>
    )
}





// <nav>
//                 {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
