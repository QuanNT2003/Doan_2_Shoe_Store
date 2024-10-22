import { Text, TextInput, TouchableOpacity, View } from "react-native"
import {
    FontAwesome,
} from "@expo/vector-icons"
const SelectVersion = ({
    title,
    lists,
    onChange,
    select
}) => {
    return (
        <View className='p-2 border-b-[1px] border-y-neutral-200'>
            <Text className='py-2'>{title}</Text>
            <View className='flex-row items-center'>
                {lists.map((item, index) => (
                    <TouchableOpacity key={index} className={item.name === select ?
                        "bg-white min-w-[60px] p-2 border-[2px] mx-1 my-1 rounded-lg border-blue-400 transition-all flex-row justify-center items-center" :
                        "bg-stone-300 min-w-[60px] p-2 border-[2px] border-neutral-200 mx-1 my-1 rounded-lg transition-all flex-row justify-center items-center"} onPress={() => onChange(item)}>
                        <Text className={item.name === select ? "text-blue-600" : " "}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    )
}

export default SelectVersion