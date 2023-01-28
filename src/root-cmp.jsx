import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { AppHeader } from './cmps/app-header'

import { UserDetails } from './pages/user-details'
import { StayIndex } from './pages/stay-index'
import { StayDetails } from './pages/stay-details'
import { Book } from './pages/book'
import { HostDetails } from './pages/host-detailes'
import {StayMenegment} from './pages/stayMenegment'

import { Provider } from 'react-redux'
import { StayEdit } from './pages/stay-edit';
import { StaysMap } from './pages/stays-map';
import { WishList } from './pages/wish-list';
import { Trip } from './pages/trip';

export function RootCmp() {


    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/' element={<StayIndex />} />
                    
                    <Route path='/wishList' element={<WishList />} />
                    <Route path='/trip' element={<Trip />} />

                    <Route path='/stay/edit' element={<StayEdit />} />
                    <Route path='/stay/edit/:id' element={<StayEdit />} />


                    <Route path='/stay/map' element={<StaysMap />} />

                    <Route path='/stays/:id' element={<StayDetails />} />
                    <Route path='/stays/book/:hostId/:timeStart/:timeEnd/:Adulst/:kids/:Infants/:Pets/:totalPrice/:stay' element={<Book />} />
                    
                    <Route path='/hostManage/:id' element={<StayMenegment />} />

                    <Route path='/hosting' element={<HostDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
        </div>
    )
}


