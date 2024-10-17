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
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
    FontAwesome5,
    FontAwesome5Brands,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import Carousel from "../../components/Carousel"
import Product_List from "../../components/ProductList"
import { Rating } from 'react-native-ratings';
import CommentItem from "../../components/Comment_Item"
const ProductDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const listItem = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
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
                <View className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center'>
                    <FontAwesome5 name='cart-plus' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Thêm vào giỏ hàng</Text>
                </View>
                <TouchableOpacity className='bg-red-600 w-[50%] h-[100%] justify-center items-center'>
                    <Text className='font-bold text-white text-[16px]'>Mua ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetail