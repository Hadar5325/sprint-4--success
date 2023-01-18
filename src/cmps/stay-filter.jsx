import React from 'react'
// import { TextField, Select, MenuItem, Checkbox, FormControlLabel, FormControl, InputLabel } from '@material-ui/core'

export function StayFilter({ handleChange, filterBy }) {

console.log('hi from filter:')

    return (
        <div className="filter-container">

            
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