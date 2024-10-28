import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    MaterialCommunityIcons,
    FontAwesome5

} from "@expo/vector-icons"
import { CheckBox } from '@rneui/themed';
const OrderItem = ({ item }) => {

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
            }}>
            <View className='p-3 flex-row justify-between items-center'>
                <Text>20/11/2024 11h50'</Text>
                <Text className='text-[16px]'>
                    Đơn hàng đang giao
                </Text>
            </View>
            <View>
                <View className='flex-row p-2 m-1'>
                    <View className='w-[25%] m-1'>
                        <Image
                            source={LogoWithName}
                            className='h-[100px] w-[100px] m-0'
                        />
                    </View>

                    <View className='w-[75%] p-1'>
                        <Text className=' text-[13px] my-1' numberOfLines={2}>
                            Cân điện tử sức khỏe thông minh hình lợn hồng cute, cân tiểu ly mini nhà bếp dùng pin
                        </Text>
                        <View className='my-1'>
                            <Text className='text-[12px]'>Size : 25 - Màu sắc : Đỏ vạch đen</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-[12px]'>đ <Text className='text-[16px]'>500.000</Text></Text>
                            <Text> x 1</Text>
                        </View>
                    </View>
                </View>
                <View className='flex-row p-2 m-1'>
                    <View className='w-[25%] m-1'>
                        <Image
                            source={LogoWithName}
                            className='h-[100px] w-[100px] m-0'
                        />
                    </View>

                    <View className='w-[75%] p-1'>
                        <Text className=' text-[13px] my-1' numberOfLines={2}>
                            Cân điện tử sức khỏe thông minh hình lợn hồng cute, cân tiểu ly mini nhà bếp dùng pin
                        </Text>
                        <View className='my-1'>
                            <Text className='text-[12px]'>Size : 25 - Màu sắc : Đỏ vạch đen</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-[12px]'>đ <Text className='text-[16px]'>500.000</Text></Text>
                            <Text> x 1</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className='flex-row justify-end mr-6 items-center'>
                <Text className='text-[17px]'><Text className='text-red-500 font-medium'>Tổng đơn hàng </Text>: 1.000.000đ</Text>

            </View>

        </TouchableOpacity>
    );
}

export default OrderItem