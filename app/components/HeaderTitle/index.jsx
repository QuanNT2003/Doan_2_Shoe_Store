import { TouchableOpacity, View, Text } from "react-native"
import {
    FontAwesome5,
    FontAwesome
} from "@expo/vector-icons"
import { useRouter } from "expo-router"
const HeaderTitle = ({ title }) => {
    const router = useRouter()
    return (
        <View className='flex-row bg-transparent items-center p-1 h-[50px] '>
            <TouchableOpacity onPress={() => {
                router.back()
            }} className='w-[10%] flex-row justify-center items-center'>
                <FontAwesome5 name='arrow-left' size={20} />
            </TouchableOpacity>

            <Text className='font-semibold'>
                {title}
            </Text>

        </View>
    )
}

export default HeaderTitle