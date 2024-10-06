import React from 'react';
import { View, ToastAndroid, ActivityIndicator } from "react-native"
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const slides = [
        'https://www.nj.com/resizer/v2/EMHUGWLALRFCDLKLEE2SMB3EYM.png?auth=8dadbf8bbda869f99d59fdb4f7eb7ea0807ed0707b91222a5b711569eb544bfa&width=500&quality=90',
        'https://images.summitmedia-digital.com/spotph/images/2023/03/03/80fa5741-ae16-4173-a039-2dbb6847a695-1677825077.jpeg',
        'https://hips.hearstapps.com/hmg-prod/images/nike-sale-2024-66030e2d96520.png?crop=0.500xw:1.00xh;0.251xw,0&resize=640:*'
    ]
    return (
        <View
            className=" mb-3 flex min-h-[200px] flex-1 items-center justify-center"
        >
            {slides === null ? (
                <ActivityIndicator size='large' color='#3A57E8' />
            ) : (
                <SliderBox
                    images={slides}
                    dotColor='#FFFFFF'
                    inactiveDotColor='#F5F5F5'
                    ImageComponentStyle={{ borderRadius: 15, width: "100%" }}
                    autoplay={true}
                    circleLoop
                    autoplayInterval={3000}
                    imageLoadingColor='#3A57E8'
                    onCurrentImagePressed={''}
                />
            )}
        </View>
    )
}

export default Carousel