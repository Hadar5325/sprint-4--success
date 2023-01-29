

export function OrderShow({loggedinUser,pendingNum,myOrders,changeStatus}) {
    console.log(myOrders)

    function numOfGusts(order){
        let num
        num += order.guests.Adults
        num += order.guests.Kids
        num += order.guests.Infants
        num += order.guests.Pets
        return num
    }
    // console.log(myOrders[0])
    return <div className='menegmentContant'>
        <div className='contantTitle'>
            hello {loggedinUser.fullname}! you have {pendingNum} pending orders
        </div>
        <div className='tableHead'>
            <div className='cell guest'>guest</div>
            <div className='cell stay'>stay</div>
            <div className='cell dates'>dates</div>
            <div className='cell price'>Price</div>
            <div className='cell status'>Status</div>
            <div className='cell actions'>Actions</div>

        </div>
    
        <div className='menegmentTable'>
            {
                myOrders.map(order => {
                    console.log(order)
                    return <section className={`tableRow cell ${order.status === 'pending' && 'pendingStatus'}`} key={order._id}>
                        <div className='cell guest'>{order.buyer.fullname}</div>
                        <div className='cell stay'>{order.name}</div>
                        <div className='cell dates'>{order.startDate} - {order.endDate}</div>

                        <div className='cell price'>{order.totalPrice}</div>
                        <div className={`cell status ${order.status}`}>{order.status}</div>

                        <div className='cell actions'>
                            <button className='approveBtn' disabled={(order.status === 'pending') ? false : true} onClick={(event) => changeStatus(event, order._id, 'approve')}>approve</button>
                            <button className='rejectBtn' disabled={(order.status === 'pending') ? false : true} onClick={(event) => changeStatus(event, order._id, 'reject')}>reject</button>
                        </div>
                    </section>
                })
            }
        </div>
    </div>
}