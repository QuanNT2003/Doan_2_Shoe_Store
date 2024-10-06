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
    SectionList,
} from "react-native";
import Product_item from "../components/product_item/product_item";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel"
import Product_List from "../components/ProductList";
import Recommen_List from "../components/Recommendation_Product";
function home() {
    const listItem = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]
    return (
        <View className='relative flex h-full flex-1 flex-col'>
            <ScrollView className='flex' showsVerticalScrollIndicator={false}>
                <Carousel />
                <Product_List list={listItem} title={'Sản phẩm mới'} />
                <Product_List list={listItem} title={'Siêu khuyến mãi'} />
                <Recommen_List list={listItem} />
            </ScrollView>

        </View>


    );
}

export default home;