import { TouchableOpacity, View } from "react-native"
import SearchBar from "../components/SearchBar"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import { useRouter } from "expo-router"
const HeaderCustom = ({ backButton }) => {
    const router = useRouter()
    return (
        <View className='flex-row bg-transparent items-center p-1'>
            {
                backButton && <TouchableOpacity onPress={() => {
                    router.back()
                }} className='w-[10%] flex-row justify-center items-center'>
                    <FontAwesome5 name='arrow-left' size={20} />
                </TouchableOpacity>
            }

            <View className={backButton ? 'w-[70%]' : 'w-[80%]'}>
                <SearchBar placeholder={'Tìm kiếm sản phẩm '} />
            </View>
            <TouchableOpacity className='w-[10%] justify-center flex-row'>
                <FontAwesome5 name='cart-plus' size={25} className='mr-3' />
            </TouchableOpacity>
            <TouchableOpacity className='w-[10%] justify-center flex-row'>
                <FontAwesome5 name='comment-dots' size={25} className='mr-3' />
            </TouchableOpacity>

        </View>
    )
}

export default HeaderCustom