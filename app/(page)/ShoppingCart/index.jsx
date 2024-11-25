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
    FontAwesome5,
} from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import ShoppingCartItem from "../../components/ShoppingCartItem"
import * as ShoppingCartServices from '../../apiServices/productCartServices'
import * as UserServices from '../../apiServices/userServices';
import * as asyncStorage from "../../store/asyncStorage"
import { useIsFocused } from "@react-navigation/native"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const ShoppingCart = () => {
    const router = useRouter()
    const focus = useIsFocused()

    const [obj, setObj] = useState(null);
    const [list, setList] = useState([])

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    const [total, setTotal] = useState(0)

    const [dataChoose, setDataChoose] = useState([])
    const AddArray = (item) => {
        setDataChoose((prevDataChoose) => [
            ...prevDataChoose,
            item
        ]);


        setTotal(total + item.quantity * item.product.price)
    }

    const DeleteArray = (id) => {
        setDataChoose(dataChoose.filter(item => item.cartId !== id));

        setTotal(0)
        dataChoose.map((item) => {
            setTotal(total - item.quantity * item.product.price)
        })
    }


    const deleteList = () => {
        const fetchApi = () => {
            dataChoose.map(async (item) => {
                // setLoading(true)
                // console.log(item);

                const result = await ShoppingCartServices.deleteCart(item._id)
                    .catch((err) => {
                        console.log(err);
                        // setLoading(false)
                    });

                if (result) {
                    console.log(result);
                    getList()
                    // setLoading(false)
                }
            })

        }
        fetchApi();
    }
    const getList = async () => {
        const fetchApi = async () => {

            setList([])
            setDataChoose([])
            // setLoading(true)
            const id = await asyncStorage.getIdAsync()
            const userResult = await UserServices.getUser(id)
            const result = await ShoppingCartServices.getAllCarts({
                user: userResult.data._id
            })
                .catch((err) => {
                    console.log(err);
                    // setLoading(false)
                });

            if (result) {
                // console.log(result);
                result.data.map((item) => {
                    const obj = {
                        _id: item._id,
                        product: item.product,
                        quantity: item.quantity,
                        version: item.version,
                        choose: false
                    }
                    setList(arr => [...arr, obj]);
                })
                // setLoading(false)
                setTotal(0)
            }

        }
        fetchApi();
    }

    useEffect(() => {
        const fetchApi = async () => {
            if (asyncStorage.getIsLogin() === 'false') {
                showToastWithGravity("Bạn chưa đăng nhập")
            }
            else {
                // setLoading(true)
                // setUser(JSON.parse(window.localStorage.getItem('user')))

                getList()
                // setLoading(false)
            }

        }

        fetchApi();


    }, [focus])

    const onClick = async () => {
        if (dataChoose.length === 0) {
            showToastWithGravity('Vui lòng chọn sản phẩm');
        }
        else {
            let block = false
            for (let item of dataChoose) {
                if (item.quantity > item.version.inStock) block = true
            }
            if (block === true) showToastWithGravity('Số lượng sản phẩm không đủ');
            else {
                const listFinal = dataChoose.map((item) => ({
                    id: item._id,
                    quantity: item.quantity,
                    product: item.product,
                    version: item.version,
                    comment: false,
                    exchange_return: false,
                    total: item.quantity * (item.product.price - (item.product.discount / 100) * item.product.price)
                }))

                // console.log(dataChoose);
                router.push({ pathname: "(page)/Order", params: { listBuy: JSON.stringify(listFinal), shoppingCart: true } })
                // setOpenModal(true)
            }
        }




    }
    return (
        <View className='relative h-full'>
            <FlatList
                data={list}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <ShoppingCartItem item={item} addArray={AddArray} deleteArray={DeleteArray} />}
                nestedScrollEnabled
                ListFooterComponent={<View className='mb-10'></View>}
                ListEmptyComponent={<View className='mt-5 flex-row justify-center items-center'>
                    <Text>Chưa có sản phẩm trong giỏ
                    </Text>
                </View>}
            />

            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row'>
                <TouchableOpacity className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center' onPress={() => deleteList()}>
                    <FontAwesome5 name='trash' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px] text-red-500'>Xóa bỏ</Text>
                </TouchableOpacity>
                <View className='w-[50%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center' onPress={() => setOpenFilter(true)}>
                    <Text>Tổng thanh toán : <Text className='text-red-500'>{addCommas(total)} đ</Text></Text>
                </View>
                <TouchableOpacity className='bg-blue-600 w-[25%] h-[100%] justify-center items-center' onPress={() => {
                    onClick()
                }}>
                    <Text className='font-bold text-white text-[16px]'>Mua hàng</Text>
                </TouchableOpacity>
            </View>
            {/* <Modal
                visible={openFilter}
                animationType='slide'
                transparent={true}
                className='bg-white h-full w-full'
                onRequestClose={() => {
                    setCloseFilter()
                }}
            >



            </Modal> */}

        </View>
    )
}

export default ShoppingCart