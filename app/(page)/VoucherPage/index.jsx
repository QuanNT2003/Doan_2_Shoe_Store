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
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Tab, TabView } from '@rneui/themed';
import VoucherItem from "../../components/VoucherItem";

const VoucherPage = () => {
    const router = useRouter()
    const { position } = useLocalSearchParams()

    const [index, setIndex] = useState(0);
    const [saleResult, setSaleResult] = useState([
        { id: 1, classify: 'sale', rank: 1 }, { id: 2, classify: 'sale', rank: 0 }
    ])
    const [shipResult, setShipResult] = useState([
        { id: 1, classify: 'ship', rank: 2 }, { id: 2, classify: 'ship', rank: 1 }
    ])
    const [payResult, setPayResult] = useState([
        { id: 1, classify: 'pay', rank: 3 }, { id: 2, classify: 'pay', rank: 2 }
    ])
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
                        renderItem={({ item }) => <VoucherItem discount={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={shipResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <VoucherItem discount={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={payResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <VoucherItem discount={item} />}

                    />
                </TabView.Item>
            </TabView>
        </>
    )
}

export default VoucherPage