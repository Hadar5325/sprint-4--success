import * as React from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { labels } from '../services/stay.service.local'


export function FilterCarousel() {

    const value = 0

    function handleChange(value) {
        console.log('value:', value)
    }

    function getLable(label) {
        return <div className='type-container'>
            <img src={require(`../assets/img/${label}.jpeg`)} alt={label} />
            <p>{label}</p>
        </div>
    }

    return <section>
        <Tabs
            value={value}
            onChange={(value)=>handleChange(value.target)}
            variant="scrollable"
            scrollbuttons="auto"
            // aria-label="scrollable auto tabs example"
        >
            {labels.map((label) => {
                return <Tab key={label} label={getLable(label)} />
            })
            }


        </Tabs>


    </section>

}