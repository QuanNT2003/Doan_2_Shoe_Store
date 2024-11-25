import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import { format } from 'date-fns';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ReturnItem = ({ item }) => {
    const router = useRouter()
    return (
        <TouchableOpacity className=' bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200 rounded m-2'
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }}
            onPress={() => {
                router.push({ pathname: "(page)/ReturnDetail", params: { id: item.returnId } })
            }}
        >
            <View className='p-3 flex-row justify-between items-center'>
                <Text>{item?.status === 'receiving' ? format(new Date(item?.updatedAt), 'MMM dd') : format(new Date(item?.createdAt), 'MMM dd')}</Text>
                <Text className='text-[16px]'>
                    Đơn hàng {
                        item?.status === 'receiving' ? 'đang chờ tiếp nhận'
                            : item?.status === 'received' ? 'đã tiếp nhân'
                                : item?.status === 'delivering' ? 'đang giao'
                                    : item?.status === 'delivered' ? 'đã giao'
                                        : 'đã hủy'
                    }
                </Text>
            </View>
            <View>
                <View className='flex-row p-2 m-1'>
                    <View className='w-[25%] m-1'>
                        <Image
                            source={item?.returnItem?.product?.images[0]?.url ? { uri: item?.returnItem?.product?.images[0]?.url } : LogoWithName}
                            className='h-[100px] w-[100px] m-0'
                        />
                    </View>

                    <View className='w-[75%] p-1'>
                        <Text className=' text-[13px] my-1' numberOfLines={2}>
                            {item?.returnItem?.product?.name}
                        </Text>
                        <View className='my-1'>
                            <Text className='text-[12px]'>Size : {item?.returnItem?.version?.size?.name} - Màu sắc : {item?.returnItem?.version?.color?.name}</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.returnItem?.product?.price * (100 - item?.returnItem?.product?.discount) / 100)}</Text></Text>
                            <Text> x {item?.returnItem?.quantity}</Text>
                        </View>
                    </View>
                </View>
                {
                    item?.exchange === true && <View className='flex-row p-2 m-1'>
                        <View className='w-[25%] m-1'>
                            <Image
                                source={item?.exchangeItem?.product?.images[0]?.url ? { uri: item?.exchangeItem?.product?.images[0]?.url } : LogoWithName}
                                className='h-[100px] w-[100px] m-0'
                            />
                        </View>

                        <View className='w-[75%] p-1'>
                            <Text className=' text-[13px] my-1' numberOfLines={2}>
                                {item?.exchangeItem?.product?.name}
                            </Text>
                            <View className='my-1'>
                                <Text className='text-[12px]'>Size : {item?.exchangeItem?.version?.size?.name} - Màu sắc : {item?.exchangeItem?.version?.color?.name}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.exchangeItem?.product?.price * (100 - item?.exchangeItem?.product?.discount) / 100)}</Text></Text>
                                <Text> x {item?.exchangeItem?.quantity}</Text>
                            </View>
                        </View>
                    </View>
                }

            </View>

            <View className='flex-row justify-end mr-6 items-center'>
                <Text className='text-[17px]'><Text className='text-red-500 font-medium'>Tổng hoàn tiền </Text>: {
                    item.exchange === false ?
                        addCommas(item?.returnItem?.total) :
                        addCommas(item?.returnItem?.total - item?.exchangeItem?.total)
                }đ</Text>

            </View>

        </TouchableOpacity>
    );
}

export default ReturnItem