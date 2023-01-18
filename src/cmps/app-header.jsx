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
import logo from '../assets/img/logo.png'
import i18n from '../assets/img/i18n.svg'

export function AppHeader() {
    console.log('hi from header:')
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

    return (
        <header className="app-header flex  full">
            <div className="logo-container"><img src={logo} alt="" /></div>
            <div className="filter-container flex align-center">
                <button ><div className='txt'>Anywhere</div></button><span className='line'>|</span>
                <button ><div className='txt'>Anyweek</div></button><span className='line'>|</span>
                <button className='guests flex align-center' ><div className='txt'>Add guests</div>
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
                    </div>
                </button>
            </div>




        </header>
    )
}





// <nav>
//                 {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

//                 {user &&
//                     <span className="user-info">
//                         <Link to={`user/${user._id}`}>
//                             {user.imgUrl && <img src={user.imgUrl} />}
//                             {user.fullname}
//                         </Link>
//                         <span className="score">{user.score?.toLocaleString()}</span>
//                         <button onClick={onLogout}>Logout</button>
//                     </span>
//                 }
//                 {!user &&
//                     <section className="user-info">
//                         <LoginSignup onLogin={onLogin} onSignup={onSignup} />
//                     </section>
//                 }
//             </nav>
//             <h1>My App</h1>