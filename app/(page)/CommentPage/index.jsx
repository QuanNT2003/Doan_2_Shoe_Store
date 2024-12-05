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
    MaterialCommunityIcons,
    FontAwesome5
} from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import * as CommentServices from '../../apiServices/commentServices'
import CommentItem from "../../components/Comment_Item"

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const CommentPage = () => {
    const router = useRouter()
    const { productId } = useLocalSearchParams()
    //comment
    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);
    const [rating, setRating] = useState('')

    const createObjectQuery = async (
        limit,
        page,
        sortBy,
        orderBy,
        user,
        productId,
        approve,
        rating
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(user && { user }),
            ...(productId && { productId }),
            ...(approve && { approve }),
            ...(rating && { rating }),
        };

    }

    const getList = async (obj) => {
        setPending(true);

        const response = await CommentServices.getAllComment(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                } else {
                    // toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            // console.log(response);
            setPending(false);
            setRows(response.data);


        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            getList(
                await createObjectQuery(
                    6,
                    1,
                    '',
                    '',
                    '',
                    [{ value: productId }],
                    [{ value: true }],
                    { value: rating }
                ));


        }

        fetchApi();
        // setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);
    return (
        <View className='mb-5'>
            <View className='flex-row p-3 justify-around'>
                <TouchableOpacity className={rating === '' ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating('')}>
                    <Text className={rating === '' ? 'text-white font-semibold' : 'font-semibold'}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity className={rating === 1 ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating(1)}>
                    <Text className={rating === 1 ? 'text-white font-semibold' : 'font-semibold'}>1 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity className={rating === 2 ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating(2)}>
                    <Text className={rating === 2 ? 'text-white font-semibold' : 'font-semibold'}>2 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity className={rating === 3 ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating(3)}>
                    <Text className={rating === 3 ? 'text-white font-semibold' : 'font-semibold'}>3 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity className={rating === 4 ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating(4)}>
                    <Text className={rating === 4 ? 'text-white font-semibold' : 'font-semibold'}>4 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity className={rating === 5 ? 'w-[70px] h-[40px] bg-sky-500 flex justify-center items-center rounded-md' : 'w-[70px] h-[40px] border-[1px] border-black flex justify-center items-center rounded-md'} onPress={() => setRating(5)}>
                    <Text className={rating === 5 ? 'text-white font-semibold' : 'font-semibold'}>5 sao</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={rows}
                    className='m-3 '
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => <CommentItem comment={item} />}
                    ListFooterComponent={<View className='mb-32'>

                    </View>}
                />
            </View>
        </View>

    )
}

export default CommentPage