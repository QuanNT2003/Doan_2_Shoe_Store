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
const OrderDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const listItem = [
        { id: 1 }, { id: 2 }
    ]

    return (
        <View className='relative h-full'>
            <ScrollView className='mb-5 m-2' showsVerticalScrollIndicator={false}>
                <View className=' bg-white my-2 rounded-xl '>
                    <View className='bg-emerald-700 p-3 rounded-t-xl mb-2'>
                        <Text className='text-white font-bold text-[18px]'>Đơn hàng đã hoàn thành</Text>
                    </View>
                    <View className='p-3 border-b-[1px] border-y-neutral-200 mb-2'>
                        <TouchableOpacity className='flex flex-row items-center justify-between mb-2' onPress={() => {
                            router.push({ pathname: "(page)/OrderProgress", params: { id: id } })
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
                    <FlatList
                        data={listItem}
                        showsVerticalScrollIndicator={false}
                        className='bg-transparent'
                        renderItem={({ item }) =>
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
                                <View className='flex-row justify-around m-2'>
                                    <TouchableOpacity className='border-[1px] border-green-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => router.push({ pathname: "(page)/Comment" })}>
                                        <Text className='font-bold text-green-600'>Đánh giá</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className='border-[1px] border-red-400 w-[40%] h-[40px] justify-center items-center rounded-md' >
                                        <Text className='font-bold text-red-600'>Hoàn/ đổi hàng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        }
                        nestedScrollEnabled
                        scrollEnabled={false}
                    />


                </View>
                <View className=' bg-white my-2 rounded-xl mb-16'>
                    <View className='flex-row justify-between p-3 mb-2 px-4'>
                        <Text className='text-[16px] font-semibold'>Mã đơn hàng</Text>
                        <Text >HFSDDH46JDARHJ</Text>
                    </View>
                    <View className='flex-row justify-between p-3 mb-2 border-b-[1px] border-y-neutral-200'>
                        <Text>Phương thức thanh toán</Text>
                        <Text>Tài khoản paypal (Chưa thanh toán)</Text>
                    </View>
                    <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                        <Text className='text-[16px] mb-3 px-4 pt-4'>Tổng quan đơn hàng</Text>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='w-[50%]'>Tổng phí </Text>
                            <Text className='w-[10%]'>:</Text>
                            <Text className='w-[40%]'>1.000.000đ</Text>
                        </View>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='w-[50%]'>Vận chuyển </Text>
                            <Text className='w-[10%]'>:</Text>
                            <Text className='w-[40%]'>1.000.000đ</Text>
                        </View>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='w-[50%]'>Phiếu giảm giá đơn hàng </Text>
                            <Text className='w-[10%]'>:</Text>
                            <Text className='w-[40%]'>1.000.000đ</Text>
                        </View>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='w-[50%]'>Phiếu giảm phí vận chuyển</Text>
                            <Text className='w-[10%]'>:</Text>
                            <Text className='w-[40%]'>1.000.000đ</Text>
                        </View>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='w-[50%]'>Phiếu giảm phí than toán</Text>
                            <Text className='w-[10%]'>:</Text>
                            <Text className='w-[40%]'>1.000.000đ</Text>
                        </View>
                        <View className='flex-row items-center px-3 m-1'>
                            <Text className='font-semibold w-[50%]'>Tổng</Text>
                            <Text className='font-semibold w-[10%]'>:</Text>
                            <Text className='font-semibold w-[40%]'>1.000.000đ</Text>
                        </View>
                    </View>
                </View>
            </ScrollView >

            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row justify-center items-center'>
                <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center rounded-xl' >
                    <Text className='font-bold text-white text-[16px]'>Thanh toán ngay</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default OrderDetail