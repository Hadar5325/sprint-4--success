import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
export function DateFilter({ handleChange }) {

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now() + (1000 * 60 * 60 * 24 * 7));

    useEffect(() => {
        const timeStampStart = new Date(startDate).getTime();
        const timeStampEnd = new Date(endDate).getTime();
        console.log('month from stamp', new Date(startDate).toLocaleString('en', { month: 'short' }))
        console.log('day from stamp:', new Date(startDate).getDate())
        handleChange({ name: 'datesRange', value: { timeStampStart, timeStampEnd } })

    }, [startDate, endDate])





    return (
        <section className='date-filter '>
            <span className="title">Choose dates</span>
            <div className="calendar-container flex">
                <>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            console.log('dates at onChange:', dates)
                            const [start, end] = dates;
                            setStartDate(start)
                            setEndDate(end)
                        }}
                        selectsRange
                        inline
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start)
                            setEndDate(end)
                        }}
                        selectsRange
                        inline
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                    // maxDate={addMonths(new Date(), 5)}
                    />
                </>
            </div>
        </section>
    )
}


