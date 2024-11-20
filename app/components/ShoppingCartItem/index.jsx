import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    FontAwesome6,

} from "@expo/vector-icons"
import { CheckBox } from '@rneui/themed';

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ShoppingCartItem = ({ item, addArray, deleteArray }) => {
    const router = useRouter()
    const [isSelected, setIsSelected] = useState(false)
    const setSelection = () => {
        if (isSelected === true) {
            deleteArray(item.cartId)
        }
        else {
            addArray(item)
        }
        setIsSelected(!isSelected)
    }
    const [quantity, setQuantity] = useState(item?.quantity)
    const onChanged = (text) => {
        if (Number(text.replace(/[^0-9]/g, '')) > 10) setQuantity(10)
        else setQuantity(Number(text.replace(/[^0-9]/g, '')))

    }
    return (
        <View className='flex-row p-2 my-1 bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200'
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
            <View className='w-[10%] flex-row items-center justify-center'>
                <CheckBox
                    checked={isSelected}
                    onPress={setSelection}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                />
            </View>

            <View className='w-[25%]'>
                <Image
                    source={item?.product?.images[0]?.url ? { uri: item?.product?.images[0]?.url } : LogoWithName}
                    className='h-[100px] w-[100px] m-0'
                />
            </View>

            <View className='w-[60%]'>
                <Text className=' text-[13px] my-1' numberOfLines={2}>
                    {item?.product?.name}
                </Text>
                <View className='my-1'>
                    <Text className='text-[12px]'>Size : {item?.version?.size?.name} - Màu sắc : {item?.version?.color?.name} vạch đen</Text>
                </View>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.product?.price)}</Text></Text>
                    <View className='flex-row items-center w-[30%]'>
                        <TouchableOpacity className='flex-row justify-center items-center w-[25%] h-[20px] p-1 border-[1px] border-neutral-500' onPress={() => {
                            if (Number(quantity) > 1) setQuantity(Number(quantity) - 1)
                        }}>
                            <FontAwesome6 name='minus' />
                        </TouchableOpacity>
                        <TextInput
                            className='w-[50%] h-[20px] pl-4 border-[1px] border-neutral-500 text-black'
                            keyboardType="numeric"
                            onChangeText={onChanged}
                            value={String(quantity)}
                        />
                        <TouchableOpacity className='flex-row justify-center items-center w-[25%] h-[20px] p-1 border-[1px] border-neutral-500' onPress={() => {
                            if (Number(quantity) < 10) setQuantity(Number(quantity) + 1)
                        }}>
                            <FontAwesome6 name='plus' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
}

export default ShoppingCartItem