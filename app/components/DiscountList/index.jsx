import {
    View,
    FlatList,
    Text
} from "react-native";
import Discount_Item from "../Discount_Item";


const DiscountList = ({ list, title, addToCart }) => {
    return (
        <View className='bg-white rounded-lg my-2 p-2 w-[100%] h-fit'>
            <Text className='ml-2 mb-3 text-[18px] font-bold'>{title}</Text>
            <FlatList
                data={list}
                className='m-3 bg-transparent'
                horizontal
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <Discount_Item discount={item} addToCart={addToCart} />}
                ListFooterComponent={<View className='mr-10'></View>}

            />
        </View>

    );
}

export default DiscountList