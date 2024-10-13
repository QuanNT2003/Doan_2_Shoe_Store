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
import DiscountList from "../components/DiscountList";
import Product_item from "../components/product_item/product_item";
import Recommen_List from "../components/Recommendation_Product";

function discount() {
    const discount = [{
        name: "Giảm giá tháng 6",
        discountId: "ds00000008",
        note: "",
        typeDiscount: true,
        classify: "payment",
        apply: 700000,
        value: 30,
        status: true,
        startDay: "2024-06-01T00:00:00.000Z",
        endDay: "2024-06-30T00:00:00.000Z",
    },
    {
        name: "Giảm giá tháng 6",
        discountId: "ds00000008",
        note: "",
        typeDiscount: true,
        classify: "ship",
        apply: 700000,
        value: 30,
        status: true,
        startDay: "2024-06-01T00:00:00.000Z",
        endDay: "2024-06-30T00:00:00.000Z",
    },
    {
        name: "Giảm giá tháng 6",
        discountId: "ds00000008",
        note: "",
        typeDiscount: true,
        classify: "sale",
        apply: 700000,
        value: 30,
        status: true,
        startDay: "2024-06-01T00:00:00.000Z",
        endDay: "2024-06-30T00:00:00.000Z",
    },
    ]
    const listItem = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }
    ]
    return (
        <View className='flex-1'>
            <ScrollView className='flex' showsVerticalScrollIndicator={false}>
                <DiscountList list={discount} title={'Giảm giá sản phẩm'} />
                <DiscountList list={discount} title={'Ưu đãi vẫn chuyển'} />
                <DiscountList list={discount} title={'Giảm phí thanh toán'} />
                <Recommen_List list={listItem} />
            </ScrollView>
        </View>
    );
}

export default discount;