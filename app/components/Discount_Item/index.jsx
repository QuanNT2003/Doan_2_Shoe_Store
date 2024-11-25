import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, ToastAndroid } from "react-native"
import ran_out from '../../../assets/images/ran_out.png'
import {
    FontAwesome5,
} from "@expo/vector-icons"
import * as asyncStorage from "../../store/asyncStorage"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const Discount_Item = ({ discount, addToCart }) => {
    const [colect, setColect] = useState(false)

    const onClick = async () => {
        const login = await asyncStorage.getIsLogin()
        if (login === 'true') {
            await addToCart(discount)
            setColect(true)
        }
        else {
            showToastWithGravity('Bạn chưa đăng nhập')
        }

    }
    return (
        <View className='w-[320px] flex-row h-[110px] m-1 border-[1px] border-slate-300 rounded-lg'
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
            <View className={colect === true ? 'bg-slate-100 w-[35%] flex flex-col justify-center items-center rounded-lg border-dashed border-e-2' :
                discount?.classify === 'sale' ? 'bg-red-500 w-[35%] flex flex-col justify-center items-center rounded-lg border-dashed border-e-2' :
                    discount?.classify === 'ship' ? 'bg-green-500 w-[35%] flex flex-col justify-center items-center rounded-lg border-dashed border-e-2' :
                        'bg-blue-500 w-[35%] flex flex-col justify-center items-center rounded-lg border-dashed border-e-2'}>
                <FontAwesome5 name={discount?.classify === 'sale' ? 'shopping-cart' :
                    discount?.classify === 'ship' ? 'truck' :
                        'money-bill'} size={35} color={colect === true ? '#64748b' : '#ffffff'} />
                {discount?.classify === 'sale' ? <Text className={colect === true ? 'text-slate-500 test-[16px]' : 'text-white test-[16px]'}>sale</Text> :
                    discount?.classify === 'ship' ? <Text className={colect === true ? 'text-slate-500 test-[16px]' : 'text-white test-[16px]'}>ship</Text> :
                        <Text className={colect === true ? 'text-slate-500' : 'text-white test-[16px]'}>payment</Text>}
            </View>
            <View className='bg-white w-[65%] flex flex-col p-2 rounded-lg justify-between'>
                {colect === true && <ImageBackground source={ran_out} className='h-[100%] w-[100%] mt-3 flex items-center justify-center absolute right-0 top-0' />}
                <View>
                    {discount?.rank === 0 ? <Text className='text-amber-600 font-bold text-[14px]'>Khách hàng đồng</Text> :
                        discount?.rank === 1 ? <Text className='text-[#C0C0C0] font-bold text-[14px]'>Khách hàng bạc</Text> :
                            discount?.rank === 2 ? <Text className='text-[#ffd700] font-bold text-[14px]'>Khách hàng vàng</Text> :
                                <Text className='text-[#13a7f5] font-bold text-[14px]'>Khách hàng kim cương</Text>}
                    <Text numberOfLines={3} className={colect === true ? 'text-[13px] text-slate-500 ' :
                        'text-[13px]'}>{discount?.name}</Text>
                </View>

                {colect === false &&
                    <View className='justify-end flex-row'>
                        <TouchableOpacity
                            onPress={() => onClick()}>
                            <Text className='text-[13px] text-cyan-600'>
                                Thu thập
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>

    )

}


export default Discount_Item

