import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, } from "react-native"
import ran_out from '../../../assets/images/ran_out.png'
import {
    FontAwesome5,
} from "@expo/vector-icons"
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const Discount_Item = ({ discount, addToCart }) => {
    const [colect, setColect] = useState(false)

    const onClick = () => {
        setColect(true)
        // addToCart(discount)
    }
    return (
        <View className='w-[250px] flex-row h-[110px] m-2 border-[1px] border-slate-300 rounded-xl'
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
            <View className={colect === true ? 'bg-slate-100 w-[30%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                discount.classify === 'sale' ? 'bg-red-500 w-[30%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                    discount.classify === 'ship' ? 'bg-green-500 w-[30%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                        'bg-blue-500 w-[30%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>
                <FontAwesome5 name={discount.classify === 'sale' ? 'shopping-cart' :
                    discount.classify === 'ship' ? 'truck' :
                        'money-bill'} size={30} color={colect === true ? '#64748b' : '#ffffff'} />
                {discount.classify === 'sale' ? <Text className={colect === true ? 'text-slate-500' : 'text-white'}>sale</Text> :
                    discount.classify === 'ship' ? <Text className={colect === true ? 'text-slate-500' : 'text-white'}>ship</Text> :
                        <Text className={colect === true ? 'text-slate-500' : 'text-white'}>payment</Text>}
            </View>
            <View className='bg-white w-[70%] flex flex-col p-2 rounded-xl '>
                {colect === true && <ImageBackground source={ran_out} className='h-[100%] w-[100%] mt-3 flex items-center justify-center absolute right-0 top-0' />}
                {discount.typeDiscount === false ?
                    <Text className={colect === true ? 'text-[12px] text-slate-500 ' :
                        discount.classify === 'sale' ? 'text-[12px] text-red-600 ' :
                            discount.classify === 'ship' ? 'text-[12px] text-green-600' :
                                'text-[12px]  text-blue-600'}>
                        đ {addCommas(discount.value)}
                    </Text> :
                    <Text className={colect === true ? 'text-[16px] text-slate-500 ' :
                        discount.classify === 'sale' ? 'text-[16px] text-red-600 ' :
                            discount.classify === 'ship' ? 'text-[16px] text-green-600' :
                                'text-[16px] text-blue-600'}>
                        {addCommas(discount.value)}% OFF
                    </Text>}
                <Text className={colect === true ? 'text-[13px] text-slate-500 ' :
                    discount.classify === 'sale' ? 'text-[13px] text-red-600 ' :
                        discount.classify === 'ship' ? 'text-[13px] text-green-600' :
                            'text-[13px]  text-blue-600'}>
                    Đơn tối thiểu {addCommas(discount.apply)}đ
                </Text>
                {colect === false &&
                    <View className='justify-center flex-row m-4'>
                        <TouchableOpacity
                            onPress={() => onClick()}
                            className={discount.classify === 'sale' ? 'border-red-400 border-[1px] w-[50%] h-8 bg-white justify-center flex-row items-center' :
                                discount.classify === 'ship' ? 'border-green-400 border-[1px] w-[50%] h-8 bg-white justify-center flex-row items-center' :
                                    'border-blue-400 border-[1px] w-[50%] h-8 bg-white justify-center flex-row items-center'}>
                            <Text className={discount.classify === 'sale' ? 'text-[13px] text-red-600 ' :
                                discount.classify === 'ship' ? 'text-[13px] text-green-600' :
                                    'text-[13px]  text-blue-600'}>
                                Lấy
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>

    )

}


export default Discount_Item

