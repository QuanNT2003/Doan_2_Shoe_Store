import React from "react"
import { Image, Text, View, TouchableOpacity } from "react-native"
import LogoWithName from "../../../assets/images/sample.jpg"

const ProductTypeItem = ({ item, click }) => {
    return (
        <TouchableOpacity className='border-[1px] border-neutral-200 m-1 p-1 rounded-md' onPress={() => click(item)
        }>
            <Image
                source={
                    item?.images[0]?.url
                        ? { uri: item.images[0].url }
                        : LogoWithName
                }
                className='h-[160px] w-[100%] mb-2'
            />
            <View className='flex-row justify-center items-center mb-3'>
                <Text>{item?.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductTypeItem
