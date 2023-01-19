import { GaleryLeft } from './galeryLeft.jsx'
import { GaleryRight} from './galertRight.jsx'


export function Galery({ room }) {



    return <section className="galery">
        <GaleryLeft room={room} />
        <GaleryRight room={room} />


    </section>
}