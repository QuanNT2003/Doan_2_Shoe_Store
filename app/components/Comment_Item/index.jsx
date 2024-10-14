import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, } from "react-native"
import LogoWithName from "../../../assets/images/sample.jpg"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import { Rating } from 'react-native-ratings';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CommentItem = ({ comment }) => {
    return (
        <View className='border-solid border-b-[1px] pb-3 border-y-neutral-200'>
            <View className='flex-row p-2 items-center'>
                <Image
                    source={LogoWithName}
                    className='h-[50px] w-[50px] m-3 rounded-full'
                />
                <View>
                    <Text className='text-[16px] font-bold'>Ngô Trung Quân</Text>
                    <Text>20/10/2024 - 15:00</Text>
                </View>
            </View>
            <View className='flex-row items-center pl-4'>
                <Text>Đánh giá :</Text>
                <Rating
                    readonly
                    imageSize={14}
                    startingValue={4}
                />
            </View>
            <View className='mt-3 pl-4'>
                <Text>Shop thân thiện nhắn tin dthw,giao đủ số lượng đã đặt khẩu trang rẻ dầy lắm cảm thấy tốt shipber củng thân thiên</Text>
                <View className='flex-row'>
                    <Image
                        source={LogoWithName}
                        className='h-[120px] w-[120px] m-1'
                    />
                    <Image
                        source={LogoWithName}
                        className='h-[120px] w-[120px] m-1'
                    />
                    <Image
                        source={LogoWithName}
                        className='h-[120px] w-[120px] m-1'
                    />
                </View>
            </View>
        </View>
    )
}

export default CommentItem
