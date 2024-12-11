import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
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
import InputCustom from "../../components/InputCustom"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import { Rating } from 'react-native-ratings';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as CommentServices from '../../apiServices/commentServices'
import * as ImageServices from '../../apiServices/imageServices'
import * as UserServices from '../../apiServices/userServices';
import * as asyncStorage from "../../store/asyncStorage"
import * as OrderServices from '../../apiServices/orderServices'
import ModalLoading from "../../components/ModalLoading"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}

const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const Comment = () => {
    const router = useRouter()
    const [day, setDay] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const { objOrder, item } = useLocalSearchParams()

    const [order, setOrder] = useState('')
    const [obj, setObj] = useState('');
    const [user, setUser] = useState('')

    const [imageUris, setImageUris] = useState([]);

    const convertToBase64 = async (fileUri) => {
        try {
            const base64Data = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const mimeType = 'image/jpeg'; // Cần chỉnh đúng loại file
            return `data:${mimeType};base64,${base64Data}`;
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    };

    const chooseImage = async () => {
        // Yêu cầu quyền truy cập
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        // Chọn hình ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && imageUris.length + result.assets.length <= 4) {
            const newImageUris = result.assets.map((asset) => asset.uri);
            setImageUris((prevUris) => [...prevUris, ...newImageUris]);
        } else if (imageUris.length + result.assets.length > 4) {
            Alert.alert('Limit exceeded', 'Cannot add more than 4 images.');
        }
    };


    const [comment, setComment] = useState('')
    const onChangeComment = (value) => {
        setComment(value);
        setErrorComment('')
    };
    const [errorComment, setErrorComment] = useState('');

    const [rating, setRating] = useState(0)

    const processImages = async (imageUris) => {
        try {
            // Sử dụng Promise.all để xử lý tất cả Promise trong mảng
            const images = await Promise.all(
                imageUris.map((item) => convertToBase64(item))
            );

            return images // Mảng các chuỗi Base64
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    const addComment = async () => {
        // console.log(rating);
        // console.log(imageUris);
        //const image = await processImages(imageUris);

        const fetchApi = async () => {
            setLoading(true)

            const image = {
                images: await processImages(imageUris)
            }

            const result = await ImageServices.AddImages(image)
                .catch((error) => {
                    console.log(error);
                    //setLoading(false);
                    showToastWithGravity('Có lỗi xảy ra');
                });

            if (result) {
                // console.log(result.status);
                // setLoading(false)
                //console.log(result.data);
                const commentObj = {
                    images: result.data,
                    note: comment,
                    productId: obj.product.productId,
                    user: user,
                    rating: rating,
                    like: 0

                }
                const resultComment = await CommentServices.CreateComment(commentObj)
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        showToastWithGravity('Có lỗi xảy ra');
                    });

                if (resultComment) {

                    let newObj = obj;
                    newObj['comment'] = true;
                    setObj(newObj)
                    showToastWithGravity('Đã để lại bình luận');
                    const resultUpdate = await OrderServices.UpdateOrder(order.orderId, order)
                        .catch((err) => {
                            console.log(err);
                        });
                    setLoading(false);
                    router.replace({ pathname: "(page)/OrderDetail", params: { id: order.orderId } })
                }
            }



        }

        fetchApi();
    }

    const handleRemoveImage = (index) => {
        imageUris.splice(index, 1)
        setDay(new Date())
    };

    useEffect(() => {
        const fetchApi = async () => {
            setObj(JSON.parse(item))
            setOrder(JSON.parse(objOrder))
            // const product = JSON.parse(item);
            setDay(new Date())
            // console.log(item.product.productId);
            const login = await asyncStorage.getIsLogin()
            // setIsLogin(login)
            if (login === 'true') {
                const id = await asyncStorage.getIdAsync()
                // console.log("id", id);

                const result = await UserServices.getUser(id)

                setUser(result.data)
            }


        }

        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            // setObj(JSON.parse(item))
            const product = JSON.parse(item);
            order?.item?.forEach((item) => {
                if (item.product.productId === product.product.productId) {
                    setObj(item);
                    // console.log(item);

                }
            });


        }
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [day]);
    return (
        <View className='h-full p-2 relative'>
            <View className='flex-row p-3 bg-white my-2 rounded-xl'>
                <View className='w-[25%] m-1'>
                    <Image
                        source={obj?.product?.images[0]?.url ? { uri: obj?.product?.images[0]?.url } : LogoWithName}
                        className='h-[100px] w-[100px] m-0'
                    />
                </View>

                <View className='w-[75%] p-1'>
                    <Text className=' text-[13px] my-1' numberOfLines={2}>
                        {obj?.product?.name}
                    </Text>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px]'>đ <Text className='text-[16px]'>{addCommas(obj?.product?.price * (100 - obj?.product?.discount) / 100)} đ</Text></Text>
                    </View>
                </View>
            </View>
            <View className='p-3 bg-white my-2 rounded-xl'>
                <View className='flex justify-start items-start mb-4'>
                    <Text className='mb-1 text-base'>
                        Đánh giá
                    </Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating}
                        onFinishRating={(value) => setRating(value)}
                    />
                </View>
                <View className='flex justify-start items-start mb-4'>
                    <Text className='mb-1 text-base'>
                        Để lại hình ảnh
                    </Text>
                    <View className='w-full'>
                        <TouchableOpacity className='flex justify-center items-center h-[100px] w-[100%] border-dashed border-black border-[1px]' onPress={() => chooseImage()}>
                            <Text>Chọn hình ảnh</Text>
                        </TouchableOpacity>
                        <View className='mt-4 flex-row'>
                            {imageUris.map((uri, index) => (
                                <View key={index} className='w-[120px] h-[120px] mr-2 relative felx justify-center items-center'>
                                    <TouchableOpacity className='top-0 right-0 absolute z-50' onPress={() => handleRemoveImage(index)}>
                                        <FontAwesome5 name='times-circle' size={20} className='mr-5' color="red" />
                                    </TouchableOpacity>
                                    <Image
                                        key={index}
                                        source={{ uri }}
                                        className='w-[100px] h-[100px]'
                                    />
                                </View>

                            ))}
                        </View>

                    </View>
                </View>
                <InputCustom
                    title={'Đánh giá'}
                    placeholder={'Để lại đánh giá'}
                    require
                    area={true}
                    value={comment}
                    error={errorComment}
                    handleChange={onChangeComment}

                />
            </View>
            <View className='absolute w-[100%] h-[50px] bottom-1 flex-row justify-center' >

                <TouchableOpacity className='bg-blue-600 w-[80%] h-[100%] justify-center items-center rounded-md' onPress={() => addComment()}>
                    <Text className='font-bold text-white text-[16px]'>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <ModalLoading visible={loading} />
        </View>

    )
}

export default Comment