import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    FontAwesome6,
    FontAwesome5
} from "@expo/vector-icons"
const VoucherItem = ({ discount }) => {
    const router = useRouter()
    return (
        <View className='flex-row h-[120px] m-2 border-[1px] border-slate-300 rounded-xl'
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
        >
            <View className={discount.classify === 'sale' ? 'bg-red-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                discount.classify === 'ship' ? 'bg-green-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                    'bg-blue-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>
                <FontAwesome5 name={discount.classify === 'sale' ? 'shopping-cart' :
                    discount.classify === 'ship' ? 'truck' :
                        'money-bill'} size={38} color='#ffffff' />
                {discount.classify === 'sale' ? <Text className='text-white font-bold text-[16px]'>sale</Text> :
                    discount.classify === 'ship' ? <Text className='text-white font-bold text-[16px]'>ship</Text> :
                        <Text className='text-white font-bold text-[16px]'>payment</Text>}
            </View>
            <View className='w-[75%] p-2 bg-white' >
                <View className='h-[25%]'>
                    {discount.rank === 0 ? <Text className='text-amber-600 font-semibold text-[16px]'>Khách hàng đồng</Text> :
                        discount.rank === 1 ? <Text className='text-[#C0C0C0] font-semibold text-[16px]'>Khách hàng bạc</Text> :
                            discount.rank === 2 ? <Text className='text-[#ffd700] font-semibold text-[16px]'>Khách hàng vàng</Text> :
                                <Text className='text-[#13a7f5] font-semibold text-[16px]'>Khách hàng kim cương</Text>}
                </View>
                <View className='h-[55%]'>
                    <Text numberOfLines={3}>Từng bừng 11/11, giảm giá 5% tất cả sản phẩm, mua sắm ngay</Text>
                </View>
                <View className='flex-row justify-end mr-4 h-[20%]'>
                    <Text className='text-cyan-500'>Xem chi tiết</Text>
                </View>
            </View>
        </View>
    );
}

export default VoucherItem