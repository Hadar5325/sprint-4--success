
import { useState, useRef, createRef, useEffect } from "react"

import React from 'react';



import { ImageSlider } from "./image-slider"
import asset42 from "../assets/img/asset42.webp"
import asset43 from "../assets/img/asset43.webp"
import asset44 from "../assets/img/asset44.webp"
import asset45 from "../assets/img/asset45.webp"
import asset46 from "../assets/img/asset46.webp"

export function StayPreview({ stay, addStayIdToWishList, userWishList }) {

    const [currentIdx, setCurrentIdx] = useState(0)
    // const [isInWishList, setIsInWishList] = useState(false)
    let slides = [];

    useEffect(()=>{
        if(!userWishList.length) return 
        console.log(userWishList)
        const isInWishList = userWishList.find(element => element === stay._id)
        if(isInWishList) refWishList.current.style.fill = 'red'

    }, [userWishList])

    getSlides()
    function getSlides() {
        stay.imgUrls.map(item => {
            slides.push({ url: item })
        })
        if (slides.length > 5)
            slides.splice(0, 5)
    }

    const myRef = useRef(new Array());
    const refLeftArraw = useRef(null)
    const refRightArraw = useRef(null)
    const refWishList = useRef(false)

    myRef.current = slides.map((element, i) => myRef.current[i] ?? createRef())

    useEffect(() => {
        const element = myRef.current;
        element[0].current.style.backgroundColor = '#fff'
        element[0].current.style.opacity = 1
    }, [])

    function goToPrevious(ev) {
        ev.stopPropagation()
        const isFirstSlide = currentIdx === 0
        const newIndex = isFirstSlide ? 0 : currentIdx - 1

        if (newIndex === 0) {
            refLeftArraw.current.style.opacity = 0
            refLeftArraw.current.style.cursor = 'auto'
            refLeftArraw.current.style.pointerEvents = 'none';
        } else {
            refRightArraw.current.style.opacity = 1
            refRightArraw.current.style.cursor = 'pointer'
            refRightArraw.current.style.pointerEvents = 'auto';
        }

        setCurrentIdx(newIndex)

        //changing colors of dots
        changeDotToOriginalClr(currentIdx)
        changeDotColorToChoosen(newIndex)
    }

    function goToNext() {
        const isLastSlide = currentIdx === slides.length - 1
        const newIndex = isLastSlide ? slides.length - 1 : currentIdx + 1;

        if (newIndex === slides.length - 1) {
            refRightArraw.current.style.opacity = 0
            refRightArraw.current.style.cursor = 'auto'
            refRightArraw.current.style.pointerEvents = 'none';
        } else {
            refLeftArraw.current.style.opacity = 1
            refLeftArraw.current.style.cursor = 'pointer'
            refLeftArraw.current.style.pointerEvents = 'auto';
        }

        setCurrentIdx(newIndex)

        //changing colors of dots
        changeDotToOriginalClr(currentIdx)
        changeDotColorToChoosen(newIndex)
    }

    function changeDotToOriginalClr(currentIdx) {
        console.log(currentIdx);
        const element = myRef.current;
        element[currentIdx].current.style.backgroundColor = '#fff'
        element[currentIdx].current.style.opacity = 0.6

    }

    function changeDotColorToChoosen(newIndex) {
        console.log(newIndex);
        const element = myRef.current;
        element[newIndex].current.style.backgroundColor = '#fff'
        element[newIndex].current.style.opacity = 1
    }

    function onAddToWishList(ev) {

        addStayIdToWishList(stay._id)
        refWishList.current.style.fill = 'red'
        // setIsInWishList(true)

        // console.log(userWishList)
        // refWishList.current.style.backgroundColor = "red"
        // className={`isWantToBeAddedWishList ? "red" : "black"`}

    }


    return <article className="stay-preview">
        <div className="image-containter">
            <div className="square">
                <div className="flex-containter" style={{ backgroundImage: `url(${slides[currentIdx].url})` }}>
                    <div className="div-wish-list">
                        <button>
                            <svg ref={refWishList} onClick={(ev) => { onAddToWishList(ev) }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
                            </svg>
                        </button>
                    </div>

                    <div className="div-arraws">

                        <div className="arraw leftArraw" ref={refLeftArraw} onClick={(ev) => goToPrevious(ev)}>
                            <div className="position-arraw">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                                    <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="arraw rightArraw" ref={refRightArraw} onClick={(ev) => goToNext(ev)}>
                            <div className="position-arraw">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                                    <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div className="div-dots">

                        <div className="dotContainer">
                            {slides.map((slide, slideIndex) => {
                                return <div className="dot" ref={myRef.current[slideIndex]} key={slideIndex}>&nbsp;</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-container">
                <div className="container-star"><span className="star">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false">
                        <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
                    </svg>
                </span><span className="star-record">4.83</span></div>
                <div className="stay-heading">{stay.loc.city}, {stay.loc.country}</div>
                <div className="stay-distance">747 kilometeres away</div>
                <div className="stay-valid-dates">Jan 18 - 23</div>
                <div className="stay-price"><span className="currency">&#8362;</span><span>{stay.price}</span> night</div>
            </div >
        </div >

    </article>
}





// import React from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

// export function StayPreview({ stay }) {

//     return <article className="stay-preview">
//         {/* <div className="image-containter">
//             <div className="square"> */}
//                 <Carousel className='carousel'>
//                     <div>
//                         <img src={require("../assets/img/asset46.webp")} />
//                     </div>
//                     <div>
//                         <img src={require("../assets/img/asset47.webp")} />
//                     </div>
//                     <div>
//                         <img src={require("../assets/img/asset48.webp")} />
//                     </div>
//                     <div>
//                         <img src={require("../assets/img/asset49.webp")} />
//                     </div>
//                     <div>
//                         <img src={require("../assets/img/asset50.webp")} />
//                     </div>
//                 </Carousel>
//             {/* </div>
//         </div> */}
//     </article>

//
