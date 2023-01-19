
import React, { useEffect, useState } from 'react'
import { LocationFilter } from '../cmps/location-stay-filter'
import { DateFilter } from '../cmps/date-stay-filter'
import { CapacityFilter } from '../cmps/capacity-stay-filter'
// import { TextField, Select, MenuItem, Checkbox, FormControlLabel, FormControl, InputLabel } from '@material-ui/core'

export function StayFilter({ filterType }) {
    const [filterToShow, setFilterToShow] = useState(null)
    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        capacity: -Infinity,
    })


    // useEffect(() => {
    //   console.log('filterType:',filterType)
    //    const filter= showFilter(filterType)
    //     setFilter(filter)
    // }, [])

    useEffect(() => {
        console.log('filterType: at use efferct', filterType)
        showFilter(filterType)
    }, [])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        console.log('hi from save filter:')
    }

    function showFilter(type) {
        console.log('type at show filter', type)
        switch (type) {
            case 'location':
                setFilterToShow(<LocationFilter />)
                break
            case 'date':
                setFilterToShow(<DateFilter />)
                break
            case 'capacity':
                setFilterToShow(<CapacityFilter />)
                break
            default:
                setFilterToShow(<LocationFilter />)
        }
    }

    return (
        <div className="filter-btn-container">
            <button className='loaction-btn' onClick={() => showFilter('location')}>
                <div className='btn-txt'><div className='title' >where</div>
                    <div className='desc'>Search destination</div>
                </div>
            </button>
            <button className='checkIn-btn' onClick={() => showFilter('date')}>
                <div className='btn-txt'><div className='title' >Check in</div>
                    <div className='desc'>Add dates</div>
                </div>
            </button>
            <button className='checkOut-btn' onClick={() => showFilter('date')}>
                <div className='btn-txt'><div className='title'>Check out</div>
                    <div className='desc'>Add dates</div>
                </div>
            </button>
            <button className='who-btn' onClick={() => showFilter('capacity')}>
                <div className='btn-txt'>
                    <div className='title'>Who</div>
                    <div className='desc'>Add guests</div>
                </div>
            </button>
            <form onSubmit={onSaveFilter}>
                <button className="search-btn" > <div className="search-image img-container">
                    <span> Search</span> <svg className='svg-white' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                        <g fill="none">
                            <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                        </g>
                    </svg>
                </div>
                </button>
            </form>
            {filterToShow}
        </div>
    )
}

{/* <TextField onChange={handleChange} type="search" label="Search" className="search-input" id="outlined-basic" name="name" />
<TextField onChange={handleChange} type="number" label="Min Price" className="min-price" id="outlined-basic" name="minPrice" />
<TextField onChange={handleChange} type="number" label="Max Price" className="max-price" id="outlined-basic" name="maxPrice" />
<FormControl required className={'form-filter'}>
    <InputLabel id="demo-simple-select-required-label">Filter By</InputLabel>
    <Select
        onChange={handleChange}
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        defaultValue="All"
        name="type"
        value={filterBy.type}
    >
        <MenuItem value="All">
            <em>None</em>
        </MenuItem>
        <MenuItem value="Board game">board games</MenuItem>
        <MenuItem value="Sports">Sports</MenuItem>
        <MenuItem value="Baby">Baby</MenuItem>
    </Select>
</FormControl>
<FormControlLabel
    value="top"
    control={<Checkbox onChange={handleChange} color="primary" name="inStock" />}
    label="In Stock"
    labelPlacement="top"
    className="check-box" */}