
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { userService } from "../services/user.service"
import { useSelector } from 'react-redux'

import { loadStays } from '../store/stay.actions'


export function FilterModal({ setIsLoginModalShown, stays, filterBy }) {

    // const stays = useSelector((state) => state.stayModule.stays)
    const filterBy = useSelector((state) => state.stayModule.filterBy)

    const [isListLong, setIsListLong] = useState(false)

 function handleChange(){
    console.log(':',)
 }

    function getRoomsInputs(type) {
        let nums
        for (let i = 1; i <= 8; i++) {
            nums += <div className="number" onClick={() => handleChange('roomsAndBeds', type, i)}>
                {i === 8 ? i + '+' : i}
            </div>
        }
        return <div className={`range ${type}`} key={type}>
            <div className="any-btn">Any</div>{nums}
        </div>
    }

    function getAmenitiesInputs() {
        const amenities = userService.amenities
        if (isListLong) {
            return <div className="amenities-inputs">
                {amenities.map((amenity) => {
                    return <div className="amenity" key={amenity}>
                        <input type="check-box" onChange={() => handleChange('amenities', amenity)} />
                        <span>{amenity}</span>
                    </div>
                })}
            </div>
        }
        else {
            let inputs
            for (let i = 0; i < 6; i++) {
                inputs += <div className="amenity" key={amenities[i]}>
                    <input type="check-box" onChange={() => handleChange('amenities', amenities[i])} />
                    <span>{amenities[i]}</span>
                </div>
            }
            return <div className="amenities-inputs">{inputs}</div>
        }
    }

    return <section className="filter-modal">
        <header>
            <button className='x-btn' onClick={() => setIsLoginModalShown(false)}><svg viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                focusable="false">
                <path d="m6 6 20 20" /><path d="m26 6-20 20" /></svg>
            </button>
            <div className="txt">Filter</div>
        </header>
        <div className="price-filter">
            <h2 className="title">Price range</h2>
            <p>{`The average nightly price is`}</p>
        </div>
        <div className="beds-and-rooms-filter">
            <h2>Rooms and beds</h2>
            <div className="bedrooms">
                <h3>Bedrooms</h3>
                {getRoomsInputs('bedrooms')}
            </div>
            <div className="beds">
                <h3>Beds</h3>
                {getRoomsInputs('beds')}
            </div>
            <div className="bathrooms" >
                <h3>Bathrooms</h3>
                {getRoomsInputs('bathrooms')}</div>
        </div>
        <div className="Amenities-filter">
            <h2>Essentials</h2>
            <div>
                {getAmenitiesInputs()}
                <button onClick={() => setIsListLong((!prev))}>{isListLong ? 'Show less' : 'Show more'}</button>
            </div>

        </div>
        <footer>
            <button onClick={() => handleChange('clean')}>Clear all</button>
            <Link to='/'>{`Show ${stays.length} homes`}</Link>
        </footer>
    </section>

}