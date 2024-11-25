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
import Product_item from "../../components/product_item/product_item"
import MultiSelectComp from "../../components/MultiSelect"
import { SafeAreaView } from "react-native-safe-area-context"
import PriceRange from "../../components/PriceRange"
import * as ProductServices from '../../apiServices/productServices'
import * as CategoryServices from '../../apiServices/categoryServices';
import * as BrandServices from '../../apiServices/brandServices';
const sortlist = [
    {
        name: 'Đánh giá từ thấp tới cao',
        value: [
            'asc',
            'star'
        ]
    },
    {
        name: 'Đánh giá từ cao tới thấp',
        value: [
            'desc',
            'star'
        ]
    },
    {
        name: 'Giá từ cao tới thấp',
        value: [
            'desc',
            'price'
        ]
    },
    {
        name: 'Giá từ thấp tới cao',
        value: [
            'asc',
            'price'
        ]
    },
    {
        name: 'Lượt đánh giá',
        value: [
            'asc',
            'star'
        ]
    },
]
const optionsPL = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Trẻ em', value: 'Trẻ em' },
];

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const ProductCollection = () => {
    const router = useRouter()
    const { search } = useLocalSearchParams()

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    const [selectedPL, setSelectedPL] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const [sort, setSort] = useState('Không có')

    // PriceRange
    // const minDistance = 10;
    // const [price, setPrice] = React.useState([0, 0]);

    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(0)


    const filter = async () => {
        // console.log(selectedPL);
        // console.log(selectedManufacturer);
        // console.log(selectedLSP);

        getList(
            await createObjectQuery(
                page,
                limit,
                sortBy,
                orderBy,
                search,
                selectedManufacturer,
                selectedLSP,
                selectedPL,
                priceTo === 0 ? '' : [priceFrom, priceTo]
            ));

        setCloseFilter()
    }

    const sortProcess = async (item) => {
        setSort(item.name)
        setSortBy(item.value[1])
        setOrderBy(item.value[0])
        getList(
            await createObjectQuery(
                page,
                limit,
                item.value[1],
                item.value[0],
                search,
                selectedManufacturer,
                selectedLSP,
                selectedPL,
                priceTo === 0 ? '' : [priceFrom, priceTo]
            ));
    }

    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        search,
        brand,
        category,
        classify,
        price
    ) => {

        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(brand && { brand }),
            ...(category && { category }),
            ...(classify && { classify }),
            ...(price && { price }),
        };
    }

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalPage, setTotalPage] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');



    // Filter Options
    const [optionsLSP, setOptionsLSP] = useState([]);
    const [optionsManufacturer, setOptionsManufacturer] = useState([]);

    const getBrand = async () => {
        const response = await BrandServices.getAllBrands()
            .catch((error) => {
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    console.log('get brand', error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log('get brand', error.config);
            });

        if (response) {
            const data = await response.data.map((cate) => ({ label: cate.brand.name, value: cate.brand._id }));
            setOptionsManufacturer(data);
        }
    }

    // GET DATA SUPPLIERS
    const getCate = async () => {
        const response = await CategoryServices.getAllCategorys(
        )
            .catch((error) => {
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    console.log('get Cate', error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log('get Cate', error.config);
            });

        if (response) {
            const data = await response.data.map((sup) => ({ label: sup.name, value: sup._id }));
            setOptionsLSP(data);
        }
    };

    const getList = async (obj) => {
        console.log(obj);

        // setPending(true);
        const response = await ProductServices.getAllProducts(obj)
            .catch((error) => {
                // setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalPage(0);
                } else {
                    showToastWithGravity('Có lỗi xảy ra');
                }
            });

        if (response) {
            // setPending(false);
            setRows(response.data);
            setTotalPage(response.totalPage);
        }
    }


    const changePage = async (newPage) => {
        setPage(newPage)
        getList(
            await createObjectQuery(
                newPage,
                limit,
                sortBy,
                orderBy,
                search,
                selectedManufacturer,
                selectedLSP,
                selectedPL,
                priceTo === 0 ? '' : [priceFrom, priceTo]
            ));
        setDay(new Date())
    }
    useEffect(() => {
        const fetch = async () => {
            getCate()
            getBrand()
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                ));
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {

    // }, [day]);
    return (
        <View >
            <FlatList
                data={rows}
                className='p-3 bg-white h-full'
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
                ListEmptyComponent={<View className='flex-row justify-center items-center'>
                    <Text>Không có sản phẩm phù hợp
                    </Text>
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
                                <MultiSelectComp title={'Loại sản phẩm'} items={optionsLSP} selectedItems={selectedLSP} setSelectedItems={setSelectedLSP} single={false} />
                                <MultiSelectComp title={'Phân loại'} items={optionsPL} selectedItems={selectedPL} setSelectedItems={setSelectedPL} single={true} />
                                <MultiSelectComp title={'Nhãn hàng'} items={optionsManufacturer} selectedItems={selectedManufacturer} setSelectedItems={setSelectedManufacturer} single={false} />
                                <PriceRange title={'Nhập mức giá'} fromPrice={priceFrom} setFromPrice={setPriceFrom} toPrice={priceTo} setToPrice={setPriceTo} />
                            </View>
                        )}
                        ListFooterComponent={(
                            <View className='mb-20'>
                            </View>
                        )}
                    />
                    <View className='flex-row justify-around items-center absolute bottom-4 right-0 left-0'>
                        <TouchableOpacity className='w-[47%] bg-red-500 p-3 flex-row justify-center items-center' onPress={() => {
                            setSelectedLSP([])
                            setSelectedManufacturer([])
                            setSelectedPL([])
                            setPriceFrom(0)
                            setPriceTo(0)
                        }}>
                            <Text className='text-white'>Tạo lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center' onPress={() => filter()}>
                            <Text className='text-white'>Lọc</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ProductCollection