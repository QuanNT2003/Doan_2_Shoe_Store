import React from 'react';
import { View, ToastAndroid, ActivityIndicator } from "react-native"
import { SliderBox } from "react-native-image-slider-box";

const Carousel = ({ slides }) => {
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