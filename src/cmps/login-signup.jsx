import { useState, useEffect } from 'react'
import { userService } from '../services/user.service';
import { signup, login } from '../store/user.actions';

export function LoginSignup({ isLoginModalShown, setIsLoginModalShown }) {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [user, setUser] = useState(userService.getLoggedinUser())

    function onChangeLoginStatus(user) {
        setUser(user)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
        setIsLoginModalShown(false)
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCred => ({ ...prevCred, [field]: value }))
    }

    function onLogin(credentials) {
       const currUser= isSignup ? signup(credentials) : login(credentials)
        onChangeLoginStatus(currUser)
    }

    return (
        <section>
            <div className={`full-screen black ${isLoginModalShown ? 'show' : 'hide'}`}
                onClick={() => setIsLoginModalShown(false)}> </div>

            <div className={`login-modal ${isLoginModalShown ? 'show' : 'hide'}`}>
                <header>
                    <button className='x-btn' onClick={() => setIsLoginModalShown(false)}><svg viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                        focusable="false">
                        <path d="m6 6 20 20" /><path d="m26 6-20 20" /></svg>
                    </button>
                    <p className='header-txt'>Log in or sign up</p>
                </header>
                <p className='title'>Welcome to BnBAir</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={credentials.username}
                        placeholder="Enter your username"
                        required
                        autoFocus />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        placeholder="Enter your password"
                        required />
                    {isSignup && <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />}
                    <div>
                        <a href='#' onClick={() => setIsSignUp(!isSignup)}>
                            {isSignup ?
                                'Alreday a memeber ? Login' :
                                'New user ? signup here'
                            }
                        </a>
                    </div>
                    <button>Continue</button>
                </form>
            </div>
        </section>
    )

}

