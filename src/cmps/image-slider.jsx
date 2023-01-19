import { useState } from "react"

export function ImageSlider({ slides }) {
    const [currentIdx, setCurrentIdx] = useState(0)
    const sliderStyle = {
        height: '100%',
        position: 'relative'
    }
    const slideStyle = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIdx].url})`
    };

    const leftArraw = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        left: '32px',
        fontSize: '40px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    }
    const rightArraw = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        right: '32px',
        fontSize: '40px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIdx === 0
        const newIndex = isFirstSlide ? 0 : currentIdx - 1
        setCurrentIdx(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIdx === slides.length - 1
        const newIndex = isLastSlide ? slides.length - 1 : currentIdx + 1;
        setCurrentIdx(newIndex)
    }
    const goToSlide= (slideIndex)=>{
        setCurrentIdx(slideIndex)
    }
    const dotContainer = {
        display: 'flex',
        justifyContent: 'center'
    }
    const dot = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '20px'
    }
    return (
        <div style={sliderStyle}>
            <div style={leftArraw} onClick={goToPrevious}> &#x3c; </div>
            <div style={rightArraw} onClick={goToNext}> &#x3e; </div>
            <div style={slideStyle}></div>
            <div style={dotContainer}>
                {slides.map((slide, slideIndex) => {
                    return <div key={slideIndex} style={dot} onClick={()=>goToSlide(slideIndex)}>&#x25CF;</div>
                })}
            </div>
        </div>
    )
}
