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
} from "react-native";
import Product_item from "../components/product_item/product_item";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel"
function home() {
    return (
        <View>
            <Text>Home</Text>
            <View className='flex flex-row '>
                <SearchBar placeholder={'Tim kiem san pham theo ten'} />
            </View>
            <Carousel />
        </View>
    );
}

export default home;