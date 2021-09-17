import React, {useState} from 'react';
import { Image, Modal }  from 'semantic-ui-react';
import { BASE_PATH } from '../../../utils/constants';
import Slider from 'react-slick';
import { map } from 'lodash';

const settings = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    speed: 500,
    sliderToShow: 5,
    swipeToSlider: true,
};

export default function CarouselScreenShots(props) {
    const {title, producto} = props;
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
                        src={`${BASE_PATH}${screenshot.url}`}
                        alt={title.name}
                        onClick={() => openImage(`${BASE_PATH}${screenshot.url}`)}
                    />
                ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="large" >
                <Image src={urlImage} atl={title} />
            </Modal>
       </>
    );
}
