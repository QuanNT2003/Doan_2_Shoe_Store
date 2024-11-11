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
import { useRouter } from "expo-router"
import InputCustom from "../../components/InputCustom"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
const Register = () => {
    const router = useRouter()
    const [step, setStep] = useState(1)

    //step 1
    // email
    const [email, setEmail] = useState('');
    const onChangeEmail = (value) => {
        setEmail(value);
        setErrorEmail('')
    };
    const [errorEmail, setErrorEmail] = useState('');


    //step 2
    // password
    const [otp, setOtp] = useState('')
    const onChangeOtp = (value) => {
        setOtp(value);
        setErrorOtp('')
    };
    const [errorOtp, setErrorOtp] = useState('');


    //step 3
    // password
    const [password, setPassword] = useState('')
    const onChangePass = (value) => {
        setPassword(value);
        setErrorPassword('')
    };
    const [errorPassword, setErrorPassword] = useState('');
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
    //confirm Password
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const onChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
        setErrorConfirmPassword('')
    };

    const senOtp = async () => {
        if (email === '') {
            setErrorEmail('Không được để trống')
        }
        else {
            setStep(2)
        }
    }

    const comfirmOtp = async () => {
        if (otp === '') {
            setErrorOtp('Không được để trống')
        }
        else {
            setStep(3)
        }
    }

    const SignIn = async () => {
        if (name === '') {

            setErrorName('Không được để trống')
        }
        if (phone === '') {

            setErrorPhone('Không được để trống')
        }
        if (password === '') {

            setErrorPassword('Không được để trống')
        }
        if (confirmPassword === '') {

            setErrorConfirmPassword('Không được để trống')
        }
        if (password !== confirmPassword) {

        }
        else if (name !== '' && phone !== '' && password !== '' && confirmPassword !== '') {

        }
    }

    const press = () => {
        if (step === 1) senOtp()
        else if (step === 2) comfirmOtp()
        else SignIn()
    }
    return (
        <View >
            <View className='flex-row bg-slate-100 items-center p-1 justify-start w-[100%] h-12'>
                <TouchableOpacity onPress={() => {
                    if (step === 1) router.back();
                    else setStep(step - 1)
                }} className='w-[10%] flex-row justify-center items-center'>
                    <FontAwesome5 name='arrow-left' size={20} />
                </TouchableOpacity>

            </View>

            <View className='m-0 p-4 relative justify-center flex items-center w-full'>
                <Image
                    source={LogoWithName}
                    className='h-[140px] w-[140px] m-1'
                />
                <View className='w-[100%] flex-col justify-center items-center m-3 bg-white p-5 rounded-lg'>
                    <Text className='font-bold text-[18px]'>Đăng ký</Text>
                    <View className='w-[100%]'>
                        {
                            step === 1 &&
                            <InputCustom
                                value={email}
                                error={errorEmail}
                                handleChange={onChangeEmail}
                                require
                                title={'Email'}
                                placeholder={'Nhập email'} />
                        }
                        {
                            step === 2 &&
                            <InputCustom
                                value={otp}
                                error={errorOtp}
                                handleChange={onChangeOtp}
                                require
                                title={'Otp'}
                                placeholder={'Nhập otp'}
                                password
                            />
                        }
                        {
                            step === 3 &&

                            <View>
                                <InputCustom
                                    value={name}
                                    error={errorName}
                                    handleChange={onChangeName}
                                    require
                                    title={'Name'}
                                    placeholder={'Nhập name'}
                                    password
                                />
                                <InputCustom
                                    value={phone}
                                    error={errorPhone}
                                    handleChange={onChangePhone}
                                    require
                                    title={'Số điện thoại'}
                                    placeholder={'Nhập số điện thoại'}
                                    password
                                />
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
                                    value={comfirmOtp}
                                    error={errorConfirmPassword}
                                    handleChange={onChangeConfirmPassword}
                                    require
                                    title={'Xác nhận password'}
                                    placeholder={'Nhập lại password'}
                                    password
                                />
                            </View>




                        }

                    </View>
                    <TouchableOpacity className='border-[1px] border-blue-400 w-[40%] h-[40px] justify-center items-center rounded-md' onPress={() => press()}>
                        <Text className='font-bold text-blue-600'>Xác nhận</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </View>

    )
}

export default Register