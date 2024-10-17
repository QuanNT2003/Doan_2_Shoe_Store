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
import { useRouter } from "expo-router"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import SearchBar from "../../components/SearchBar"
import { useState } from "react"
import ProductTypeItem from "../../components/ProductTypeItem"


const SearchPage = () => {
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([1, 2, 3])
    const [productType, setProductType] = useState([1, 2, 3, 4, 5, 6])
    return (
        <View >
            <View className='flex-row bg-white items-center p-1 '>
                <TouchableOpacity onPress={() => {
                    router.back()
                }} className='w-[10%] flex-row justify-center items-center'>
                    <FontAwesome5 name='arrow-left' size={20} />
                </TouchableOpacity>


                <View className='w-[80%]' onPress={() => {
                }}>
                    <SearchBar placeholder={'Tìm kiếm sản phẩm '} />
                </View>


            </View>
            <ScrollView>

                <View className='bg-white mb-4'>
                    <FlatList
                        data={searchResult}
                        className='h-[200px] '
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <View className='h-[40px] flex-row items-center px-4 border-b-[1px] border-y-neutral-200'>
                            <Text className='font-medium'>
                                123
                            </Text>
                        </View>}
                        nestedScrollEnabled
                        scrollEnabled={false}
                    />
                </View>

                <View className='bg-white p-3'>
                    <Text className='font-bold border-b-[1px] border-y-neutral-200 p-2'>Gợi ý tìm kiếm</Text>
                    <FlatList
                        data={productType}
                        className='mx-2'
                        numColumns={2}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <View className='w-[50%] my-1 '>
                            <ProductTypeItem />
                        </View>}
                        ListFooterComponent={<View className='mb-10'></View>}
                        nestedScrollEnabled
                        scrollEnabled={false}

                    />
                </View>
            </ScrollView>

        </View>
    )
}

export default SearchPage