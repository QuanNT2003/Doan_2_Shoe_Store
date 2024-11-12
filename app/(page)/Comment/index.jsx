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
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';

const Comment = () => {
    const router = useRouter()
    const [day, setDay] = useState(new Date());


    const [imageUris, setImageUris] = useState([]);

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


    const addComment = () => {
        console.log(rating);
        console.log(imageUris);

    }

    const handleRemoveImage = (index) => {
        imageUris.splice(index, 1)
        setDay(new Date())
    };
    return (
        <View className='h-full p-2 relative'>
            <View className='flex-row p-3 bg-white my-2 rounded-xl'>
                <View className='w-[25%] m-1'>
                    <Image
                        source={LogoWithName}
                        className='h-[100px] w-[100px] m-0'
                    />
                </View>

                <View className='w-[75%] p-1'>
                    <Text className=' text-[13px] my-1' numberOfLines={2}>
                        Cân điện tử sức khỏe thông minh hình lợn hồng cute, cân tiểu ly mini nhà bếp dùng pin
                    </Text>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[12px]'>đ <Text className='text-[16px]'>500.000</Text></Text>
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
        </View>

    )
}

export default Comment