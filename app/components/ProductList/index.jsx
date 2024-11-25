import {
    View,
    FlatList,
    Text
} from "react-native";
import Product_item from "../product_item/product_item";
import {
    Dialog,
} from '@rneui/themed';

const Product_List = ({ list, title }) => {
    return (
        <View className='bg-white rounded-lg my-3 p-2 w-[100%] h-fit'>
            <Text className='ml-2 mb-3 text-[18px] font-bold'>{title}</Text>
            <FlatList
                data={list}
                className='m-3 bg-transparent'
                horizontal
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <Product_item item={item} />}
                ListFooterComponent={<View className='mr-96'></View>}
                ListEmptyComponent={
                    <Dialog isVisible={true} >
                        <Dialog.Loading />
                    </Dialog>}

            />
        </View>

    );
}

export default Product_List