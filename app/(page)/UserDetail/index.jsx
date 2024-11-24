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
    Platform
} from "react-native"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import * as ImagePicker from 'expo-image-picker';
import InputCustom from "../../components/InputCustom"
import { CheckBox } from '@rneui/themed';
import MDateTimePicker from "../../components/DateTimePicker"
const UserDetail = () => {
    const router = useRouter()

    const [openFilter, setOpenFilter] = useState(false)
    const setCloseFilter = () => {
        setOpenFilter(false)

    }

    const [openResetPass, setOpenResetPass] = useState(false)
    const setCloseResetPass = () => {
        setOpenResetPass(false)

    }
    // user image
    const [imageUris, setImageUris] = useState('');

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

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUris(result.assets[0].uri);
        }

    };

    const handleRemoveImage = () => {
        setImageUris('')
    };

    //name
    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('');
    const onChangeName = (value) => {
        setName(value);
        setErrorName('')
    };

    //phone
    const [phone, setPhone] = useState('')
    const [errorPhone, setErrorPhone] = useState('');
    const onChangePhone = (value) => {
        setPhone(value);
        setErrorPhone('')
    };

    // email
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');

    //render
    const [render, setRender] = useState('male');


    // address
    const [address, setAddress] = useState('');

    const onChangeAddress = (value) => {
        setAddress(value);
        setErrorAddress('')
    };
    const [errorAddress, setErrorAddress] = useState('');


    //date time
    const [date, setDate] = useState(new Date())

    // password
    const [password, setPassword] = useState('')
    const onChangePass = (value) => {
        setPassword(value);
        setErrorPassword('')
    };
    const [errorPassword, setErrorPassword] = useState('');
    // new password
    const [newPassword, setNewPassword] = useState('')
    const onChangeNewPass = (value) => {
        setNewPassword(value);
        setErrorNewPassword('')
    };
    const [errorNewPassword, setErrorNewPassword] = useState('');
    //confirm Password
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const onChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
        setErrorConfirmPassword('')
    };


    return (
        <View className='relative h-full'>
            <View className='bg-white p-3 my-2 flex justify-center items-center'>
                <Image
                    source={LogoWithName}
                    className='h-[120px] w-[120px] m-3 rounded-full'
                />
                <Text className='text-[16px] mb-3 font-semibold'>Hội viên tiềm năng</Text>
            </View>
            <View className='bg-white p-4 my-2'>
                <Text className='text-[16px] mb-3'>Thông tin cá nhân</Text>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        Họ và tên
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        email
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        Điện thoại
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        Giới tính
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        Ngày sinh
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
                <View className='flex-row m-2'>
                    <Text className='w-[40%]'>
                        Địa chỉ
                    </Text>
                    <Text className='w-[10%]'>
                        :
                    </Text>
                    <Text className='w-[50%]' numberOfLines={2}>
                        Ngô Trung Quân
                    </Text>
                </View>
            </View>
            <View className='bg-white absolute w-[100%] h-[60px] bottom-1 flex-row justify-around items-center'>
                <TouchableOpacity className='bg-blue-600 w-[40%] h-[80%] justify-center items-center rounded-lg' onPress={() => setOpenFilter(true)} >
                    <Text className='font-bold text-white text-[14px]'>Cập nhật thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-blue-600 w-[40%] h-[80%] justify-center items-center rounded-lg' onPress={() => setOpenResetPass(true)}>
                    <Text className='font-bold text-white text-[14px]'>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>
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
                        <Text className='text-lg font-semibold '>Cập nhật thông tin cá nhân</Text>
                        <TouchableOpacity onPress={() => setCloseFilter()}>
                            <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                        </TouchableOpacity>
                    </View>
                    <FlatList className='p-2'
                        ListHeaderComponent={(
                            <View>

                                <View className='flex justify-start items-start mb-4'>
                                    <Text className='mb-1 text-base'>
                                        Ảnh đại diện
                                    </Text>
                                    <View className='w-full'>
                                        <View className='my-4 flex-row'>
                                            {
                                                imageUris === '' ?
                                                    <TouchableOpacity className='flex justify-center items-center h-[120px] w-[120px] border-dashed border-black border-[1px]' onPress={() => chooseImage()}>
                                                        <Text>Chọn hình ảnh</Text>
                                                    </TouchableOpacity> :
                                                    <View className='w-[120px] h-[120px] mr-2 relative flex justify-center items-center'>
                                                        <TouchableOpacity className='top-0 right-0 absolute z-50' onPress={() => handleRemoveImage()}>
                                                            <FontAwesome5 name='times-circle' size={20} className='mr-5' color="red" />
                                                        </TouchableOpacity>
                                                        <Image

                                                            source={{ uri: imageUris }}
                                                            className='w-[100px] h-[100px]'
                                                        />
                                                    </View>
                                            }
                                        </View>
                                        <InputCustom
                                            value={name}
                                            error={errorName}
                                            handleChange={onChangeName}
                                            require
                                            title={'Name'}
                                            placeholder={'Nhập name'}

                                        />
                                        <InputCustom
                                            value={phone}
                                            error={errorPhone}
                                            handleChange={onChangePhone}
                                            require
                                            title={'Số điện thoại'}
                                            placeholder={'Nhập số điện thoại'}

                                        />
                                        <InputCustom
                                            value={email}
                                            error={errorEmail}
                                            handleChange={onChangeEmail}
                                            require
                                            title={'Email'}
                                            placeholder={'Nhập email'} />
                                        <View className=''>
                                            <Text className='text-[16px] mb-3 pt-4'>Giới tính</Text>

                                            <View className='flex-row items-center'>
                                                <CheckBox
                                                    checked={render === 'male'}
                                                    onPress={() => setRender('male')}
                                                    checkedIcon="dot-circle-o"
                                                    uncheckedIcon="circle-o"
                                                    size={18}

                                                />
                                                <Text>Nam</Text>
                                            </View>
                                            <View className='flex-row items-center'>
                                                <CheckBox
                                                    checked={render === 'female'}
                                                    onPress={() => setRender('female')}
                                                    checkedIcon="dot-circle-o"
                                                    uncheckedIcon="circle-o"
                                                    size={18}
                                                />
                                                <Text>Nữ</Text>
                                            </View>


                                        </View>
                                        <View className=''>
                                            <MDateTimePicker dateTime={date} setDateTime={setDate} />
                                        </View>
                                        <InputCustom
                                            title={'Địa chỉ'}
                                            placeholder={'Nhập địa chỉ'}
                                            require
                                            area={true}
                                            value={address}
                                            error={errorAddress}
                                            handleChange={onChangeAddress}

                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                        ListFooterComponent={(
                            <View className='mb-20'>
                            </View>
                        )}
                    />
                    <View className='flex-row justify-around items-center absolute bottom-4 right-0 left-0'>
                        <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center rounded-xl'>
                            <Text className='text-white'>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <Modal
                visible={openResetPass}
                animationType='slide'
                transparent={true}
                className='bg-white h-full w-full'
                onRequestClose={() => {
                    setCloseResetPass()
                }}
            >

                <View className='h-full bg-white relative'>
                    <View className='flex flex-row justify-between items-center bg-slate-200 p-4'>
                        <Text className='text-lg font-semibold '>Cập nhật mật khẩu</Text>
                        <TouchableOpacity onPress={() => setCloseResetPass()}>
                            <FontAwesome5 name='times-circle' size={30} className='mr-5' />
                        </TouchableOpacity>
                    </View>
                    <FlatList className='p-2'
                        ListHeaderComponent={(
                            <View>

                                <InputCustom
                                    value={password}
                                    error={errorPassword}
                                    handleChange={onChangePass}
                                    require
                                    title={'Password'}
                                    placeholder={'Nhập passwrod'}
                                    password
                                />
                                <InputCustom
                                    value={password}
                                    error={errorPassword}
                                    handleChange={onChangePass}
                                    require
                                    title={'Password mới'}
                                    placeholder={'Nhập passwrod'}
                                    password
                                />
                                <InputCustom
                                    value={confirmPassword}
                                    error={errorConfirmPassword}
                                    handleChange={onChangeConfirmPassword}
                                    require
                                    title={'Xác nhận password'}
                                    placeholder={'Nhập lại password'}
                                    password
                                />
                            </View>
                        )}
                        ListFooterComponent={(
                            <View className='mb-20'>
                            </View>
                        )}
                    />
                    <View className='flex-row justify-around items-center absolute bottom-4 right-0 left-0'>
                        <TouchableOpacity className='w-[47%] bg-blue-500 p-3 flex-row justify-center items-center rounded-xl'>
                            <Text className='text-white'>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default UserDetail