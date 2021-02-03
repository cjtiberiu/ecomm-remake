import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';

const ImageCarousel = props => {

    const { bigImage, images, number } = props;
    const [currentSlide, setCurrentSlide] = useState(0);

    //style={{ marginRight: '2px', width: '100px', height: '90px', outline: `${image.url === bigImage ? '1px solid lightblue' : ''}`}}
    //Carousel autoplay afterChange={onChange}>

    const onChange = index => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    }
    return (
        <div>
            <Carousel
                selectedItem={currentSlide}
                onChange={onChange}
            >
                {
                    images.map(el => <div><div style={{
                        height: '40vh', 
                        width: '100%', 
                        backgroundImage: `url(${el})`, 
                        backgroundSize: '65%', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}></div></div>)
                }
                
            </Carousel>
        </div>
    )
};

export default ImageCarousel;