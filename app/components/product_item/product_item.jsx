import React from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    FontAwesome,
    MaterialIcons
} from "@expo/vector-icons"
const Product_item = ({ item }) => {
    return (
        <TouchableOpacity
            className='w-[160px] bg-white rounded-lg m-[1%]'
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
                router.push({ pathname: "(page)/ProductDetail/[id]", params: { id: item.id } })
            }}
        >
            <View className='text-wrap flex items-center justify-center m-0 relative'>
                <Image
                    source={LogoWithName}
                    className='h-[160px] w-[100%] m-0'
                />
                <View className='absolute w-[50px] h-[70px] right-0 top-0 ' >
                    <ImageBackground source={bg} className='h-[100%] w-[100%] flex items-center justify-center'>
                        <Text className='text-slate-900'>-10%</Text>
                    </ImageBackground>

                </View>
            </View>
            <Text className='px-3 text-[13px] my-1' numberOfLines={2}>
                Cân điện tử sức khỏe thông minh hình lợn hồng cute, cân tiểu ly mini nhà bếp dùng pin
            </Text>
            <View className='flex-row justify-between items-center px-3 my-2'>
                <Text className='w-[50%] text-[15px] text-red-500'>đ40.000</Text>
                <TouchableOpacity className='p-2 bg-red-300 rounded-full'>
                    <FontAwesome name='shopping-cart' size={20} color='#dc2626' />
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    );
}

export default Product_item