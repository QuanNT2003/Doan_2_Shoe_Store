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
import Product_item from "../../components/product_item/product_item"
import MultiSelectComp from "../../components/MultiSelect"
import { SafeAreaView } from "react-native-safe-area-context"

const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
}, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
}, {
    id: '16hbajsabsd',
    name: 'Calabar'
}, {
    id: 'nahs75a5sg',
    name: 'Lagos'
}, {
    id: '667atsas',
    name: 'Maiduguri'
}, {
    id: 'hsyasajs',
    name: 'Anambra'
}, {
    id: 'djsjudksjd',
    name: 'Benue'
}, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
}, {
    id: 'suudydjsjd',
    name: 'Abuja'
}
];
const ProductCollection = () => {
    const router = useRouter()
    const { search } = useLocalSearchParams()
    const [searchResult, setSearchResult] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }
    const [selectedType, setSelectedType] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedClassify, setSelectedClassify] = useState();
    return (
        <View >
            <FlatList
                data={searchResult}
                className='p-3 bg-white'
                numColumns={2}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={<View className='flex-row justify-between m-3'>
                    <Text className='font-semibold text-[16px]'>Kết quả tìm kiếm : {search}</Text>
                    <TouchableOpacity onPress={() => setOpenFilter(true)}>
                        <FontAwesome5 name='align-justify' size={20} className='mr-5' />
                    </TouchableOpacity>

                </View>}
                renderItem={({ item }) => <View className='w-[50%] my-2 flex items-center justify-center '>
                    <Product_item />
                </View>}
                ListFooterComponent={<View className='mb-10'>

                </View>}
                nestedScrollEnabled
            />
            <Modal
                visible={openFilter}
                animationType='slide'
                transparent={true}
                className='bg-white h-full w-full'
                onRequestClose={() => {
                    setCloseFilter()
                }}
            >
                <SafeAreaView>
                    <View className='h-full bg-white mt-3 '>
                        <View className='flex flex-row justify-between items-center bg-slate-200 p-4'>
                            <Text className='text-lg font-semibold '>Lọc sản phẩm</Text>
                            <TouchableOpacity onPress={() => setCloseFilter()}>
                                <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                            </TouchableOpacity>
                        </View>
                        <View className='p-2'>
                            <MultiSelectComp title={'Loại sản phẩm'} items={items} selectedItems={selectedType} setSelectedItems={setSelectedType} single={false} />
                            <MultiSelectComp title={'Phân loại'} items={items} selectedItems={selectedClassify} setSelectedItems={setSelectedClassify} single={true} />
                            <MultiSelectComp title={'Nhãn hàng'} items={items} selectedItems={selectedBrand} setSelectedItems={setSelectedBrand} single={false} />
                        </View>

                    </View>
                </SafeAreaView>

            </Modal>
        </View>
    )
}

export default ProductCollection