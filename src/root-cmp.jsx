import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { RoomDetails } from './pages/room-details'

import { Provider } from 'react-redux'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path='/' element={<HomePage/> } />
                    <Route path='/rooms' element={<RoomDetails/>} />
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


