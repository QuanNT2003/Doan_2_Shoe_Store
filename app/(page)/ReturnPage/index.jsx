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
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Tab, TabView } from '@rneui/themed';
import ReturnItem from "../../components/ReturnItem";
import * as ReturnServices from '../../apiServices/returnServices'
import * as asyncStorage from "../../store/asyncStorage"
import * as UserServices from '../../apiServices/userServices';
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const ReturnPage = () => {
    const router = useRouter()
    const { position } = useLocalSearchParams()

    const [index, setIndex] = useState(0);

    const [listReceving, setListReceving] = useState([])
    const [listReceved, setListReceved] = useState([])
    const [listDelivering, setListDelivering] = useState([])
    const [listDelivered, setListDelivered] = useState([])
    const [listCanceled, setListCanceled] = useState([])
    useEffect(() => {
        if (asyncStorage.getIsLogin() === 'false') {
            showToastWithGravity("Bạn chưa đăng nhập")
        }
        const fetch = async () => {
            const id = await asyncStorage.getIdAsync()
            const userResult = await UserServices.getUser(id)
            let users = []
            users.push({ value: userResult.data._id })
            const response = await ReturnServices.getAllReturn({
                user: users
            })
                .catch((error) => {


                    if (error?.response?.status === 404) {
                        // setData([]);
                    } else {
                        showToastWithGravity('Có lỗi xảy ra');
                    }
                });

            if (response) {
                // setData(response.data);
                // console.log(response.data);
                setListReceving(response.data.filter((item) => item?.status === 'receiving'));
                setListReceved(response.data.filter((item) => item?.status === 'received'));
                setListDelivering(response.data.filter((item) => item?.status === 'delivering'));
                setListDelivered(response.data.filter((item) => item?.status === 'delivered'));
                setListCanceled(response.data.filter((item) => item?.status === 'cancelled'));
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        data={listReceving}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={listReceved}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={listDelivering}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={listDelivered}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
                <TabView.Item >
                    <FlatList
                        data={listCanceled}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        renderItem={({ item }) => <ReturnItem item={item} />}

                    />
                </TabView.Item>
            </TabView>
        </>
    )
}

export default ReturnPage