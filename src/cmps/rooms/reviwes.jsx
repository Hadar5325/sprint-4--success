import React, { useEffect, useState } from 'react'


export function Reviwes({ room }) {

    const [avgRate, setAvgRate] = useState(0)
    const [numReviews, setNumReviews] = useState(0)

    useEffect(() => {
        calcRate()
        calcaAvgRate()
        // numReviews()

    },[])


    function calcRate() {
        let sumRates = 0
        const numOfreviews = room['reviews'].length
        room['reviews'].forEach(review => {
            sumRates += review.rate
        })

        const rate = sumRates / numOfreviews
        return Math.floor(rate * 10) / 10;
    }

    const rates = room['statReviews']
    
    function calcaAvgRate() {
        const avg =(rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location)/6
        setAvgRate(Math.floor(avg * 10) / 10)
    }
    

    // function numReviews(){
    //     if(room.reviews.length >1){
    //         setNumReviews(room.reviews.length +' reviews')
    //     }else{
    //         setNumReviews(room.reviews.length +' review')
    //     }
    // }

    if (room.reviews) {
        return <section className="reviwes">
            <div className="reviewTitle">★ {avgRate} ·</div>
            <div className="reviwesRate">

                <div className="cleanliness">
                    <div className="rateTitle">Cleanliness</div>
                    <div className="prograsBar"></div>
                </div>

                <div className="communication">
                    <div className="rateTitle">Communication</div>
                    <div className="prograsBar"></div>
                </div>

                <div className="checkIn">
                    <div className="rateTitle">CheckIn</div>
                    <div className="prograsBar"></div>
                </div>

                <div className="accuracy">
                    <div className="rateTitle">Accuracy</div>
                    <div className="prograsBar"></div>
                </div>

                <div className="location">
                    <div className="rateTitle">Location</div>
                    <div className="prograsBar"></div>
                </div>
                <div className="value">
                    <div className="rateTitle">Value</div>
                    {/* <div className="prograsBar" style={{width:`${present}%`}}>ddds</div> */}
                </div>

            </div>

        </section>
    } else {
        return <section className="reviwesEmpty">
            <div className="">No reviews (yet)</div>
            <div className="">This host has 15 reviews for other places to stay. Show other reviews</div>
        </section>
    }

}