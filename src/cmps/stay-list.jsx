import { StayPreview } from "./stay-preview";
import { Link, NavLink, useParams } from 'react-router-dom'
import data from '../data/stay.json';


import React from 'react';
import { useState } from "react"
import { stayService } from '../services/stay.service.local'
import { useDispatch, useSelector } from 'react-redux'


export function StayList({ stays, onRemoveStay, userwishList }) {
    const currFilterBy = useSelector((state) => state.stayModule.filterBy)

    return <ul className="home-list">
        {
            stays.map(stay => <li key={stay._id}>
                <Link to={`stays/${stay._id}?${stayService.getParams(currFilterBy)}`}>
                    <StayPreview stay={stay} userwishList={userwishList} />
                </Link>

                {/* </Link> */}


                {/* <Link to={`stay/edit/${stay._id}`}> Edit </Link>
                <button onClick={() => onRemoveStay(stay._id)}>Remove</button> */}
            </li>)
        }

    </ul>
}

// slide gallery
// https://www.w3schools.com/howto/howto_js_slideshow.asp

// todo:
// 1. make gellery slide
// 2. fix the gap in grid that overflow to left
// 3. fix images size to be square
// 4. fix the under the price to be covered
// 5. fix the heart to be in grid 
