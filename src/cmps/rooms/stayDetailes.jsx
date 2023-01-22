import aircover from '../../assets/img/aircover.jpg'

export function StayDetailes({ room }) {

    return <section className="stayDetailes">

        <div className='detailesInfo1'>
            <div>{room.name}  hosted by  {room['host']['fullname']}</div>
            <div>{room.capacity} guests.</div>
            <hr className="detailesHr"></hr>
        </div>

        <div className="detaileConteiner">

            <div className="detailesInfo2 flex">
                <div className="img">fd</div>
                <div className="extraContant">
                    <span>Self check-in</span>
                    <span>Check yourself in with the lockbox</span>
                </div>

            </div>

            <div className="detailesInfo3 flex">
                <div className="img">fd</div>
                <div className="extraContant">
                    <span>Self check-in</span>
                    <span>Check yourself in with the lockbox</span>
                </div>

            </div>

            <div className="detailesInfo4 flex">
                <div className="img">fd</div>
                <div className="extraContant">
                    <span>Self check-in</span>
                    <span>Check yourself in with the lockbox</span>
                </div>

            </div>

        </div>



        <div className='airCover'>
            <img className='coverImg' src={aircover}/>
            <div className="coverDescription">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            <div className="LearnMore">Learn more</div>

        </div>

        {/* <div className="aboutThisSpace">
            {room.summary}
        </div> */}

    </section>
}