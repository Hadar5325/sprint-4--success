import { GaleryLeft } from './galeryLeft.jsx'
import { GaleryRight } from './galertRight.jsx'


export function Galery({ stay, setCapacityModal }) {

    const url = stay['imgUrls']


    return <section className="galery" onClick={() => setCapacityModal(false)}>
        <img className='leftGalery' src={url[0]} />
        <div className='midelGalery'>
            <img className="topLeft" src={url[1]} />
            <img className="bottomLeft" src={url[3]} />
        </div>
        <div className='rightGalery'>
            < img className="topRight" src={url[2]} />
            <img className="bottomRight" src={url[4]} />
        </div>



        {/* <GaleryLeft stay={stay} /> */}
        {/* <GaleryRight stay={stay} /> */}
    </section>
}