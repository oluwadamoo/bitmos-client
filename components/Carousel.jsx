import React from 'react'
import { SliderBox } from "react-native-image-slider-box"



export default function Carousel() {
    const images = [

        require('../assets/images/slides/catering-service@catering.png'),
        require('../assets/images/slides/Fashion-and-beauty.png'),
        require('../assets/images/slides/photography-and-videographys.png'),
        require('../assets/images/slides/Services-on.png')
    ]
    return (
        <SliderBox
            images={images}
            sliderBoxHeight={100}
            autoplay
            circleLoop
            dotColor="#fff"
            inactiveDotColor="#90A4AE"
            activeOpacity={1}
            inactiveOpacity={0.5}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                borderWidth: .7,
                borderColor: 'blue'
            }}
        />
    )
}
