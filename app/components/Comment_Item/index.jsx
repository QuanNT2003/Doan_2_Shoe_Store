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
import { format } from 'date-fns';
const CommentItem = ({ comment }) => {
    // console.log(comment);

    return (
        <View className='border-solid border-b-[1px] pb-3 border-y-neutral-200 bg-white'>
            <View className='flex-row p-2 items-center'>
                <Image
                    source={comment.user?.images[0]?.url ? { uri: comment.user?.images[0]?.url } : LogoWithName}
                    className='h-[50px] w-[50px] m-3 rounded-full'
                />
                <View>
                    <Text className='text-[16px] font-bold'>{comment?.user?.name}</Text>
                    <Text>{format(new Date(comment?.createdAt), 'dd/MM/yyyy - HH:mm')}</Text>
                </View>
            </View>
            <View className='flex-row items-center pl-4'>
                <Text>Đánh giá :</Text>
                <Rating
                    readonly
                    imageSize={14}
                    startingValue={comment?.rating}
                />
            </View>
            <View className='mt-3 pl-4'>
                <Text>{comment?.note}</Text>
                <View className='flex-row'>
                    {
                        comment?.images.map((item) => (
                            <Image
                                source={{ uri: item?.url }}
                                key={item?.publicId}
                                className='h-[120px] w-[120px] m-1'
                            />
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default CommentItem
