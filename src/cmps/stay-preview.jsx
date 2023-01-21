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
    function dots(dots){
        return dots
    }

    return <article className="stay-preview">
        <div className="image-containter">
            <div className="square">
                {/* <div className="containter-slides"> */}
                {/* </div> */}
                {/* <img src={stay.imgUrls[0]} /> */}
                {/* <div className="slider-containter">
                    <ImageSlider slides={allImagesInStay(stay)} />
                </div> */}

                <div className="flex-containter">
                    <div className="div-wish-list">
                        <button>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
                            </svg>
                        </button>
                    </div>
                    {/* <div className="div">
                    </div> */}

                    <div className="slider-containter">
                        <ImageSlider slides={allImagesInStay(stay)}/>
                    </div>

                    <div className="div-dots">
                        dotsssss
                    </div>
                </div>
            </div>

            <div className="info-container">
                <div className="container-star"><span className="star">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false">
                        <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
                    </svg>
                </span><span className="star-record">4.83</span></div>
                <div className="stay-heading">{stay.name}</div>
                <div className="stay-distance">747 kilometeres away</div>
                <div className="stay-valid-dates">Jan 18 - 23</div>
                <div className="stay-price"><span className="currency">&#8362;</span><span>{stay.price}</span> night</div>
            </div >
        </div >
    </article>
}
