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
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import { CheckBox } from '@rneui/themed';
import example from "../../../assets/images/sample.jpg"
import SelectVersion from "../../components/SelectVersion"

const Order = () => {
    const [searchResult, setSearchResult] = useState([
        { id: 1 }, { id: 2 }
    ])
    const router = useRouter()
    const { productList } = useLocalSearchParams()

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

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

    // Return type
    const [returnType, setReturnType] = useState(0);

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

    const [changeProduct, setChangeProduct] = useState('')
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
                        area
                        value={address}
                        error={errorAddress}
                        handleChange={onChangeAddress}

                    />
                </View>
                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Loại đơn</Text>

                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={returnType === 0}
                            onPress={() => setReturnType(0)}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            size={18}

                        />
                        <Text>Trả hàng</Text>
                    </View>
                    <View className='flex-row items-center'>
                        <CheckBox
                            checked={returnType === 1}
                            onPress={() => setReturnType(1)}
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
                            <View className='w-[25%] m-1'>
                                <Image
                                    source={example}
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



                    </View>

                    {
                        returnType === 0 ? (
                            <View>
                            </View>
                        ) : (
                            <View>
                                {
                                    changeProduct === '' ?
                                        (<View className='h-[100px] bg-white border-solid border-b-[1px] pb-3 border-y-neutral-200 rounded justify-center items-center'>
                                            <TouchableOpacity onPress={() => setOpenFilter(true)} className='p-3 border-dashed border-[1px]'>
                                                <Text>Chọn sản phẩm</Text>
                                            </TouchableOpacity>
                                        </View>) : (
                                            <View>
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
                                                        <View className='w-[25%] m-1'>
                                                            <Image
                                                                source={example}
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



                                                </View>
                                            </View>
                                        )
                                }

                            </View>
                        )


                    }

                </View>




                <View className=' border-b-[1px] border-y-neutral-200 bg-white my-2 mb-16'>
                    <Text className='text-[16px] mb-3 px-4 pt-4'>Tổng quan đơn hàng</Text>
                    <View className='flex-row items-center px-3 m-1'>
                        <Text className='font-semibold w-[50%]'>Tổng phí</Text>
                        <Text className='font-semibold w-[10%]'>:</Text>
                        <Text className='font-semibold w-[40%]'>1.000.000đ</Text>
                    </View>
                </View>
            </ScrollView>
            <View className='bg-white absolute w-[100%] h-[50px] bottom-0 flex-row justify-center'>

                <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center' >
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

export default Order