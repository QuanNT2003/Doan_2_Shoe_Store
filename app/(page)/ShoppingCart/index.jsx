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
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import ShoppingCartItem from "../../components/ShoppingCartItem"



const ShoppingCart = () => {
    const router = useRouter()


    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }
    const [searchResult, setSearchResult] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }
    ])

    const [dataChoose, setDataChoose] = useState([])
    const AddArray = (item) => {
        setDataChoose((prevDataChoose) => [
            ...prevDataChoose,
            item
        ]);
    }

    const DeleteArray = (id) => {
        setDataChoose(dataChoose.filter(item => item.id !== id));
    }
    return (
        <View className='relative'>
            <FlatList
                data={searchResult}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <ShoppingCartItem item={item} addArray={AddArray} deleteArray={DeleteArray} />}
                nestedScrollEnabled
                ListFooterComponent={<View className='mb-10'></View>}
            />

            <View className='bg-white absolute w-[100%] h-[60px] bottom-0 flex-row'>
                <TouchableOpacity className='w-[25%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center'>
                    <FontAwesome5 name='trash' size={20} className='mr-3' color='#b91c1c' />
                    <Text className='text-[12px]'>Xóa bỏ</Text>
                </TouchableOpacity>
                <View className='w-[50%] h-[100%] border-r-[1px] border-x-neutral-200 justify-center items-center' onPress={() => setOpenFilter(true)}>
                    <Text>Tổng thanh toán : <Text className='text-red-500'>1.000.000 đ</Text></Text>
                </View>
                <TouchableOpacity className='bg-red-600 w-[25%] h-[100%] justify-center items-center' onPress={() => {
                    console.log(dataChoose);

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