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
import Carousel from "../../components/Carousel"
import Product_List from "../../components/ProductList"
import { Rating } from 'react-native-ratings';
import CommentItem from "../../components/Comment_Item"
import { useState } from "react"
import SelectVersion from "../../components/SelectVersion"
import example from "../../../assets/images/sample.jpg"
const ProductDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const listItem = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]
    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    const [size, setSize] = useState()
    const [color, setColor] = useState()
    const [quantity, setQuantity] = useState(1)
    const onChanged = (text) => {
        if (Number(text.replace(/[^0-9]/g, '')) > 10) setQuantity(10)
        else setQuantity(Number(text.replace(/[^0-9]/g, '')))

    }
    const sizeList = [
        { id: 1, name: 34 },
        { id: 2, name: 35 },
        { id: 3, name: 36 },
        { id: 4, name: 37 },
    ]
    const colorList = [
        { id: 1, name: 'Nâu' },
        { id: 2, name: 'Lục' },
        { id: 3, name: 'Vàng' },
        { id: 4, name: 'Đỏ' },
    ]
    return (
        <View className='relative'>
            <ScrollView className='mb-5'>
                <Carousel />
                <View className='bg-white my-3'>
                    <Text className='text-[18px] font-semibold ml-2 p-3 border-b-[1px] border-y-neutral-200'>Balo Đi Học Phối Nhiều Màu Sắc Dành Cho Nam Nữ PRAZA - BLS0200</Text>

                    <View className='flex-row items-baseline p-3 mx-2 border-b-[1px] border-y-neutral-200'>
                        <Text className='text-red-700 text-[16px] font-bold'>đ</Text>
                        <Text className='text-red-700 text-[24px] font-bold'>106.000</Text>
                        <Text className='text-[16px] text-slate-400 line-through ml-4'>120.000đ</Text>
                    </View>

                    <View className='ml-2 p-3 border-b-[1px] border-y-neutral-200 flex-row items-center'>
                        <FontAwesome5 name='shipping-fast' size={20} className='mr-3' color='#16a34a' />
                        <Text className='text-[14px] ml-2'>
                            Giao hàng nhanh, đổi trả hàng trong 7 ngày
                        </Text>
                    </View>
                    <View className='ml-2 p-3 border-b-[1px] border-y-neutral-200 flex-row items-center'>
                        <FontAwesome5 name='wallet' size={20} className='mr-3' color='#0891b2' />
                        <Text className='text-[14px] ml-2'>
                            Thanh toán thuận lợi: Mua trước trả sau
                        </Text>
                    </View>

                </View>
                <View className='bg-white my-3'>
                    <View className='flex-row justify-between items-center p-3 mx-2 border-b-[1px] border-y-neutral-200'>
                        <View className='flex items-start'>
                            <Text>Đánh giá sản phẩm</Text>
                            <Rating
                                readonly
                                imageSize={20}
                                startingValue={4}
                            />
                        </View>
                        <View className='flex flex-row items-center'>
                            <Text className='text-[12px] mr-2 text-gray-400'>Xem tất cả </Text>
                            <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                        </View>
                    </View>
                    <View>
                        <CommentItem />
                        <CommentItem />
                    </View>
                </View>
                <View className='bg-white my-3'>
                    <Product_List list={listItem} title={'Sản phẩm tương tự'} />
                </View>
            </ScrollView>

            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row'>
                <View className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center'>
                    <FontAwesome5 name='comment-dots' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Chat ngay</Text>
                </View>
                <TouchableOpacity className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center' onPress={() => setOpenFilter(true)}>
                    <FontAwesome5 name='cart-plus' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-red-600 w-[50%] h-[100%] justify-center items-center' onPress={() => setOpenFilter(true)}>
                    <Text className='font-bold text-white text-[16px]'>Mua ngay</Text>
                </TouchableOpacity>
            </View>
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
                        <Text className='text-lg font-semibold '>Chọn mẫu mã</Text>
                        <TouchableOpacity onPress={() => setCloseFilter()}>
                            <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                        </TouchableOpacity>
                    </View>
                    <FlatList className='p-2'
                        ListHeaderComponent={(
                            <View>
                                <Image
                                    source={example}
                                    className='h-[160px] w-[100%] m-0'
                                />
                                <SelectVersion lists={sizeList} title={'Chọn szie'} onChange={setSize} select={size?.name} />
                                <SelectVersion lists={colorList} title={'Chọn màu sắc'} onChange={setColor} select={color?.name} />
                                <View className='p-2 border-b-[1px] border-y-neutral-200 '>
                                    <Text className='py-2'>Chọn số lượng</Text>
                                    <View className='flex-row items-center w-[50%]'>
                                        <TouchableOpacity className='flex-row justify-center items-center w-[20%] h-[38px] p-1 border-[1px] border-neutral-500 rounded-l-xl' onPress={() => {
                                            if (Number(quantity) > 1) setQuantity(Number(quantity) - 1)
                                        }}>
                                            <FontAwesome6 name='minus' />
                                        </TouchableOpacity>
                                        <TextInput
                                            className='w-[60%] p-1 pl-4 border-[1px] border-neutral-500 text-black'
                                            keyboardType="numeric"
                                            onChangeText={onChanged}
                                            value={String(quantity)}
                                        />
                                        <TouchableOpacity className='flex-row justify-center items-center w-[20%] h-[38px] p-1 border-[1px] border-neutral-500 rounded-r-xl' onPress={() => {
                                            if (Number(quantity) < 10) setQuantity(Number(quantity) + 1)
                                        }}>
                                            <FontAwesome6 name='plus' />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        )}
                        ListFooterComponent={(
                            <View className='mb-20'>
                            </View>
                        )}
                    />
                    <View className='flex-row justify-around items-center absolute bottom-4 right-0 left-0'>
                        <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center rounded-xl'>
                            <Text className='text-white'>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ProductDetail