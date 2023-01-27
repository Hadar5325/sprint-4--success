import { Link } from 'react-router-dom'
import { Routes, Route, useParams } from 'react-router-dom';
import { orderService } from '../services/order.service.local.js'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service.local.js'

export function Book() {

    const loggedinUser = useSelector((state) => state.userModule.user)
    const stays = useSelector((state) => state.stayModule.stays)

    // const params = new URLSearchParams(window.location.search)
    // const entries = params.entries()

    // const queryObject = Object.fromEntries(entries)

    let { hostId, timeStart, timeEnd, Adulst, kids, Infants, Pets, totalPrice, stay } = useParams()

    const [guests, setguests] = useState([])
    const [order, setOrder] = useState({})
    const [rentStay, setStay] = useState('')

    console.log(hostId)
    useEffect(() => {
        _numOfGuests(Adulst, kids, Infants, Pets)
        newOrder(hostId, totalPrice, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay)


    }, [])
    // useEffect(() => {
    //     newOrder(hostId, totalPrice, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay)
    // }, [])
    // useEffect(() => {
    //     loadStay()
    // }, [])


    function newOrder(HostId, price, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay) {
        alert('a')
        const newOrder = emptyOrder()

        newOrder.hostId = HostId
        // newOrder.buyer = loggedinUser._id
        newOrder.totalPrice = price
        newOrder.startDate = timeStart
        newOrder.endDate = timeEnd
        newOrder.guests = { Adulst, kids, Infants, Pets }
        newOrder.stay = stay
        // order.msgs = []
        newOrder.status = "pending"

        setOrder(newOrder)
    }
    console.log(order.stay)
    async function loadStay() {

        try {
            alert('a')
            const stay = await stayService.getById(order.stay)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }


    function _numOfGuests(Adulst, kids, Infants, Pets) {
        Adulst = Number(Adulst)
        kids = Number(kids)
        Infants = Number(Infants)
        Pets = Number(Pets)

        const adultsNum = Adulst + kids
        let line = adultsNum + 'guest'
        if (Infants > 0) {
            line = line + ', ' + Infants + ' Infants '
        }
        if (Pets > 0) {
            line = line + ', ' + Pets + ' Pets '
        }

        setguests(line)
    }

    function emptyOrder() {
        const order = orderService.getEmptyorder()
        return order
    }

    function saveOrder(event) {
        event.preventDefault()

        orderService.save(order)
    }

    if (loggedinUser) {

        return <section className='book'>

            <div className='RequestTitle'>
                <div className='RequestTitleContant'>
                    <div className='backto'>←</div>
                    <div className='RequestTitleContantTitle'>Request to book</div>
                </div>
            </div>

            <div className='mainBook'>
                <div className='pay'>
                    <div className='YourTrip'>Your trip</div>

                    <div className='YourTripData'>
                        <div className='detail'>
                            <div className='firsDetail'>Dates</div>
                            <div className='secendDetail'>{order.startDate} - {order.endDate}</div>
                        </div>
                        <button className='edit'>Edit</button>
                    </div>

                    <div className='YourTripData'>
                        <div className='detail'>
                            <div className='firsDetail'>Guests</div>
                            <div className='secendDetail'>{guests}</div>
                        </div>
                        <button className='edit'>Edit</button>
                    </div>

                    <div className='required'>
                        <div className='requiredContant'>

                            <div className='requiredTitle'>Required for your trip</div>
                            <div className='break'></div>
                            <div className='message'>Message the Host</div>
                            <div className='messageExp'>Let the Host know why you're traveling and when you'll check in.</div>
                            <div className='host'>
                                <div className='hostDetContant'>
                                    <img className="hostImg" src={''} />
                                    <div className='hostDet'>
                                        <div className='hostName'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='msgDiv'>
                                <textarea className='textarea'></textarea>
                            </div>
                        </div>

                        <div className='confirmed'>
                            <div className='confirmedContant'>
                                <img className="confirmedImg" src={''} />
                                <div className='confirmedTxt'>
                                    <div className='confirmedFirst'>Your reservation won’t be confirmed until the Host accepts your request (within 24 hours).</div>
                                    <div className='confirmedSecend'>You won’t be charged until then.</div>

                                </div>

                            </div>
                        </div>

                        <div className='requestContainer'>
                            <button className='request'>Request to book</button>
                        </div>


                    </div>
                </div>
                <div className='details'>
                    <div className='detailsBox'>
                        <div className='detailsBoxContant'>

                            <div className='boxTitle'>
                                <div className='boxTitleContant'>
                                    <img className='titleImg'></img>
                                    <div className='titles'>
                                        <div className='firstTitle'>Lighthouse</div>
                                        <div className='secendTitle'>Lighthouse Apartment Tajer</div>
                                    </div>
                                </div>
                            </div>

                            <div className='protected'>
                                <div className='protectedContant'>Your booking is protected by AirCover</div>
                            </div>

                            <div className='priceTitleContainer'>
                                <div className='priceTitleContant'>Price details</div>
                            </div>

                            <div className='priceDet'>
                                <div className='priceDetContainer'>
                                    <div className='calc'>₪976.14 x 5 nights</div>
                                    <div className='resolve'>₪4,880.70</div>
                                </div>
                                <div className='priceDetContainer secend'>
                                    <div className='calc'>serviceFee</div>
                                    <div className='resolve'>₪689.06</div>
                                </div>
                                <hr className='breakLine'></hr>
                                <div className='priceDetContainer'>
                                    <div className='totalTitle'>Total (ILS)</div>
                                    <div className='totalFee'>₪5,569.76</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='bookFooter'>dsf</div>

        </section>
    }else{
        console.log('sdfsdf')
    }

}