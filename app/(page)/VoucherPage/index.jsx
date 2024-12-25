import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    Modal,
    FlatList,
    Alert,
    ToastAndroid,
    useWindowDimensions,
} from "react-native"
import {
    FontAwesome5,
} from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Tab, TabView } from '@rneui/themed';
import VoucherItem from "../../components/VoucherItem";
import * as PromotionCartServices from '../../apiServices/promotionCartServices'
import * as asyncStorage from "../../store/asyncStorage"
import * as UserServices from '../../apiServices/userServices';
const VoucherPage = () => {
    const router = useRouter()
    const { position } = useLocalSearchParams()

    const [index, setIndex] = useState(0);
    const [saleResult, setSaleResult] = useState([])
    const [shipResult, setShipResult] = useState([])
    const [payResult, setPayResult] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const login = await asyncStorage.getIsLogin()
            // setIsLogin(login)
            if (login === 'true') {
                const id = await asyncStorage.getIdAsync()
                // console.log("id", id);

                const result = await UserServices.getUser(id)
                console.log("result", result);
                const resultVoucher = await PromotionCartServices.getAllCarts({ user: result.data._id })
                    .catch((err) => {
                        console.log(err);
                    });

                if (resultVoucher) {
                    // console.log(resultVoucher);
                    setPayResult(resultVoucher.pay)
                    setSaleResult(resultVoucher.sale)
                    setShipResult(resultVoucher.ship)
                }

            }



        }

        fetchApi();



    }, []);
    return (
        < >
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'blue',
                    height: 2,
                }}
                scrollable
            >
                <Tab.Item

                    title="Voucher giảm giá"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 0 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',

                    }}

                />
                <Tab.Item
                    title="Voucher ship"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 1 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />
                <Tab.Item
                    title="Voucher thanh toán"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 2 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item >
                    <FlatList
                        data={saleResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <VoucherItem discountCart={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={shipResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <VoucherItem discountCart={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={payResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <VoucherItem discountCart={item} />}

                    />
                </TabView.Item>
            </TabView>
        </>
    )
}

export default VoucherPage