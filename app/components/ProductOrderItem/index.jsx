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
const ProductOrderItem = ({ item, voucher, id, setId, deleteId }) => {

    return (
        <View className=' bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200 rounded'
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
            {
                voucher === true ? (
                    <TouchableOpacity className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center' onPress={() => setId(item.id)}>
                        <View className='flex-row justify-center items-center'>
                            <MaterialCommunityIcons name='sale' size={20} color='#dc2626' solid />
                            <Text className='ml-2'>Voucher giảm giá sản phẩm</Text>

                        </View>
                        <View className='flex-row justify-center items-center'>
                            <Text className='mr-2'>Chọn mã</Text>
                            <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                        </View>
                    </TouchableOpacity>
                ) : (<View></View>)
            }
            {
                id === item.id ? (
                    <View className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center'>
                        <View className=''>
                            <Text numberOfLines={2} className='text-[12px]'>Giảm giá mùa xuân, giảm 50% giá trị sản phẩm</Text>

                        </View>
                        <TouchableOpacity className='' onPress={() => deleteId()}>
                            <FontAwesome5 name='times-circle' size={18} color='#9ca3af' solid />
                        </TouchableOpacity>
                    </View>
                ) : (<View></View>)
            }


        </View>
    );
}

export default ProductOrderItem