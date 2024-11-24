import { TouchableOpacity, View, Text } from "react-native"
import {
    FontAwesome5,
    FontAwesome
} from "@expo/vector-icons"
import { useRouter } from "expo-router"
const HeaderCustom = ({ backButton }) => {
    const router = useRouter()

    return (
        <View className='flex-row bg-cyan-300 items-center p-2'>
            {
                backButton && <TouchableOpacity onPress={() => {
                    router.back()
                }} className='w-[10%] flex-row justify-center items-center'>
                    <FontAwesome5 name='arrow-left' size={20} />
                </TouchableOpacity>
            }

            <TouchableOpacity className={backButton ? 'w-[70%]' : 'w-[80%]'} onPress={() => {
                router.push({ pathname: "(page)/SearchPage" })
            }}>
                <View className="flex border bg-white border-slate-300 flex-row items-center p-2 px-4 rounded-lg" >
                    <View className='min-w-[200px] w-[95%]'>
                        <Text className='text-sm text-slate-400'>Tìm kiếm sản phẩm</Text>
                    </View>

                    <FontAwesome name='search' size={20} />

                </View>
            </TouchableOpacity>
            <TouchableOpacity className='w-[10%] justify-center flex-row' onPress={() => {
                router.push({ pathname: "(page)/ShoppingCart" })
            }}>
                <FontAwesome5 name='cart-plus' size={25} className='mr-3' />
            </TouchableOpacity>
            <TouchableOpacity className='w-[10%] justify-center flex-row' onPress={() => {
                router.push({ pathname: "(page)/ChatPage" })
                // openChat()
            }}>
                <FontAwesome5 name='comment-dots' size={25} className='mr-3' />
            </TouchableOpacity>

        </View>
    )
}

export default HeaderCustom