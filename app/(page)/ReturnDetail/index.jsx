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
import { useState, useEffect } from "react"
import LogoWithName from "../../../assets/images/sample.jpg"
import * as ReturnServices from '../../apiServices/returnServices'
import moment from 'moment';
import { format } from 'date-fns';
import ModalLoading from "../../components/ModalLoading"
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const ReturnDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const now = moment()
    const [loading, setLoading] = useState(false)


    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date())

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            console.log('id', id);

            const result = await ReturnServices.GetDetailReturn(id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                // console.log(result);
                // console.log('item', result.data.item);

                setObj(result.data);
            }
        }

        fetchApi();
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View className='relative h-full'>
            {
                obj !== null && <ScrollView className='mb-5 m-2' showsVerticalScrollIndicator={false}>
                    <View className=' bg-white my-2 rounded-xl '>
                        <View className='bg-emerald-700 p-3 rounded-t-xl mb-2'>
                            <Text className='text-white font-bold text-[18px]'>Đơn hàng {
                                obj?.status === 'receiving' ? 'đang chờ tiếp nhận'
                                    : obj?.status === 'received' ? 'đã tiếp nhân'
                                        : obj?.status === 'delivering' ? 'đang giao'
                                            : obj?.status === 'delivered' ? 'đã giao'
                                                : 'đã hủy'}</Text>
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
                                    <Text className=''>{
                                        obj?.status === 'receiving' ? 'đang chờ tiếp nhận'
                                            : obj?.status === 'received' ? 'đã tiếp nhân'
                                                : obj?.status === 'delivering' ? 'đang giao'
                                                    : obj?.status === 'delivered' ? 'đã giao'
                                                        : 'đã hủy'
                                    }</Text>
                                    <Text className='text-[12px] text-slate-400'>{obj?.status === 'receiving' ? format(new Date(obj?.createdAt), 'dd MMM yyyy - HH:mm') : format(new Date(obj?.createdAt), 'dd MMM yyyy - HH:mm')}</Text>

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
                                    <Text className='text-[16px] font-semibold'>{obj?.user?.name}</Text>
                                    <Text>email: {obj?.email}, SĐT: {obj?.phone}</Text>
                                    <Text>{obj?.address}</Text>
                                </View>
                            </View>
                        </View>
                    </View >
                    <View className=' bg-white my-2 rounded-xl '>
                        <View className='border-b-[1px] border-y-neutral-200'>
                            <Text className='p-5 font-medium'>Sản phẩm trả</Text>
                            <View className='flex-row p-3'>
                                <View className='w-[25%] m-1'>
                                    <Image
                                        source={obj?.returnItem?.product?.images[0]?.url ? { uri: obj?.returnItem?.product?.images[0]?.url } : LogoWithName}
                                        className='h-[100px] w-[100px] m-0'
                                    />
                                </View>

                                <View className='w-[75%] p-1'>
                                    <Text className=' text-[13px] my-1' numberOfLines={2}>
                                        {obj?.returnItem?.product?.name}
                                    </Text>
                                    <View className='my-1'>
                                        <Text className='text-[12px]'>Size : {obj?.returnItem?.version?.size?.name} - Màu sắc : {obj?.returnItem?.version?.color?.name}</Text>
                                    </View>
                                    <View className='flex-row justify-between objs-center'>
                                        <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(obj?.returnItem?.product?.price * (100 - obj?.returnItem?.product?.discount) / 100)}</Text></Text>
                                        <Text> x {obj?.returnItem?.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {
                            obj?.exchange === true &&
                            <View className='border-b-[1px] border-y-neutral-200'>
                                <Text className='p-5 font-medium'>Sản phẩm đổi</Text>
                                <View className='flex-row p-3'>
                                    <View className='w-[25%] m-1'>
                                        <Image
                                            source={obj?.exchangeItem?.product?.images[0]?.url ? { uri: obj?.exchangeItem?.product?.images[0]?.url } : LogoWithName}
                                            className='h-[100px] w-[100px] m-0'
                                        />
                                    </View>

                                    <View className='w-[75%] p-1'>
                                        <Text className=' text-[13px] my-1' numberOfLines={2}>
                                            {obj?.exchangeItem?.product?.name}
                                        </Text>
                                        <View className='my-1'>
                                            <Text className='text-[12px]'>Size : {obj?.exchangeItem?.version?.size?.name} - Màu sắc : {obj?.exchangeItem?.version?.color?.name}</Text>
                                        </View>
                                        <View className='flex-row justify-between objs-center'>
                                            <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(obj?.exchangeItem?.product?.price * (100 - obj?.exchangeItem?.product?.discount) / 100)}</Text></Text>
                                            <Text> x {obj?.exchangeItem?.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                        }
                    </View>
                    <View className=' bg-white my-2 rounded-xl mb-16'>
                        <View className='flex-row justify-between p-3 mb-2 px-4'>
                            <Text className='text-[16px] font-semibold '>Mã đơn hàng</Text>
                            <Text >{obj._id}</Text>
                        </View>
                        <View className='border-b-[1px] border-y-neutral-200 bg-white'>
                            <Text className='text-[16px] mb-3 px-4 pt-4 font-semibold'>Tổng quan đơn hàng</Text>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='font-semibold w-[50%]'>Phí hoàn trả</Text>
                                <Text className='font-semibold w-[10%]'>:</Text>
                                <Text className='font-semibold w-[40%]'>{
                                    obj.exchange === false ?
                                        addCommas(obj?.returnItem?.total) :
                                        addCommas(obj?.returnItem?.total - obj?.exchangeItem?.total)
                                }đ</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView >
            }
            <ModalLoading visible={loading} />
        </View >
    )
}

export default ReturnDetail