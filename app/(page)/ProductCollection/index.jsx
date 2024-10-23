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
import PriceRange from "../../components/PriceRange"

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
    const [searchResult, setSearchResult] = useState([
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ])

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }
    const [selectedType, setSelectedType] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedClassify, setSelectedClassify] = useState();
    const [priceFrom, setPriceFrom] = useState()
    const [priceTo, setPriceTo] = useState()
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
                    <Product_item item={item} />
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

                <View className='h-full bg-white relative'>
                    <View className='flex flex-row justify-between items-center bg-slate-200 p-4'>
                        <Text className='text-lg font-semibold '>Lọc sản phẩm</Text>
                        <TouchableOpacity onPress={() => setCloseFilter()}>
                            <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                        </TouchableOpacity>
                    </View>
                    <FlatList className='p-2'
                        ListHeaderComponent={(
                            <View>
                                <MultiSelectComp title={'Loại sản phẩm'} items={items} selectedItems={selectedType} setSelectedItems={setSelectedType} single={false} />
                                <MultiSelectComp title={'Phân loại'} items={items} selectedItems={selectedClassify} setSelectedItems={setSelectedClassify} single={true} />
                                <MultiSelectComp title={'Nhãn hàng'} items={items} selectedItems={selectedBrand} setSelectedItems={setSelectedBrand} single={false} />
                                <PriceRange title={'Nhập mức giá'} fromPrice={priceFrom} setFromPrice={setPriceFrom} toPrice={priceTo} setToPrice={setPriceTo} />
                            </View>
                        )}
                        ListFooterComponent={(
                            <View className='mb-20'>
                            </View>
                        )}
                    />
                    <View className='flex-row justify-around items-center absolute bottom-4 right-0 left-0'>
                        <TouchableOpacity className='w-[47%] bg-red-500 p-3 flex-row justify-center items-center'>
                            <Text className='text-white'>Tạo lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center'>
                            <Text className='text-white'>Lọc</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ProductCollection