import { GaleryLeft } from './galeryLeft.jsx'
import { GaleryRight} from './galertRight.jsx'


export function Galery({ stay ,setCapacityModal}) {


    return <section className="galery" onClick={() => setCapacityModal(false)}>
        <GaleryLeft stay={stay} />
        <GaleryRight stay={stay} />
    </section>
}