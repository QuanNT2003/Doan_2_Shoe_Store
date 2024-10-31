import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Modal,
    FlatList,
    Alert,
    ToastAndroid,
    TextInput,
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
    FontAwesome5,
    FontAwesome6
} from "@expo/vector-icons"
import { useState } from "react"
import LogoWithName from "../../../assets/images/sample.jpg"
const OrderProgress = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const listItem = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]

    return (
        <View className='h-full'>
            <View className=' bg-white my-2 rounded-xl p-3'>
                <View className='border-b-[1px] border-y-neutral-200 p-2'>
                    <Text className='font-bold text-[18px]'>Mã đơn hàng</Text>
                    <Text>
                        FD35GSSEG
                    </Text>
                </View>
                <FlatList
                    data={listItem}
                    showsVerticalScrollIndicator={false}
                    className='bg-transparent p-1'
                    renderItem={({ item }) =>
                        <View className='flex-row items-center my-2'>
                            <View className='w-[30%]'>
                                <Text className='text-[12px] text-slate-800'>21-10-2024</Text>
                                <Text className='text-[12px] text-slate-800'>15:50</Text>
                            </View>
                            <View className='w-[10%]'>
                                <FontAwesome5 name='circle' solid />
                            </View>
                            <View className='w-[60%]'>
                                <Text className='text-[16px] font-medium'>Đang giao</Text>
                                <Text className='text-slate-800'>Đơn hàng đăng được giao</Text>
                            </View>
                        </View>

                    }

                />
            </View >

        </View >
    )
}

export default OrderProgress