import { StayPreview } from "./stay-preview";


export function StayList({ stays, onRemoveStay }) {
    return <ul className="home-list">
        {
            stays.map(stay => <li key={stay._id}>
                <StayPreview stay={stay} />
            </li>)
        }
    </ul>
}

// slide gallery
// https://www.w3schools.com/howto/howto_js_slideshow.asp