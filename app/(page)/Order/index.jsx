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
import {
    MaterialCommunityIcons,
    FontAwesome5
} from "@expo/vector-icons"
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import ProductOrderItem from "../../components/ProductOrderItem"
import { CheckBox } from '@rneui/themed';
import ChooseVoucher from "../../components/ChooseVoucher"


const Order = () => {

    const [saleResult, setSaleResult] = useState([
        { id: 1, name: 'Từng bừng giảm giá', classify: 'sale', rank: 1 }, { id: 2, name: 'Từng bừng giảm giá', classify: 'sale', rank: 0 }
    ])
    const [shipResult, setShipResult] = useState([
        { id: 1, name: 'Từng bừng giảm giá, giảm ship 100k cho tất cả đơn hàng', classify: 'ship', rank: 2 }, { id: 2, name: 'Từng bừng giảm giá', classify: 'ship', rank: 1 }
    ])
    const [payResult, setPayResult] = useState([
        { id: 1, name: 'Từng bừng giảm giá', classify: 'pay', rank: 3 }, { id: 2, name: 'Từng bừng giảm giá', classify: 'pay', rank: 2 }
    ])

    const [searchResult, setSearchResult] = useState([
        { id: 1 }, { id: 2 }
    ])
    const router = useRouter()
    const { productList } = useLocalSearchParams()
    // NAME
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');
    // email
    const [phone, setPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
        setErrorPhone('')
    };
    const [errorPhone, setErrorPhone] = useState('');
    // address
    const [address, setAddress] = useState('');

    const onChangeAddress = (value) => {
        setAddress(value);
        setErrorAddress('')
    };
    const [errorAddress, setErrorAddress] = useState('');


    //Voucher sale off
    const [saleOff, setSaleOff] = useState('')
    const [idSaleOff, setIdSaleOff] = useState('')

    const onChangeSaleOff = (value, id) => {
        if (value === '') {
            setSaleOff('')
            setIdSaleOff('')
        }
        else {
            setSaleOff(value);
            setIdSaleOff(id)
        }


    };

    const deleteSafeOff = () => {
        setSaleOff('')
        setIdSaleOff('')
    }

    //voucher ship
    const [ship, setShip] = useState('')
    const onChangeShip = (value) => {
        setShip(value)
    };

    const deleteShip = () => {
        setShip('')
    }

    //voucher pay
    const [pay, setPay] = useState('')
    const onChangePay = (value) => {
        setPay(value)
    };

    const deletePay = () => {
        setPay('')
    }

    // Payment Type 
    const [paymentType, setPaymentType] = useState('cod')
    const [selectedIndex, setIndex] = useState(0);
    return (
        <View className='m-0 p-0 relative'>
            <ScrollView >
                <View className='p-4 border-b-[1px] border-y-neutral-200 bg-white my-2'>
                    <Text className='text-[16px] mb-3'>Thông tin nhận hàng</Text>
                    <InputCustom
                        value={phone}
                        error={errorPhone}
                        handleChange={onChangePhone}
                        require
                        title={'Số điện thoại'}
                        placeholder={'Nhập số điện thoại'}
                    />

                    <InputCustom
                        value={email}
                        error={errorEmail}
                        handleChange={onChangeEmail}
                        require
                        title={'Email'}
                        placeholder={'Nhập email'} />

                    <InputCustom
                        title={'Địa chỉ'}
                        placeholder={'Nhập địa chỉ'}
                        require
                        area={true}
                        value={address}
                        error={errorAddress}
                        handleChange={onChangeAddress}

                    />
                </View>
                <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Danh sách sản phẩm</Text>
                    <FlatList
                        data={searchResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ProductOrderItem item={item} voucher={saleOff} id={idSaleOff} setVoucher={onChangeSaleOff} deleteVoucher={deleteSafeOff} listVoucher={saleResult} />}
                        nestedScrollEnabled
                        scrollEnabled={false}
                    />
                </View>

                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Phương thức thanh toán</Text>

                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={selectedIndex === 0}
                            onPress={() => setIndex(0)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            size={18}

                        />
                        <Text>Thanh toán khi nhận hàng</Text>
                    </View>
                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={selectedIndex === 1}
                            onPress={() => setIndex(1)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            size={18}
                        />
                        <Text>Thanh toán paypal</Text>
                    </View>

                    <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                        <ChooseVoucher title={'Voucher giảm phí vận chuyển'} setVoucher={setShip} deleteVoucher={deleteShip} voucher={ship} typeVoucher={'ship'} listVoucher={shipResult} />
                        {
                            selectedIndex !== 0 &&
                            <ChooseVoucher title={'Voucher giảm thanh toán'} setVoucher={setPay} deleteVoucher={deletePay} voucher={pay} typeVoucher={'pay'} listVoucher={payResult} />

                        }

                    </View>
                </View>



                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2 mb-16'>
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
            </ScrollView>
            <View className='bg-white absolute w-[100%] h-[50px] bottom-0 flex-row justify-center'>

                <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center' >
                    <Text className='font-bold text-white text-[16px]'>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Order