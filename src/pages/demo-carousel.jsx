import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

export function DemoCarousel(){
    return  <Carousel>
    <div>
        <img src={require("../assets/img/asset46.webp")}/>
    </div>
    <div>
        <img src={require("../assets/img/asset47.webp")} />
    </div>
    <div>
        <img src={require("../assets/img/asset48.webp")} />
    </div>
    <div>
        <img src={require("../assets/img/asset49.webp")} />
    </div>
    <div>
        <img src={require("../assets/img/asset50.webp")} />
    </div>
</Carousel>
}