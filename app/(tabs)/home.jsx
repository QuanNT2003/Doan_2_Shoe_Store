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

function home() {
    return (
        <View>
            <Text>Home</Text>
            <View className='flex flex-row '>
                <Product_item />
                <Product_item />
            </View>

        </View>
    );
}

export default home;