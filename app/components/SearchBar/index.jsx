import { Text, TextInput, TouchableOpacity, View } from "react-native"
import {
    FontAwesome,
} from "@expo/vector-icons"
const SearchBar = ({
    value,
    placeholder,
    handleChange,
    search
}) => {
    return (
        <View className="flex border bg-white border-slate-300 flex-row items-center py-1 px-4 rounded-lg" >
            <TextInput
                className="text-sm min-w-[200px] w-[95%]"
                value={value}
                placeholder={placeholder}
                onChangeText={handleChange}
            />
            <TouchableOpacity onPress={search}>
                <FontAwesome name='search' size={20} />
            </TouchableOpacity>
        </View>

    )
}

export default SearchBar