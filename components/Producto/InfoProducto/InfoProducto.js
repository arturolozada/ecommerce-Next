import React from 'react';
//import ReactPlayer from 'react-player/lazy';
import CarouselScreenShots from '../CarouselScreenShots';

export default function InfoProducto(props) {
    const { producto } = props;
    
    return (
        <div className="info-game">
            {/* <ReactPlayer className="info-game__video" url={producto.video} controls={true} /> */}
            {/* <CarouselScreenShots title={producto.title} producto={producto}/> */}
        </div>
    )
}

