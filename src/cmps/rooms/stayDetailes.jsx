import aircover from '../../assets/img/aircover.jpg'
import {SleepHere} from './sleepHere.jsx'


export function StayDetailes({ room, avgRate }) {

    return <section className="stayDetailes">

        <div className='detailesInfo1'>
            <div>{room.name}  hosted by  {room['host']['fullname']}</div>
            <div>{room.capacity} guests.</div>
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
            <div className='coverImgDiv'><img className='coverImg' src={aircover} /></div>
            <div className="coverDescription">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            <div className="LearnMore">Learn more</div>

        </div>

        <div className="aboutThisSpace">
            A breathtaking serene paradise - this magnificent seafront penthouse is an epitome of modern luxury and beauty. The wall-to-wall floor-to-ceiling windows will make you feel like you have left land (and the hassles of your normal life) behind and started walking on water. South-facing balconies with private hot tub and panoramic views of sea, moon on water & sunset. Private BBQ on north patio. Concierge services available. COVID flexibility.
            <div className='ShowMore'>Show more</div>
        </div>

        <SleepHere room={room} avgRate={avgRate}/>

        <div className='placeOffers'>
            <div className='offersTitle'>What this place offers</div>
            <div className='offers'>Public or shared beach access</div>
            <div className='offers'>Kitchen</div>
            <div className='offers'>Wifi</div>

            <button className='showAll'>Show all 49 amenities</button>

        </div>

    </section>
}