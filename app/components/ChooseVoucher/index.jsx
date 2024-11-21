import React, { useState } from 'react';
import { Image, FlatList, Text, TouchableOpacity, View, Modal } from "react-native"
import LogoWithName from "../../../assets/images/sample.jpg"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import ChooseVoucherItem from '../ChooseVoucherItem';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ChooseVoucher = ({
    voucher,
    title,
    setVoucher,
    deleteVoucher,
    listVoucher,
    typeVoucher
}) => {

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    // console.log('list Voucher', listVoucher);

    return (
        <View>
            {
                voucher === '' ? (
                    <TouchableOpacity className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center' onPress={() => setOpenFilter(true)}>
                        <View className='flex-row justify-center items-center'>
                            {
                                typeVoucher === 'ship' ? <FontAwesome5 name='shipping-fast' size={20} color='#16a34a' /> :
                                    <FontAwesome5 name='wallet' size={20} color='#2563eb' />
                            }

                            <Text className='ml-2 '>{title}</Text>

                        </View>
                        <View className='flex-row justify-center items-center'>
                            <Text className='mr-2'>Chọn mã</Text>
                            <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View className='flex-row justify-between px-3 h-[50px] border-y-neutral-200 border-y-[1px] items-center'>
                        <TouchableOpacity className='flex-row justify-center items-center' onPress={() => setOpenFilter(true)}>
                            {
                                typeVoucher === 'ship' ? <FontAwesome5 name='shipping-fast' size={20} color='#16a34a' /> :
                                    <FontAwesome5 name='wallet' size={20} color='#2563eb' />
                            }

                            <Text numberOfLines={2} className='text-[12px] ml-2 '>{voucher?.name}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity className='' onPress={() => deleteVoucher()}>
                            <FontAwesome5 name='times-circle' size={18} color='#9ca3af' solid />
                        </TouchableOpacity>
                    </View>
                )
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
                        data={listVoucher}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ChooseVoucherItem discountCart={item} voucher={voucher} setVoucher={setVoucher} />}

                    />
                    <View className='bg-white absolute w-[100%] h-[50px] bottom-1 flex-row justify-center'>

                        <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center rounded-lg' onPress={() => setCloseFilter()} >
                            <Text className='font-bold text-white text-[16px]'>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ChooseVoucher
