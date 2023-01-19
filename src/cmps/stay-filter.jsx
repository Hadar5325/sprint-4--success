import React from 'react'
// import { TextField, Select, MenuItem, Checkbox, FormControlLabel, FormControl, InputLabel } from '@material-ui/core'

export function StayFilter({ handleChange, filterBy,onShowFilter }) {

    console.log('hi from filter:')

    return (
        <div className="filter-container">
            <button className='loaction-btn' onClick={() => onShowFilter('Where')}>
                <div className='btn-txt'><div className='title' >where</div>
                    <div className='desc'>Search destination</div>
                </div>
            </button>
            <button className='checkIn-btn' onClick={() => onShowFilter('checkIn')}>
                <div className='btn-txt'><div className='title' >Check in</div>
                    <div className='desc'>Add dates</div>
                </div>
            </button>
            <button className='checkOut-btn' onClick={() => onShowFilter('checkOut')}>
                <div className='btn-txt'><div className='title'>Check out</div>
                    <div className='desc'>Add dates</div>
                </div>
            </button>
            <button className='who-btn' onClick={() => onShowFilter('who')}>
                <div className='btn-txt'>
                    <div className='title'>Who</div>
                    <div className='desc'>Add guests</div>
                </div>
            </button>
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