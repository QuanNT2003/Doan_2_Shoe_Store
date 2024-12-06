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
    Linking
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
    FontAwesome5,
    FontAwesome6
} from "@expo/vector-icons"
import { useState, useEffect } from "react"
import * as OrderServices from '../../apiServices/orderServices'
import * as ZaloServices from '../../apiServices/zalopayServices'
import { format } from 'date-fns';
import { WebView } from 'react-native-webview';
import LogoWithName from "../../../assets/images/sample.jpg"
import moment from 'moment';
import { useIsFocused } from "@react-navigation/native"
import ModalLoading from "../../components/ModalLoading"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const OrderDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const now = moment()
    const focus = useIsFocused()
    const [loading, setLoading] = useState(false)


    const [obj, setObj] = useState(null);
    const [day, setDay] = useState(new Date())
    const [paymentUrl, setPaymentUrl] = useState('')

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            console.log('id', id);

            const result = await OrderServices.getOrder(id)
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
    }, [focus]);

    const cancel = () => {
        setLoading(true);
        const fetchApi = async () => {
            const newObj = {
                ...obj,
                status: 'cancelled'
            }


            const result = await OrderServices.UpdateOrder(obj.orderId, newObj)
                .catch((err) => {
                    // console.log(err);
                    setLoading(false);
                    showToastWithGravity('Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                setDay(new Date());
                showToastWithGravity('Đã hủy đơn thành công');
            }
        }

        fetchApi();
    }

    const payment = () => {
        setLoading(true);
        const fetchApi = async () => {

            const result = await ZaloServices.ZaloPay(obj)
                .catch((err) => {
                    // console.log(err);
                    setLoading(false);
                    showToastWithGravity('Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                setDay(new Date());
                // showToastWithGravity('Đã hủy đơn thành công');
                // console.log(result);
                // setPaymentUrl(result?.order_url)
                //router.push({ pathname: "(page)/PaymentPage", params: { paymentUrl: result?.order_url } })
                await Linking.openURL(result?.order_url);
            }
        }

        fetchApi();
    }
    return (
        <View className='relative h-full'>
            {
                obj !== null &&
                <ScrollView className='mb-5 m-2' showsVerticalScrollIndicator={false}>
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
                        <FlatList
                            data={obj?.item}
                            showsVerticalScrollIndicator={false}
                            className='bg-transparent'
                            renderItem={({ item }) =>
                                <View className='border-b-[1px] border-y-neutral-200'>
                                    <View className='flex-row p-3 '>
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
                                                <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(item?.product?.price * (100 - item?.product?.discount) / 100)}</Text></Text>
                                                <Text> x {item?.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        obj?.status === "delivered" && (<View className='flex-row justify-around m-2'>
                                            {
                                                item?.comment === false && <TouchableOpacity className='border-[1px] border-green-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => router.push({ pathname: "(page)/Comment" })}>
                                                    <Text className='font-bold text-green-600'>Đánh giá</Text>
                                                </TouchableOpacity>
                                            }
                                            {
                                                (item?.exchange_return === false && now.diff(obj?.updatedAt, 'days') < 7) && <TouchableOpacity className='border-[1px] border-red-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => router.push({ pathname: "(page)/Return", params: { objOrder: JSON.stringify(obj), item: JSON.stringify(item) } })}>
                                                    <Text className='font-bold text-red-600'>Hoàn đổi hàng</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>)
                                    }
                                </View>

                            }
                            nestedScrollEnabled
                            scrollEnabled={false}
                        />


                    </View>
                    <View className=' bg-white my-2 rounded-xl mb-16'>
                        <View className='flex-row justify-between p-3 mb-2 px-4'>
                            <Text className='text-[16px] font-semibold'>Mã đơn hàng</Text>
                            <Text >{obj?._id}</Text>
                        </View>
                        <View className=' p-3 mb-2 px-4'>
                            <Text className='text-[16px] font-semibold'>Phương thức thanh toán</Text>
                            <View className='flex-row justify-between py-3 mb-2 border-b-[1px] border-y-neutral-200'>
                                <Text>{
                                    obj?.payment?.paymentType === 'cod' ? 'Thanh toán khi nhận hàng'
                                        : obj?.payment?.paymentType === 'vnpay' ? 'Chuyển khoản VNPay'
                                            : 'Chuyển khoản Paypal'
                                } ({obj?.payment?.remain === 0 ? 'Đã thanh toán' : 'Chưa thanh toán'})</Text>
                            </View>
                        </View>

                        <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                            <Text className='text-[16px] mb-3 px-4 pt-4'>Tổng quan đơn hàng</Text>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='w-[50%]'>Tổng phí </Text>
                                <Text className='w-[10%]'>:</Text>
                                <Text className='w-[40%]'>{addCommas(obj?.payment?.subTotal)}đ</Text>
                            </View>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='w-[50%]'>Vận chuyển </Text>
                                <Text className='w-[10%]'>:</Text>
                                <Text className='w-[40%]'>{addCommas(obj?.ship?.shipCost)}đ</Text>
                            </View>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='w-[50%]'>Phiếu giảm giá đơn hàng </Text>
                                <Text className='w-[10%]'>:</Text>
                                <Text className='w-[40%]'>{addCommas(obj?.saleOff?.totalSaleOff)}đ</Text>
                            </View>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='w-[50%]'>Phiếu giảm phí vận chuyển</Text>
                                <Text className='w-[10%]'>:</Text>
                                <Text className='w-[40%]'>{addCommas(obj?.ship?.shipCost - obj?.ship?.shipTotal)}đ</Text>
                            </View>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='w-[50%]'>Phiếu giảm phí than toán</Text>
                                <Text className='w-[10%]'>:</Text>
                                <Text className='w-[40%]'>{addCommas(obj?.payment?.paymentTotal)}đ</Text>
                            </View>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='font-semibold w-[50%]'>Tổng</Text>
                                <Text className='font-semibold w-[10%]'>:</Text>
                                <Text className='font-semibold w-[40%]'>{addCommas(obj?.payment?.total)}đ</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView >
            }


            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row justify-around items-center'>
                {
                    obj?.paymentPending === false &&
                    <TouchableOpacity className='bg-blue-600 w-[40%] h-[80%] justify-center items-center rounded-xl p-2' onPress={() => payment()}>
                        <Text className='font-bold text-white text-[16px]'>Thanh toán ngay</Text>
                    </TouchableOpacity>
                }
                {
                    obj?.status !== "delivered" &&
                    <TouchableOpacity className='bg-red-600 w-[40%] h-[80%] justify-center items-center rounded-xl p-2' onPress={() => cancel()}>
                        <Text className='font-bold text-white text-[16px]'>Hủy đơn hàng</Text>
                    </TouchableOpacity>
                }
            </View>
            <ModalLoading visible={loading} />
        </View >
    )
}

export default OrderDetail