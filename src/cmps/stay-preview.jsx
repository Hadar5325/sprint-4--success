import { ImageSlider } from "./image-slider"
import logourl from "./images-dogs/dog2.jfif"
import dog3 from "./images-dogs/dog3.jfif"
export function StayPreview({ stay }) {

    function allImagesInStay(stay) {
        // TODO:FIX!!!!!!!!
        let imageUrl = stay.imgUrls[0]
        let slides = [
            {
                url: logourl, title: 'view'
            },
            {
                url: imageUrl, title: '2'
            },
            {
                url: dog3, title: '3'
            },
        ]
        return slides
    }
    return <article className="stay-preview">
        <div className="image-containter">
            <div className="square">
                {/* <div className="containter-slides"> */}
                {/* </div> */}
                {/* <img src={stay.imgUrls[0]} /> */}
                <div className="slider-containter">
                    <ImageSlider slides={allImagesInStay(stay)} />
                </div>
                <div className="flex-containter">
                    <div className="div-wish-list">
                        <button>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
                            </svg>
                        </button>
                    </div>
                    <div className="div"></div>
                    <div className="div"></div>
                </div>
            </div>

            {/* <div className="containter-slides">
                <ImageSlider slides={allImagesInStay(stay)} />
            </div> */}
            <div className="info-container">
                <div className="stay-heading">{stay.name}</div>
                <div className="stay-distance">747 kilometeres away</div>
                <div className="stay-valid-dates">Jan 18 - 23</div>
                <div className="stay-price"><span className="currency">&#8362;</span><span>{stay.price}</span> night</div>
            </div >
        </div >
    </article>
}
