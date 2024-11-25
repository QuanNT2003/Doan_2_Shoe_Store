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
import { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import ProductOrderItem from "../../components/ProductOrderItem"
import ModalLoading from "../../components/ModalLoading"
import { CheckBox } from '@rneui/themed';
import ChooseVoucher from "../../components/ChooseVoucher"
import * as PromotionCartServices from '../../apiServices/promotionCartServices'
import * as OrderServices from '../../apiServices/orderServices'
import * as asyncStorage from "../../store/asyncStorage"
import * as UserServices from '../../apiServices/userServices';
import * as ShoppingCartServices from '../../apiServices/productCartServices'
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const Order = () => {

    const router = useRouter()
    // const { listBuy } = useLocalSearchParams()

    // console.log('list buy :', listBuy);
    const local = useLocalSearchParams()
    const [listBuy, setListBuy] = useState([])
    const [loading, setLoading] = useState(false)
    //USER
    const [user, setUser] = useState()
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

    //list Voucher
    const [listShip, setListShip] = useState([])
    const [listSale, setListSale] = useState([])
    const [listPay, setListPay] = useState([])

    //Voucher sale off
    const [voucherSale, setVoucherSale] = useState('')
    const [idSaleOff, setIdSaleOff] = useState('')

    const onChangeSaleOff = (value, id) => {
        console.log('voucher sale', value);

        setVoucherSale(value.discount)
        setIdSaleOff(id)

        let cost = 0
        listBuy.map((item, index) => {
            if (item.product._id === id)
                cost += (item.product.price - (item.product.discount / 100) * item.product.price) * item.quantity

        })
        // console.log(cost)
        if (value?.discount?.typeDiscount === true) cost = cost * value?.discount?.value / 100
        else cost = value.discount.value

        setCostSale(cost)



    };

    const deleteSafeOff = () => {
        setVoucherSale('')
        setIdSaleOff('')
        setCostSale(0)
    }

    //voucher ship

    const [voucherShip, setVoucherShip] = useState('')

    const onChangeShip = (value) => {
        // console.log('voucher ship', value);
        setVoucherShip(value.discount)

        let cost = 0
        if (value?.discount?.typeDiscount === true) cost = ship * value?.discount?.value / 100
        else cost = value?.discount?.value

        setCostShip(cost)
    };

    const deleteShip = () => {
        setVoucherShip('')

        setCostShip(0)
    }

    //voucher pay
    const [voucherPayment, setVoucherPayment] = useState('')
    const onChangePay = (value) => {
        // console.log('voucher pay', value);

        setVoucherPayment(value.discount)

        let cost = 0
        if (value?.discount?.typeDiscount === true) cost = (subTotal + ship - costSale - costPay - costShip) * value?.discount?.value / 100
        else cost = value?.discount?.value

        setCostPay(cost)
    };

    const deletePay = () => {
        setVoucherPayment('')

        setCostPay(0)

    }

    // Payment Type 
    const [paymentType, setPaymentType] = useState('cod')
    const [selectedIndex, setIndex] = useState(0);

    // Cost
    const [subTotal, setSubTotal] = useState(0)
    const [ship, setShip] = useState(0)
    const [costShip, setCostShip] = useState(0)
    const [costSale, setCostSale] = useState(0)
    const [costPay, setCostPay] = useState(0)
    const [total, setTotal] = useState(0)


    const deleteList = async () => {
        listBuy.map(async (item) => {
            const result = await ShoppingCartServices.deleteCart(item.id)
        })

    };
    useEffect(() => {
        if (local.listBuy) {
            try {
                const parsedList = JSON.parse(local.listBuy); // Parse chuỗi JSON thành mảng
                setListBuy(Array.isArray(parsedList) ? parsedList : []); // Gán nếu là mảng, nếu không thì gán mảng rỗng
            } catch (error) {
                console.error('Error parsing local.listBuy:', error);
                setListBuy([]); // Nếu lỗi, gán mảng rỗng
            }
        } else {
            setListBuy([]); // Nếu không có dữ liệu, gán mảng rỗng
        }
    }, [local.listBuy]);

    useEffect(() => {
        const fetchApi = async () => {
            let newSubTotal = 0
            const parsedList = JSON.parse(local.listBuy);
            parsedList.map(item => {
                newSubTotal += item.total
            })
            const login = await asyncStorage.getIsLogin()
            // setIsLogin(login)
            if (login === 'true') {
                const id = await asyncStorage.getIdAsync()
                // console.log("id", id);

                const result = await UserServices.getUser(id)

                setUser(result.data)
                setAddress(result.data.address || '')
                setEmail(result.data.email)
                setPhone(result.data.phone)

                const resultVoucher = await PromotionCartServices.getAllCarts({ user: result.data._id })
                    .catch((err) => {
                        console.log(err);
                    });

                if (resultVoucher) {
                    // console.log(resultVoucher);
                    setListPay(resultVoucher.pay)
                    setListSale(resultVoucher.sale)
                    setListShip(resultVoucher.ship)
                }

            }

            setSubTotal(newSubTotal)
            setShip(100000)
            setTotal(newSubTotal + 100000)

            // console.log(local.shoppingCart);

        }

        fetchApi();



    }, []);

    const submit = async () => {
        if (email === '') {
            setErrorEmail('Không được để trống')
        }
        else if (phone === '') {
            setErrorPhone('Không được để trống')
        }
        else if (address === '') {
            setErrorAddress('Không được để trống')
        }
        else {
            const fetchApi = async () => {
                setLoading(true)
                const obj = {
                    user: user,
                    note: '',
                    address: address,
                    phone: phone,
                    email: email,
                    item: listBuy,
                    saleOff: {
                        voucherSaleOff: voucherSale === '' ? undefined : voucherSale,
                        totalSaleOff: costSale
                    },
                    ship: {
                        shipCost: ship,
                        voucherShip: voucherShip === '' ? undefined : voucherShip,
                        shipTotal: ship - costShip
                    },
                    payment: {
                        subTotal: subTotal + ship - costSale - costShip,
                        voucherPayment: voucherPayment === '' ? undefined : voucherPayment,
                        paymentTotal: costPay,
                        total: subTotal + ship - costSale - costShip - costPay,
                        paymentType: paymentType,
                        paid: 0,
                        remain: subTotal + ship - costSale - costShip - costPay
                    },
                    status: 'receiving'
                }

                console.log(obj)
                const result = await OrderServices.CreateOrder(obj)
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        showToastWithGravity('Có lỗi xảy ra');
                    });

                if (result) {
                    setLoading(false);
                    console.log(result)
                    if (local.shoppingCart === 'true') deleteList();

                    showToastWithGravity('Đã đặt hàng');
                    // navigate('/order_colection/detail/' + result.data.orderId);
                    router.replace({ pathname: "(page)/OrderDetail", params: { id: result.data.orderId } })
                }


            }

            fetchApi();
        }
    }
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
                        data={listBuy}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ProductOrderItem item={item} voucher={voucherSale} id={idSaleOff} setVoucher={onChangeSaleOff} deleteVoucher={deleteSafeOff} listVoucher={listSale} />}
                        nestedScrollEnabled
                        scrollEnabled={false}
                    />
                </View>

                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Phương thức thanh toán</Text>

                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={selectedIndex === 0}
                            onPress={() => {
                                setIndex(0)
                                setPaymentType('cod')
                            }}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            size={18}

                        />
                        <Text>Thanh toán khi nhận hàng</Text>
                    </View>
                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={selectedIndex === 1}
                            onPress={() => {
                                setIndex(1)
                                setPaymentType('paypal')
                            }}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            size={18}
                        />
                        <Text>Thanh toán paypal</Text>
                    </View>

                    <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                        <ChooseVoucher title={'Voucher giảm phí vận chuyển'} setVoucher={onChangeShip} deleteVoucher={deleteShip} voucher={voucherShip} typeVoucher={'ship'} listVoucher={listShip} />
                        {
                            selectedIndex !== 0 &&
                            <ChooseVoucher title={'Voucher giảm thanh toán'} setVoucher={onChangePay} deleteVoucher={deletePay} voucher={voucherPayment} typeVoucher={'pay'} listVoucher={listPay} />

                        }

                    </View>
                </View>



                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2 mb-16'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Tổng quan đơn hàng</Text>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='w-[50%]'>Tổng phí </Text>
                        <Text className='w-[10%]'>:</Text>
                        <Text className='w-[40%]'>{addCommas(subTotal)}đ</Text>
                    </View>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='w-[50%]'>Vận chuyển </Text>
                        <Text className='w-[10%]'>:</Text>
                        <Text className='w-[40%]'>{addCommas(ship)}đ</Text>
                    </View>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='w-[50%]'>Phiếu giảm giá đơn hàng </Text>
                        <Text className='w-[10%]'>:</Text>
                        <Text className='w-[40%]'>- {addCommas(costSale)}đ</Text>
                    </View>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='w-[50%]'>Phiếu giảm phí vận chuyển</Text>
                        <Text className='w-[10%]'>:</Text>
                        <Text className='w-[40%]'>- {addCommas(costShip)}đ</Text>
                    </View>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='w-[50%]'>Phiếu giảm phí thanh toán</Text>
                        <Text className='w-[10%]'>:</Text>
                        <Text className='w-[40%]'>- {addCommas(costPay)}đ</Text>
                    </View>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='font-semibold w-[50%]'>Tổng</Text>
                        <Text className='font-semibold w-[10%]'>:</Text>
                        <Text className='font-semibold w-[40%]'>{addCommas(subTotal + ship - costPay - costSale - costShip)}đ</Text>
                    </View>
                </View>
            </ScrollView>
            <ModalLoading visible={loading} />
            <View className='bg-white absolute w-[100%] h-[50px] bottom-0 flex-row justify-center'>

                <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center' onPress={() => submit()}>
                    <Text className='font-bold text-white text-[16px]'>Đặt hàng</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Order