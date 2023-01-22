
import React, { useEffect, useState } from 'react'
import { LocationFilter } from './location-filter'
import { DateFilter } from './date-filter'
import { CapacityFilter } from './capacity-filter'
import { uptadeFilter } from '../store/actions/stay.actions'
import { useDispatch, useSelector } from 'react-redux'



export function StayFilter({ filterType, isFilterShown, setIsFilterShown }) {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)

    const [filterToShow, setFilterToShow] = useState(null)
    const [filterBy, setFilterBy] = useState(currFilterBy)

    useEffect(() => {
        console.log('filterBy at useeffect at mainfilter:', filterBy)
        uptadeFilter(filterBy)
    }, [filterBy])

    useEffect(() => {
        showFilter(filterType)
    }, [])

    function handleChange({ name: field, value }) {
        console.log('at handle change:', value)
        setFilterBy({ ...filterBy, [field]: value })
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        setIsFilterShown(false)
    }

    function setGuestsCount() {

    }

    function showFilter(type) {
        console.log('type at show filter', type)
        switch (type) {

            case 'date':
                setFilterToShow(<DateFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />)
                break
            case 'capacity':
                setFilterToShow(<CapacityFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />)
                break
            default:
                setFilterToShow(<LocationFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />)
        }
    }

    function setGuestsCount() {
        const { adults, kids, infants, pets, total } = currFilterBy.capacity
        console.log('currFilterBy:',currFilterBy.capacity)
        if (!total) return 'Add guests'
        const adultsNum = adults + kids
        let txt = adultsNum + ' guests'
        if (infants) {
            txt = txt + ', ' + infants + '...'
        }

        return txt
    }


    return (
        <section className={`filter-layout  ${(isFilterShown) ? 'open' : 'close'}`}>
            <div className='filter-container'>
                <div className='location-inputs'>
                    <button className='loaction-btn' onClick={() => showFilter('location')}>
                        <div className='title'>where</div>
                        <input type="text" name="txt" value={filterBy.txt}
                            placeholder={currFilterBy.txt || currFilterBy.region ? currFilterBy.txt || currFilterBy.region : "Search destination"}
                            onChange={(ev) => handleChange(ev.target)} />
                    </button>
                </div><span className='line'></span>
                <button className='checkIn-btn' onClick={() => showFilter('date')}>
                    <div className='btn-txt'><div className='title' >Check in</div>
                        <div className='desc'>Add dates</div>
                    </div>
                </button><span className='line'></span>
                <button className='checkOut-btn' onClick={() => showFilter('date')}>
                    <div className='btn-txt'><div className='title'>Check out</div>
                        <div className='desc'>Add dates</div>
                    </div>
                </button><span className='line'></span>
                <div className='last-input'>
                    <button className='who-btn' onClick={() => showFilter('capacity')}>
                        <div className='btn-txt'>
                            <div className='title'>Who</div>
                            <div className='desc'>{setGuestsCount()}</div>
                        </div>
                    </button>
                    <form onSubmit={onSaveFilter}>
                        <button className="search-btn" >
                            <svg className='svg-white'
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" role="presentation"
                                focusable="false" >
                                <g fill="none">
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </g>
                            </svg>
                            <span> Search</span>
                        </button>
                    </form>
                </div>
                {filterToShow}
            </div>
        </section>
    )
}

