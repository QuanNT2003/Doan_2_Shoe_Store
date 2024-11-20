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
import { useState, useEffect } from "react"
import SelectVersion from "../../components/SelectVersion"
import example from "../../../assets/images/sample.jpg"
import * as ProductServices from '../../apiServices/productServices'
import * as UserServices from '../../apiServices/userServices'
import * as VersionServices from '../../apiServices/versionServices'
import * as ShoppingCartServices from '../../apiServices/productCartServices'
import * as asyncStorage from "../../store/asyncStorage"
import { useIsFocused } from "@react-navigation/native"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ProductDetail = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const focus = useIsFocused()

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState(null);
    const [user, setUser] = useState(null)

    const [slides, setSlides] = useState([]);
    const [listRelated, setListRelated] = useState([])
    const [buy, setBuy] = useState(false)
    // const listItem = [
    //     { productId: 1 }, { productId: 2 }, { productId: 3 }, { productId: 4 }, { productId: 5 }, { productId: 6 }
    // ]
    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setSize('')
        setColor('')
        setQuantity(1)
        setVersion(null)
        setInStock(null)
        setOpenFilter(false)

    }

    // Add to cart
    const [sizeList, setSizeList] = useState([])
    const [colorList, setColorList] = useState([])
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [version, setVersion] = useState()
    const [inStock, setInStock] = useState(null)
    const changeColor = (value) => {
        setColor(value)
        // console.log(value);
        if (size !== '') getVersion(size._id, value._id)
    }

    const changeSize = (value) => {
        setSize(value)
        // console.log(value);
        if (color !== '') getVersion(value._id, color._id)
    }
    const getVersion = async (sizeId, colorId) => {
        const fetchApi = async () => {
            setLoading(true)
            let sizeL = []
            let colorL = []
            sizeL.push({ value: sizeId })
            colorL.push({ value: colorId })
            const result = await VersionServices.getAllVersions({
                productId: id,
                size: sizeL,
                color: colorL
            })
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                // console.log(result.data[0]);
                setVersion(result.data[0])
                // if (result.data[0].inStock < quantity) toastContext.notify('warning', 'Số lượng sản phẩm còn dưới ' + quantity);
                // console.log(result.data[0].inStock);
                setInStock(result.data[0].inStock)

            }

        }

        fetchApi();
        setLoading(false)
    }
    const onChanged = (text) => {
        if (Number(text.replace(/[^0-9]/g, '')) > 10) setQuantity(10)
        else setQuantity(Number(text.replace(/[^0-9]/g, '')))

    }

    const addToCart = async () => {
        const fetchApi = async () => {

            // setLoading(true)

            const id = await asyncStorage.getIdAsync()
            const userResult = await UserServices.getUser(id)

            const cartItem = {
                user: userResult.data,
                version: version,
                product: obj,
                quantity: quantity
            }
            const result = await ShoppingCartServices.CreateShoppingCart(cartItem)
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    showToastWithGravity('Có lỗi xảy ra')
                });

            if (result) {
                setLoading(false);
                console.log(result)
                showToastWithGravity('Đã thêm sản phẩm vào giỏ')
            }
        }

        fetchApi();

    }


    const [listBuy, setListBuy] = useState([])

    const wantBuy = async () => {
        setListBuy([])
        listBuy.push({
            quantity: quantity,
            product: obj,
            version: version,
            comment: false,
            exchange_return: false,
            total: quantity * (obj.price - (obj.discount / 100) * obj.price)
        })

        // console.log(listBuy);
        // console.log(listBuy.length)
        router.push({ pathname: "(page)/Order", params: { listBuy: JSON.stringify(listBuy) } })
    }
    const confirm = async () => {
        const login = await asyncStorage.getIsLogin()
        if (login !== 'true') {
            showToastWithGravity("Bạn chưa đăng nhập")

        }
        else {
            if (buy === false) addToCart()
            else wantBuy()
        }
    }
    useEffect(() => {
        const fetchApi = async () => {
            setObj(null)
            setSize('')
            setColor('')
            setQuantity(1)
            setVersion(null)
            setInStock(null)
            setOpenFilter(false)
            const result = await ProductServices.getProduct(id)
                .catch((err) => {
                    console.log(err);
                });

            if (result) {
                // console.log("Detail Product : ", result);
                setObj(result.data);
                const data = await result.data.images.map((cate) => (cate.url));
                setSlides(data)
            }
            const resultSize = await VersionServices.getVersionSize(id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultSize) {

                setSizeList(resultSize.data)

            }
            const resultColor = await VersionServices.getVersionColor(id)
                .catch((err) => {
                    console.log(err);
                });

            if (resultColor) {

                setColorList(resultColor.data)

            }

            const related = await ProductServices.getRelatedProducts(id)
                .catch((err) => {
                    console.log(err);
                });

            if (related) {
                setListRelated(related.data)

            }


        }

        fetchApi();
        // setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focus]);
    return (
        <View className='relative'>
            <ScrollView className='mb-5'>
                <Carousel slides={slides} />
                <View className='bg-white my-3'>
                    <Text className='text-[18px] font-semibold ml-2 p-3 border-b-[1px] border-y-neutral-200'>{obj?.name}</Text>

                    <View className='flex-row items-baseline p-3 mx-2 border-b-[1px] border-y-neutral-200'>
                        <Text className='text-red-700 text-[16px] font-bold'>đ </Text>
                        <Text className='text-red-700 text-[24px] font-bold'>{addCommas(obj === null ? '' : (obj?.price - obj?.price * obj?.discount / 100))}</Text>
                        <Text className='text-[16px] text-slate-400 line-through ml-4'>{addCommas(obj === null ? '' : obj?.price)} đ</Text>
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
                    <Product_List list={listRelated} title={'Sản phẩm tương tự'} />
                </View>
            </ScrollView>

            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row'>
                <View className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center'>
                    <FontAwesome5 name='comment-dots' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Chat ngay</Text>
                </View>
                <TouchableOpacity className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center' onPress={() => {
                    setBuy(false)
                    setOpenFilter(true)
                }}>
                    <FontAwesome5 name='cart-plus' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-red-600 w-[50%] h-[100%] justify-center items-center' onPress={() => {
                    setBuy(true)
                    setOpenFilter(true)
                }}>
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
                                    source={obj?.images[0]?.url ? { uri: obj?.images[0]?.url } : example}
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
                                    {
                                        inStock === null ? <Text>Vui lòng chọn size và color</Text> :
                                            <Text>Còn {inStock} sản phẩm trong kho</Text>
                                    }
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
    )
}

export default ProductDetail