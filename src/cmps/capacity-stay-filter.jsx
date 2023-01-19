import React, { useEffect, useState } from 'react'

export function CapacityFilter({ handleChange }) {

    const [adultsCount, setAdultsCount] = useState(0)
    const [childrenCount, setChildrenCount] = useState(0)
    const [infantsCount, setInfantsCount] = useState(0)
    const [petsCount, setPetsCount] = useState(0)

    function onSetCount(type, diff) {
        switch (type) {
            case 'adult':
                setAdultsCount(prevCount => prevCount + diff)
                break
            case 'children':
                setChildrenCount(prevCount => prevCount + diff)
                break
            case 'infants':
                setInfantsCount(prevCount => prevCount + diff)
                break
            case 'pets':
                setPetsCount(prevCount => prevCount + diff)
        }
    }

    return (
        <section className="capacity-filter-inputs">
            <div><div className='title'>Adults</div><div className='desc'>Ages 13 or above</div>
                <button   onClick={() => onSetCount('adult', -1)}>-</button><div>{adultsCount}</div>
                <button onClick={() => onSetCount('adult', 1)}>+</button></div>
            <div><div className='title'>Children</div><div className='desc'>Ages 2-12</div>
                <button onClick={() => onSetCount('children', -1)}>-</button><div>{childrenCount}</div>
                <button onClick={() => onSetCount('children', 1)}>+</button></div>
            <div><div className='title'>Infants</div><div className='desc'>Under 2</div>
                <button onClick={() => onSetCount('infants', -1)}>-</button><div>{infantsCount}</div>
                <button onClick={() => onSetCount('infants', 1)}>+</button></div>
            <div><div className='title'>Pets</div><div className='desc'>Bringing a service animal</div>
                <button onClick={() => onSetCount('pets', -1)}>-</button><div>{petsCount}</div>
                <button onClick={() => onSetCount('pets', 1)}>+</button></div>

        </section>
    )
}

// {{adultsCount} ? disabled ={false}: disabled ={true} }