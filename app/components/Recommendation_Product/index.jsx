import {
    View,
    FlatList,
    Text
} from "react-native";
import Product_item from "../product_item/product_item";


const Recommen_List = ({ list }) => {
    return (
        <View className='bg-white rounded-lg my-3 p-2 w-[100%] flex-1'>
            <Text className='ml-2 mb-3 text-[18px] font-bold'>Dành cho bạn</Text>
            <FlatList
                data={list}
                className='mx-2 bg-transparent'
                numColumns={2}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <View className='w-[50%] my-2 flex items-center justify-center'>
                    <Product_item item={item} />
                </View>}
                ListFooterComponent={<View className='mb-10'></View>}
                nestedScrollEnabled
                scrollEnabled={false}

            />
        </View>

    );
}

export default Recommen_List