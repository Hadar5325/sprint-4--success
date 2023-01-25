import * as React from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'


export function FilterCarousel() {

    const value=0

    function handleChange(value) {
        console.log('value:', value)
    }

    return <section>
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollbuttons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
        </Tabs>


    </section>

}