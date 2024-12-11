import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Modal,
    FlatList,
    TextInput,
    ToastAndroid,
} from "react-native"
import {
    FontAwesome6,
    FontAwesome5
} from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import { CheckBox } from '@rneui/themed';
import LogoWithName from "../../../assets/images/sample.jpg"
import SelectVersion from "../../components/SelectVersion"
import * as VersionServices from '../../apiServices/versionServices'
import * as ReturnServices from '../../apiServices/returnServices'
import * as OrderServices from '../../apiServices/orderServices'
import * as UserServices from '../../apiServices/userServices';
import * as asyncStorage from "../../store/asyncStorage"
import ModalLoading from "../../components/ModalLoading"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const Return = () => {
    const router = useRouter()
    const { item, objOrder } = useLocalSearchParams()
    const [obj, setObj] = useState('');
    const [order, setOrder] = useState('')
    const [day, setDay] = useState(new Date());
    const [loading, setLoading] = useState(false)

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setSize('')
        setColor('')
        setQuantity(1)
        setNewProduct('')
        setOpenFilter(false)

    }

    const confirm = () => {
        setSize('')
        setColor('')
        setQuantity(1)
        setOpenFilter(false)
    }


    const [user, setUser] = useState('')
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
    // reason
    const [reason, setReason] = useState('');
    const onChangeReason = (value) => {
        setReason(value);
        setErrorReason('')
    };
    const [errorReason, setErrorReason] = useState('');
    // reason
    const [bank, setBank] = useState('');
    const onChangeBank = (value) => {
        setBank(value);
        setErrorBank('')
    };
    const [errorBank, setErrorBank] = useState('');
    // Return type
    const [returnType, setReturnType] = useState(false);

    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const onChanged = (text) => {
        if (Number(text.replace(/[^0-9]/g, '')) > 10) setQuantity(10)
        else setQuantity(Number(text.replace(/[^0-9]/g, '')))

    }
    const [sizeList, setSizeList] = useState([])
    const [colorList, setColorList] = useState([])
    const [newProduct, setNewProduct] = useState('')
    const changeColor = (value) => {
        setColor(value)
        // console.log('color', value);
        // setDay(new Date())
        if (size !== '') getVersion(size._id, value._id)
    }

    const changeSize = (value) => {
        setSize(value)
        // console.log('size', value);
        // setDay(new Date())
        if (color !== '') getVersion(value._id, color._id)
    }

    const getVersion = async (sizeId, colorId) => {
        const fetchApi = async () => {
            // setLoading(true)
            let sizeL = []
            let colorL = []
            sizeL.push({ value: sizeId })
            colorL.push({ value: colorId })
            const result = await VersionServices.getAllVersions({
                productId: obj.product.productId,
                size: sizeL,
                color: colorL
            })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                // console.log(result.data[0]);
                if (result.data[0]._id === obj.version._id) {
                    showToastWithGravity('Phiên bản sản phẩm không đổi');
                    setNewProduct('')
                }
                else {
                    setNewProduct({
                        product: obj.product,
                        version: result.data[0],
                        quantity: obj.quantity,
                        total: obj.total
                    })
                    if (result.data[0].inStock < obj.quantity) showToastWithGravity('Số lượng sản phẩm còn dưới ' + obj.quantity);
                }

            }

        }

        fetchApi();
        // setLoading(false)
    }


    useEffect(() => {
        const fetchApi = async () => {
            // setObj(JSON.parse(item))
            setOrder(JSON.parse(objOrder))
            const product = JSON.parse(item);
            setDay(new Date())
            // console.log(item.product.productId);
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
            }

            const resultSize = await VersionServices.getVersionSize(product?.product?.productId)
                .catch((err) => {
                    console.log(err);
                });

            if (resultSize) {

                setSizeList(resultSize.data)

            }
            const resultColor = await VersionServices.getVersionColor(product?.product?.productId)
                .catch((err) => {
                    console.log(err);
                });

            if (resultColor) {

                setColorList(resultColor.data)

            }
        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const submitReturn = () => {
        let newObj = obj;
        newObj['exchange_return'] = true;
        setObj(newObj)

        const fetchApi = async () => {
            setLoading(true)
            const returnObj = {
                user: user,
                note: '',
                address: address,
                phone: phone,
                email: email,
                returnItem: {
                    product: obj.product,
                    version: obj.version,
                    quantity: obj.quantity,
                    total: obj.total
                },
                exchange: returnType,
                exchangeItem: returnType === true ? newProduct : undefined,
                status: 'receiving',
                orderId: order.orderId,
                reason: reason,
                bank: bank
            }

            console.log(returnObj);

            const result = await ReturnServices.CreateReturn(returnObj)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    showToastWithGravity('Có lỗi xảy ra');
                });

            if (result) {
                setLoading(false);
                // console.log(result)
                showToastWithGravity('Đã tạo đơn trả hàng');
                const resultUpdate = await OrderServices.UpdateOrder(order.orderId, order)
                    .catch((err) => {
                        console.log(err);
                    });
                router.replace({ pathname: "(page)/ReturnDetail", params: { id: result.data.returnId } })
            }


        }

        fetchApi();



    }
    useEffect(() => {
        const fetchApi = async () => {
            // setObj(JSON.parse(item))
            const product = JSON.parse(item);
            order?.item?.forEach((item) => {
                if (item.product.productId === product.product.productId) {
                    setObj(item);
                    // console.log(item);

                }
            });


        }
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);
    return (
        <View className='m-0 p-0 relative'>
            {
                obj !== '' && <View>
                    <ScrollView className='mb-5'>
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
                                area
                                value={address}
                                error={errorAddress}
                                handleChange={onChangeAddress}

                            />
                            <InputCustom
                                title={'Lý do đổi/ trả'}
                                placeholder={'Nhập lý do đổi/ trả'}
                                require
                                area
                                value={reason}
                                error={errorReason}
                                handleChange={onChangeReason}

                            />

                            <InputCustom
                                value={bank}
                                error={errorBank}
                                handleChange={onChangeBank}
                                require
                                title={'Tài khoản hoàn trả (ZaloPay/Paypal'}
                                placeholder={'Nhập tài khoản'} />
                        </View>
                        <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2'>
                            <Text className='text-[16px] mb-3 px-4 pt-4'>Loại đơn</Text>

                            <View className='flex-row items-center'>
                                <CheckBox
                                    checked={returnType === false}
                                    onPress={() => setReturnType(false)}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    size={18}

                                />
                                <Text>Trả hàng</Text>
                            </View>
                            <View className='flex-row items-center'>
                                <CheckBox
                                    checked={returnType === true}
                                    onPress={() => setReturnType(true)}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    size={18}
                                />
                                <Text>Đổi hàng</Text>
                            </View>


                        </View>

                        <View className=' border-b-[1px] border-y-neutral-200 bg-white'>
                            <Text className='text-[16px] mb-3 px-4 pt-4'>Danh sách sản phẩm</Text>
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
                                    <View className='flex-row p-3 '>
                                        <View className='w-[25%] m-1'>
                                            <Image
                                                source={obj?.product?.images[0]?.url ? { uri: obj?.product?.images[0]?.url } : LogoWithName}
                                                className='h-[100px] w-[100px] m-0'
                                            />
                                        </View>

                                        <View className='w-[75%] p-1'>
                                            <Text className=' text-[13px] my-1' numberOfLines={2}>
                                                {obj?.product?.name}
                                            </Text>
                                            <View className='my-1'>
                                                <Text className='text-[12px]'>Size : {obj?.version?.size?.name} - Màu sắc : {obj?.version?.color?.name}</Text>
                                            </View>
                                            <View className='flex-row justify-between items-center'>
                                                <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(obj?.product?.price * (100 - obj?.product?.discount) / 100)}</Text></Text>
                                                <Text> x {obj?.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>



                            </View>

                            {
                                returnType === 0 ? (
                                    <View>
                                    </View>
                                ) : (
                                    <View>
                                        {
                                            newProduct === '' ?
                                                (<View className='h-[100px] bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200 rounded justify-center items-center'>
                                                    <TouchableOpacity onPress={() => setOpenFilter(true)} className='p-3 border-dashed border-[1px]'>
                                                        <Text>Chọn sản phẩm</Text>
                                                    </TouchableOpacity>
                                                </View>) : (
                                                    <View className='relative'>
                                                        <TouchableOpacity className='top-2 right-1 absolute z-50' onPress={() => setNewProduct('')}>
                                                            <FontAwesome5 name='times-circle' size={25} className='mr-5' color="red" />
                                                        </TouchableOpacity>
                                                        <Text className='text-[16px] mb-3 px-4 pt-4'>Sản phẩm đổi</Text>
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
                                                                <View className='flex-row p-3 '>
                                                                    <View className='w-[25%] m-1'>
                                                                        <Image
                                                                            source={newProduct?.product?.images[0]?.url ? { uri: newProduct?.product?.images[0]?.url } : LogoWithName}
                                                                            className='h-[100px] w-[100px] m-0'
                                                                        />
                                                                    </View>

                                                                    <View className='w-[75%] p-1'>
                                                                        <Text className=' text-[13px] my-1' numberOfLines={2}>
                                                                            {newProduct?.product?.name}
                                                                        </Text>
                                                                        <View className='my-1'>
                                                                            <Text className='text-[12px]'>Size : {newProduct?.version?.size?.name} - Màu sắc : {newProduct?.version?.color?.name}</Text>
                                                                        </View>
                                                                        <View className='flex-row justify-between items-center'>
                                                                            <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(newProduct?.product?.price * (100 - newProduct?.product?.discount) / 100)}</Text></Text>
                                                                            <Text> x {newProduct?.quantity}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>



                                                        </View>
                                                    </View>
                                                )
                                        }

                                    </View>
                                )


                            }

                        </View>




                        <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2 mb-16 pb-2'>
                            <Text className='text-[16px] mb-3 px-4 pt-4'>Tổng quan đơn hàng</Text>
                            <View className='flex-row items-center px-3 m-1'>
                                <Text className='font-semibold w-[50%]'>Tổng phí</Text>
                                <Text className='font-semibold w-[10%]'>:</Text>
                                <Text className='font-semibold w-[40%]'>{
                                    newProduct === '' ?
                                        addCommas(obj?.total) :
                                        addCommas(obj?.total - newProduct?.total)
                                }đ</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View className='bg-white absolute w-[100%] h-[50px] bottom-0 flex-row justify-center'>

                        <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center' onPress={() => submitReturn()} >
                            <Text className='font-bold text-white text-[16px]'>Xác nhận</Text>
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
                                            source={obj?.product?.images[0]?.url ? { uri: obj?.product?.images[0]?.url } : LogoWithName}
                                            className='h-[160px] w-[100%] m-0'
                                        />
                                        <SelectVersion lists={sizeList} title={'Chọn szie'} onChange={changeSize} select={size?.name} />
                                        <SelectVersion lists={colorList} title={'Chọn màu sắc'} onChange={changeColor} select={color?.name} />
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
                                <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center rounded-xl' onPress={() => confirm()}>
                                    <Text className='text-white'>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>

                </View>
            }
            <ModalLoading visible={loading} />
        </View>

    )
}

export default Return