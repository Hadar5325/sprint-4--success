import aircover from '../../assets/img/aircover.jpg'
import { SleepHere } from './sleepHere.jsx'
import { PlaceOffers } from './placeOffers.jsx'
import checkIn from '../../assets/img/Self-check-in.svg'
import DedicatedWorkspace from '../../assets/img/DedicatedWorkspace.svg'
import parking from '../../assets/img/parking.svg'


export function StayDetailes({ stay, avgRate , setCapacityModal}) {
    console.log(stay.host.pictureUrl)
    return <section className="stayDetailes" onClick={() => setCapacityModal(false)}>

        <div className='shortInfo'>
            <div className='menu'>
                <div className='hostedBy'>{stay.stayType}  hosted by  {stay['host']['fullname']}</div>
                <div className='scendMenu'>
                    <div className='scendMenuFiturs'>{stay.capacity} guests</div>
                    <div className='scendMenuFiturs'>{stay.bedstaysNum} bedstays</div>
                    <div className='scendMenuFiturs'>{stay.bads} bads</div>
                    <div className='scendMenuFiturs'>{stay.bathstays} baths</div>

                </div>
            </div>
            <img className='hostImg' src={stay.host.thumbnailUrl} />


        </div>

        <div className="detaileConteiner">

            <div className="detailesInfo flex">
                <img className="img" src={checkIn} />
                <div className="extraContant">
                    <span>Self check-in</span>
                    <span>Check yourself in with the lockbox</span>
                </div>
            </div>

            <div className="detailesInfo flex">
                <img className="img" src={DedicatedWorkspace} />
                <div className="extraContant">
                    <span>Dedicated workspace</span>
                    <span>A private stay with wifi that’s well-suited for working.</span>
                </div>

            </div>

            <div className="detailesInfo flex">
                <img className="img" src={parking} />
                <div className="extraContant">
                    <span>Free parking on premises</span>
                    <span></span>
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

        <PlaceOffers stay={stay} />

        <SleepHere stay={stay} avgRate={avgRate} />



    </section>
}