import React, { useState } from "react"
import { Image, ImageBackground, Text, TouchableOpacity, View, FlatList, Modal } from "react-native"
import { useRouter } from "expo-router"
import LogoWithName from "../../../assets/images/sample.jpg"
import bg from "../../../assets/images/tag.png"
import {
    MaterialCommunityIcons,
    FontAwesome5

} from "@expo/vector-icons"
import { CheckBox } from '@rneui/themed';
import ChooseVoucherItem from "../ChooseVoucherItem"
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ProductOrderItem = ({
    item,
    voucher,
    id,
    setVoucher,
    deleteVoucher,
    listVoucher
}) => {
    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    const set = (discount) => {
        setVoucher(discount, item.product._id)
    }

    // console.log('voucher sale', item);

    return (
        <View className=' bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200 rounded'
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
            <View className='flex-row p-2 m-1'>
                <View className='w-[25%] m-1'>
                    <Image
                        source={item?.product?.images[0]?.url ? { uri: item?.product?.images[0]?.url } : LogoWithName}
                        className='h-[100px] w-[100px] m-0'
                    />
                </View>

                <View className='w-[75%] p-1'>
                    <Text className=' text-[13px] my-1' numberOfLines={2}>
                        {item?.product?.name}
                    </Text>
                    <View className='my-1'>
                        <Text className='text-[12px]'>Size : {item?.version?.size?.name} - Màu sắc : {item?.version?.color?.name}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.product?.price - item?.product?.price * item?.product?.discount / 100)}</Text></Text>
                        <Text> x {item?.quantity}</Text>
                    </View>
                </View>
            </View>
            {
                voucher === '' ? (
                    <TouchableOpacity className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center' onPress={() => setOpenFilter(true)}>
                        <View className='flex-row justify-center items-center'>
                            <MaterialCommunityIcons name='sale' size={20} color='#dc2626' solid />
                            <Text className='ml-2'>Voucher giảm giá sản phẩm</Text>

                        </View>
                        <View className='flex-row justify-center items-center'>
                            <Text className='mr-2'>Chọn mã</Text>
                            <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                        </View>
                    </TouchableOpacity>
                ) : (<View></View>)
            }
            {
                id === item.product._id ? (
                    <View className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center'>
                        <TouchableOpacity className='flex-row items-center' onPress={() => setOpenFilter(true)}>
                            <MaterialCommunityIcons name='sale' size={20} color='#dc2626' solid />
                            <Text numberOfLines={2} className='text-[12px] ml-2'>{voucher?.name}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity className='' onPress={() => deleteVoucher()}>
                            <FontAwesome5 name='times-circle' size={18} color='#9ca3af' solid />
                        </TouchableOpacity>
                    </View>
                ) : (<View></View>)
            }

            <Modal
                visible={openFilter}
                animationType='slide'
                transparent={true}
                className='bg-white h-full w-full'
                onRequestClose={() => {
                    setCloseFilter()
                }}
            >

                <View className='h-full bg-white relative'>
                    <View className='flex flex-row justify-between items-center bg-slate-200 p-4'>
                        <Text className='text-lg font-semibold '>Chọn mã</Text>
                        <TouchableOpacity onPress={() => setCloseFilter()}>
                            <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={listVoucher.filter(voucher => voucher.discount.apply < (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity)}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ChooseVoucherItem discountCart={item} voucher={voucher} setVoucher={set} />}

                    />
                    <View className='bg-white absolute w-[100%] h-[50px] bottom-1 flex-row justify-center'>

                        <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center rounded-lg' onPress={() => setCloseFilter()} >
                            <Text className='font-bold text-white text-[16px]'>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

export default ProductOrderItem