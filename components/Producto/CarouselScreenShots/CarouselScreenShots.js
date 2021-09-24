import React, { useState } from 'react';
import { Image, Modal }  from 'semantic-ui-react';
import { BASE_PATH } from '../../../utils/constants';
import Slider from 'react-slick';
import { map } from 'lodash';

const settings = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    sliderToShow: 2,
    pauseOnHover: true,
    swipeToSlider: true,
};

export default function CarouselScreenShots(props) {
    const { title, producto } = props;
    const { screenshots } = producto;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    const openImage = (url) => {
        setUrlImage(url);
        setShowModal(true);
    };
    
    return (
        <>
            <Slider {...settings}>
                {map(screenshots, (screenshot) => (
                    <Image
                        key={screenshot.id}
                        src={screenshot.url}
                        alt={screenshot.name}
                        onClick={() => openImage(screenshot.url)}
                    />
                ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="small" >
                <Image src={urlImage} alt={title} />
            </Modal>
       </>
    );
}
