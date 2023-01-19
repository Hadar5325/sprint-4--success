import React, { useEffect, useState } from 'react'
import { uptadeFilter } from '../store/actions/stay.actions'

export function CapacityFilter({ handleChange }) {

    // const [adultsCount, setAdultsCount] = useState(0)
    // const [childrenCount, setChildrenCount] = useState(0)
    // const [infantsCount, setInfantsCount] = useState(0)
    // const [petsCount, setPetsCount] = useState(0)
    const [filterBy, SetfilterByCapacity] = useState({
        capacity: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0,
            total: 0
        }
    })
    // const [IsDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        uptadeFilter(filterBy)
    }, [filterBy])

    function onSetCount(type, diff) {
        SetfilterByCapacity(prevFilter => {
            prevFilter.capacity[type] = prevFilter.capacity[type] + diff
            prevFilter.capacity.total = prevFilter.capacity.total + diff
            return ({ ...prevFilter })
        })
    }

    const { pets, adults, infants, children } = filterBy.capacity
    return (
        <section className="capacity-filter-inputs">
            <div><div className='title'>Adults</div><div className='desc'>Ages 13 or above</div>
                <button disabled={adults ? false : true} onClick={() => onSetCount('adults', -1)}>-</button>
                <div>{adults}</div>
                <button onClick={() => onSetCount('adults', 1)}>+</button></div>
            <div><div className='title'>Children</div><div className='desc'>Ages 2-12</div>
                <button disabled={children ? false : true} onClick={() => onSetCount('children', -1)}>-</button>
                <div>{children}</div>
                <button onClick={() => onSetCount('children', 1)}>+</button></div>
            <div><div className='title'>Infants</div><div className='desc'>Under 2</div>
                <button disabled={infants ? false : true} onClick={() => onSetCount('infants', -1)}>-</button>
                <div>{infants}</div>
                <button onClick={() => onSetCount('infants', 1)}>+</button></div>
            <div><div className='title'>Pets</div><div className='desc'>Bringing a service animal</div>
                <button disabled={pets ? false : true} onClick={() => onSetCount('pets', -1)}>-</button>
                <div>{pets}</div>
                <button onClick={() => onSetCount('pets', 1)}>+</button></div>

        </section>
    )
}

// {{adultsCount} ? disabled ={false}: disabled ={true} }