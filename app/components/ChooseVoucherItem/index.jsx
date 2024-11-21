import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    FontAwesome6,
    FontAwesome5
} from "@expo/vector-icons"
import { CheckBox } from '@rneui/themed';
const ChooseVoucherItem = ({ discountCart, voucher, setVoucher }) => {
    // console.log('item', discountCart);

    const router = useRouter()
    return (
        <View className='flex-row h-[120px] m-2 w-[95%] border-[1px] border-slate-300 rounded-xl'
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
            <View className={discountCart?.discount.classify === 'sale' ? 'bg-red-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                discountCart?.discount.classify === 'ship' ? 'bg-green-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                    'bg-blue-500 w-[25%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>
                <FontAwesome5 name={discountCart?.discount.classify === 'sale' ? 'shopping-cart' :
                    discountCart?.discount.classify === 'ship' ? 'truck' :
                        'money-bill'} size={38} color='#ffffff' />
                {discountCart?.discount.classify === 'sale' ? <Text className='text-white font-bold text-[16px]'>sale</Text> :
                    discountCart?.discount.classify === 'ship' ? <Text className='text-white font-bold text-[16px]'>ship</Text> :
                        <Text className='text-white font-bold text-[16px]'>payment</Text>}
            </View>
            <View className='w-[75%] p-2 bg-white flex-row justify-between' >
                <View className='w-[80%]'>
                    <View className='h-[25%]'>
                        {discountCart?.discount.rank === 0 ? <Text className='text-amber-600 font-semibold text-[16px]'>Khách hàng đồng</Text> :
                            discountCart?.discount.rank === 1 ? <Text className='text-[#C0C0C0] font-semibold text-[16px]'>Khách hàng bạc</Text> :
                                discountCart?.discount.rank === 2 ? <Text className='text-[#ffd700] font-semibold text-[16px]'>Khách hàng vàng</Text> :
                                    <Text className='text-[#13a7f5] font-semibold text-[16px]'>Khách hàng kim cương</Text>}
                    </View>
                    <View className='h-[55%]'>
                        <Text numberOfLines={3}>{discountCart?.discount.name}</Text>
                    </View>
                </View>

                <View className='w-[20%] flex-row justify-center items-center bg-white'>
                    <CheckBox
                        checked={voucher === '' ? false : voucher?._id === discountCart?.discount._id}
                        onPress={() => {
                            if (voucher === '') setVoucher(discountCart)
                            else if (voucher?._id === discountCart?.discount._id) setVoucher('')
                            else setVoucher(discountCart)
                        }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        size={30}

                    />
                </View>
            </View>


        </View>
    );
}

export default ChooseVoucherItem