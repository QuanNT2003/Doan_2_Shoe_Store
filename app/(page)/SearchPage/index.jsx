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
import { useEffect, useState } from "react"
import ProductTypeItem from "../../components/ProductTypeItem"
import * as ProductServices from '../../apiServices/productServices'
import * as CategoryServices from '../../apiServices/categoryServices';
const SearchPage = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [listCategories, setListCategories] = useState([])
    const [day, setDay] = useState(new Date())

    const onSearch = async (value) => {
        setSearch(value)
        if (search !== '') {
            const response = await ProductServices.getSearch(value)

            if (response) {
                // console.log(response);
                // setPending(false);
                setSearchResult(response.data);
                setDay(new Date())
            }
        }
    }

    const getCate = async () => {
        const response = await CategoryServices.getAllCategorys(
        )
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            // console.log(response.data);
            setListCategories(response.data);
        }
    };

    useEffect(() => {
        getCate()
    }, [day]);
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
                    <SearchBar
                        placeholder={'Tìm kiếm sản phẩm '}
                        value={search}
                        handleChange={onSearch}
                        search={() => {
                            router.push({ pathname: "(page)/ProductCollection", params: { search: search } })
                        }}
                    />
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
                        renderItem={({ item }) => <TouchableOpacity className='h-[40px] flex-row items-center px-4 border-b-[1px] border-y-neutral-200' onPress={() => {
                            router.push({ pathname: "(page)/ProductCollection", params: { search: item } })
                        }}>
                            <Text className='font-normal text-[13px]'>
                                {item}
                            </Text>
                        </TouchableOpacity>}
                        nestedScrollEnabled
                        scrollEnabled={false}
                    />
                </View>

                <View className='bg-white p-3'>
                    <Text className='font-bold border-b-[1px] border-y-neutral-200 p-2'>Gợi ý tìm kiếm</Text>
                    <FlatList
                        data={listCategories}
                        className='mx-2'
                        numColumns={2}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <View className='w-[50%] my-1 '>
                            <ProductTypeItem item={item} click={() =>
                                router.push({ pathname: "(page)/ProductCollection", params: { cateId: item._id } })
                            } />
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