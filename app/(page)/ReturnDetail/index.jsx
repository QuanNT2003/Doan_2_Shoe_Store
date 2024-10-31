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
const ReturnDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    return (
        <View className='relative h-full'>
            <ScrollView className='mb-5 m-2' showsVerticalScrollIndicator={false}>
                <View className=' bg-white my-2 rounded-xl '>
                    <View className='bg-emerald-700 p-3 rounded-t-xl mb-2'>
                        <Text className='text-white font-bold text-[18px]'>Đơn hàng đã hoàn thành</Text>
                    </View>
                    <View className='p-3 border-b-[1px] border-y-neutral-200 mb-2'>
                        <TouchableOpacity className='flex flex-row items-center justify-between mb-2' onPress={() => {
                            router.push({ pathname: "(page)/ReturnProgress", params: { id: id } })
                        }}>
                            <Text className='text-[16px] font-semibold'>Thông tin vận chuyển</Text>
                            <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                        </TouchableOpacity>
                        <View className='flex-row items-start'>
                            <View className='mt-1'>
                                <FontAwesome5 name='shipping-fast' size={20} />
                            </View>

                            <View className='ml-3'>
                                <Text className=''>Giao hàng thành công</Text>
                                <Text className='text-[12px] text-slate-400'>10-11-2024 16:00</Text>

                            </View>
                        </View>

                    </View>
                    <View className='p-3'>
                        <Text className='text-[16px] font-semibold'>Địa chỉ nhận hàng</Text>
                        <View className='flex-row p-2 items-start'>
                            <View className='mt-1'>
                                <FontAwesome6 name='location-dot' size={20} />
                            </View>

                            <View className='ml-3'>
                                <Text className='text-[16px] font-semibold'>Ngô Trung Quân</Text>
                                <Text>email: ngotrungquan1412@gmail.com, SĐT: 0359546845</Text>
                                <Text>Ktx Khu A, đường Tạ Quang Bửu, Khu A, Phường Đông Hòa, Dĩ An, Bình Dương</Text>
                            </View>
                        </View>
                    </View>
                </View >
                <View className=' bg-white my-2 rounded-xl '>
                    <View className='border-b-[1px] border-y-neutral-200'>
                        <View className='flex-row p-3 '>
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
                    </View>
                </View>
                <View className=' bg-white my-2 rounded-xl mb-16'>
                    <View className='flex-row justify-between p-3 mb-2 px-4'>
                        <Text className='text-[16px] font-semibold '>Mã đơn hàng</Text>
                        <Text >HFSDDH46JDARHJ</Text>
                    </View>
                    <View className='border-b-[1px] border-y-neutral-200 bg-white'>
                        <Text className='text-[16px] mb-3 px-4 pt-4 font-semibold'>Tổng quan đơn hàng</Text>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='font-semibold w-[50%]'>Phí hoàn trả</Text>
                            <Text className='font-semibold w-[10%]'>:</Text>
                            <Text className='font-semibold w-[40%]'>1.000.000đ</Text>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

export default ReturnDetail