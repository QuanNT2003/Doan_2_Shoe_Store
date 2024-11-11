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
            setErrorPassword('Đã nhập')
            setErrorEmail('Đã nhập')
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