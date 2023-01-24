import { useState } from "react"
import { userService } from "../services/user.service"


export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCred => ({ ...prevCred, [field]: value }))
    }

    return (
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
            <button>{isSignup ? 'signup' : 'login'}</button>
        </form>
    )
}