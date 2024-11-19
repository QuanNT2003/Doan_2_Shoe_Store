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
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import * as UserService from '../../apiServices/userServices';
import * as asyncStorage from "../../store/asyncStorage"

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const Login = () => {
    const router = useRouter()
    // email
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');
    // pass word
    const [password, setPassword] = useState('')
    const onChangePass = (value) => {
        setPassword(value);
        setErrorPassword('')
    };
    const [errorPassword, setErrorPassword] = useState('');

    const login = async () => {
        if (email === '') {
            setErrorEmail('Không được để trống')
        }
        if (password === '') {
            setErrorPassword('Không được để trống')
        }
        if (email !== '' && password !== '') {
            const obj = {
                email: email,
                password: password
            }

            const result = await UserService.login(obj)
                .catch((error) => {
                    console.log(error);
                    showToastWithGravity("Vui lòng kiểm tra lại email hoặc mật khẩu")
                });

            if (result) {
                console.log(result)
                if (result.status === 'ERR') showToastWithGravity("Vui lòng kiểm tra lại email hoặc mật khẩu")
                else {
                    if (result.data.active === false) showToastWithGravity("Tài khoản bị khóa")
                    else {
                        // console.log(result);

                        await asyncStorage.setIsLogin("true")
                        await asyncStorage.setRole("user")
                        await asyncStorage.setAccessToken(result.access_token)
                        await asyncStorage.setRefreshToken(result.refresh_token)
                        await asyncStorage.setIdAsync(result.data.userId)

                        // window.localStorage.setItem('user', JSON.stringify(result.data));
                        // window.localStorage.setItem('access_token', JSON.stringify(result.access_token));
                        // window.localStorage.setItem('refresh_token', JSON.stringify(result.refresh_token));
                        // window.localStorage.setItem('role', "user");
                        showToastWithGravity("Đăng nhập thành công")

                        // toastContext.notify('success', 'Đăng nhập thành công');
                        router.replace("home")
                    }

                }

            }
        }


    }
    return (
        <View className='m-0 p-4 relative justify-center flex items-center w-full'>
            <Image
                source={LogoWithName}
                className='h-[160px] w-[160px] m-3'
            />
            <View className='w-[100%] flex-col justify-center items-center m-3 bg-white p-5 rounded-lg'>
                <Text className='font-bold text-[18px]'>Đăng nhập</Text>
                <View className='w-[100%]'>
                    <InputCustom
                        value={email}
                        error={errorEmail}
                        handleChange={onChangeEmail}
                        require
                        title={'Email'}
                        placeholder={'Nhập email'} />
                    <InputCustom
                        value={password}
                        error={errorPassword}
                        handleChange={onChangePass}
                        require
                        title={'Password'}
                        placeholder={'Nhập password'}
                        password
                    />
                </View>
                <TouchableOpacity className='border-[1px] border-blue-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => login()} >
                    <Text className='font-bold text-blue-600'>Đăng nhập</Text>
                </TouchableOpacity>
                <Text className='my-3'>Hoặc</Text>
                <TouchableOpacity className='border-[1px] border-green-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => router.push({ pathname: "(page)/Register" })}>
                    <Text className='font-bold text-green-600'>Đăng ký</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Login