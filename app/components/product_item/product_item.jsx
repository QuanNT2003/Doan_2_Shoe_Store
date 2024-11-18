import React from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    FontAwesome,
    MaterialIcons
} from "@expo/vector-icons"

// const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const Product_item = ({ item }) => {
    const router = useRouter()
    const product = item || { name: "N/A", productId: "unknown", images: [] };

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
                if (product.productId && product.productId !== "unknown") {
                    router.push({
                        pathname: "(page)/ProductDetail",
                        params: { id: product?.productId },
                    });
                } else {
                    console.warn("Invalid Product ID");
                }
                // if (item?.productId) {
                //     console.log(item?.productId);

                //     router.push({
                //         pathname: "(page)/ProductDetail",
                //         params: { id: item?.productId },
                //     });
                // } else {
                //     console.warn("Item or Product ID is undefined");
                // }
                // router.push({ pathname: "(page)/ProductDetail", params: { id: item.productId } })
            }}
        >
            <View className='text-wrap flex items-center justify-center m-0 relative'>
                <Image
                    source={
                        item?.images[0]?.url
                            ? { uri: item.images[0].url }
                            : LogoWithName
                    }
                    className='h-[160px] w-[100%] m-0'
                />
                <View className='absolute w-[50px] h-[70px] right-0 top-0 ' >
                    <ImageBackground source={bg} className='h-[100%] w-[100%] flex items-center justify-center'>
                        <Text className='text-slate-900'>-{item?.discount}%</Text>
                    </ImageBackground>

                </View>
            </View>
            <Text className='px-3 text-[13px] my-1' numberOfLines={2}>
                {item?.name}
            </Text>
            <View className='flex-row justify-between items-center px-3 my-2'>
                <Text className='w-[60%] text-[15px] text-red-500'>đ {item?.price}</Text>
                <TouchableOpacity className='p-2 bg-red-300 rounded-full'>
                    <FontAwesome name='shopping-cart' size={20} color='#dc2626' />
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    );
}

export default Product_item