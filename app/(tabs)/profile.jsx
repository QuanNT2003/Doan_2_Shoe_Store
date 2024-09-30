import {
    View,
    Text,
    RefreshControl,
    Image,
    Pressable,
    ActivityIndicator,
    ScrollView,
    ToastAndroid,
    FlatList,
    Animated,
    TouchableOpacity,
} from "react-native"
import LogoWithName from "../../assets/images/sample.jpg"
function profile() {
    return (
        <View>
            <View className='flex-row bg-cyan-600 p-3 items-center'>
                <Image
                    source={LogoWithName}
                    className='h-[100px] w-[100px] m-3 rounded-full'
                />
                <View>
                    <Text className='text-[20px] font-bold mb-2'> Ngo Trung Quan</Text>
                    <Text> Hoi vien tiem nang</Text>
                </View>
            </View>
        </View>
    );
}

export default profile;