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
import OrderItem from "../../components/OrderItem";
import ReturnItem from "../../components/ReturnItem";

const ReturnPage = () => {
    const router = useRouter()
    const { position } = useLocalSearchParams()

    const [index, setIndex] = useState(0);
    const [searchResult, setSearchResult] = useState([
        { id: 1 }, { id: 2 }
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
                    title="Đang tiếp nhận"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 0 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',

                    }}

                />
                <Tab.Item
                    title="Đã tiếp nhận"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 1 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />
                <Tab.Item
                    title="Đang giao"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 2 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />
                <Tab.Item
                    title="Đã giao"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 3 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />
                <Tab.Item
                    title="Đã hủy"
                    titleStyle={{
                        fontSize: 14,
                        color: index === 4 ? 'blue' : 'black',
                        width: 150, // Điều chỉnh chiều rộng để vừa với nội dung
                        textAlign: 'center',
                    }}
                />

            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item >
                    <FlatList
                        data={searchResult}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <Text>Đơn hàng đã tiếp nhận</Text>
                </TabView.Item>
                <TabView.Item >
                    <Text>Đơn hàng đang vận chuyển</Text>
                </TabView.Item>
                <TabView.Item >
                    <Text>Đơn hàng đã giao</Text>
                </TabView.Item>
                <TabView.Item >
                    <Text>Đơn hàng đã hủy</Text>
                </TabView.Item>
            </TabView>
        </>
    )
}

export default ReturnPage