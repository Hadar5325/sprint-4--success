import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import hamburger from '../assets/img/hamburger.svg'
import lence from '../assets/img/lence.svg'
// import user from '../assets/img/user'
import userDfault from '../assets/img/user-default.svg'

import { Routes, Route, useParams, useLocation } from 'react-router-dom';


export function AppHeader() {
    console.log('hi from header:')
    
    const location = useLocation()

    console.log('pathname', location.pathname)

    if(location !== '/rooms'){
        return <header className='ex'>
            fsdf
        </header>
    }else{

        return (
            <header className="app-header flex" >
    
                <div className='try'>headerrrrrrrrr</div>
                
    
                {/* <div className="logo-container"><h1>LOGO</h1></div>
                <div className="filter-container flex">
                    <button className="">Anywhere</button>|
                    <button className="">Anyweek</button>|
                    <button className>Add guests</button>
                    <div className="search-image"><img src={lence} alt="" /></div>
                </div>
                <div className='header-buttons'>
                    <Link className="host-link" to="/hosting">Switch to hosting</Link>
                    <button>i18n</button>
                </div>
                <button className='user-nav flex'>
                    <img src={hamburger} alt="" />
                    <img className='user-img' src={userDfault} alt="" />
                </button> */}
            </header>
        )

    }
    
}
