import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    MaterialCommunityIcons,
    FontAwesome5

} from "@expo/vector-icons"
import { format } from 'date-fns';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const OrderItem = ({ item }) => {
    const router = useRouter()
    // console.log('orderItem', item);

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
                router.push({ pathname: "(page)/OrderDetail", params: { id: item?.orderId } })
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
                {
                    item.item.map((item, index) => (
                        <View className='flex-row p-2 m-1' key={index}>
                            <View className='w-[25%] m-1'>
                                <Image
                                    source={item?.product?.images[0]?.url ? { uri: item?.product?.images[0]?.url } : LogoWithName}
                                    className='h-[100px] w-[100px] m-0'
                                />
                            </View>

                            <View className='w-[75%] p-1'>
                                <Text className=' text-[13px] my-1' numberOfLines={2}>
                                    {item?.product?.name}
                                </Text>
                                <View className='my-1'>
                                    <Text className='text-[12px]'>Size : {item?.version?.size?.name} - Màu sắc : {item?.version?.color?.name}</Text>
                                </View>
                                <View className='flex-row justify-between items-center'>
                                    <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.product?.price * (100 - item?.product?.discount) / 100)}</Text></Text>
                                    <Text> x {item?.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                }


            </View>

            <View className='flex-row justify-end mr-6 items-center'>
                <Text className='text-[17px]'><Text className='text-red-500 font-medium'>Tổng đơn hàng </Text>: {addCommas(item.payment.total)}đ</Text>

            </View>

        </TouchableOpacity>
    );
}

export default OrderItem