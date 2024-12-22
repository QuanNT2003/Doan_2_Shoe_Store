import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native"
import {
    FontAwesome6
} from "@expo/vector-icons"
import Notifi_Item from "../components/Notification_Item"
import * as NotifiServices from '../apiServices/notifiServices'
import { useEffect, useState } from "react"
import * as asyncStorage from "../store/asyncStorage"
const data = [
    {
        id: "1",
        namePage: "CLB Sách và hành động",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: true,
    },
    {
        id: "2",
        namePage: "CLB Làn sóng",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: false,
    },
    {
        id: "3",
        namePage: "CLB Bóng đá",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: true,
    },
    {
        id: 4,
        namePage: "CLB nhận thức",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: true,
    },
    {
        id: 5,
        namePage: "CLB Sách và hành động",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: true,
    },
    {
        id: 6,
        namePage: "CLB Sách và hành động",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: false,
    },
    {
        id: 7,
        namePage: "CLB Sách và hành động",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: true,
    },
    {
        id: 8,
        namePage: "CLB Sách và hành động",
        des: "Đã nhắc đế bạn và nhiều người khác trong bài viết của họ ",
        time: "20/05/2024 15:30",
        read: false,
    },
]
function notification() {
    const [list, setList] = useState([])
    const [day, setDay] = useState(new Date())


    useEffect(() => {
        const fetch = async () => {
            const id = await asyncStorage.getIdAsync()
            // console.log(id);

            const notifiResult = await NotifiServices.getAllNotifi({
                userId: id
            })
            if (notifiResult) {
                setList(notifiResult.data)
                // console.log(notifiResult);

            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setRead = async () => {
        let newList = list

        newList.map((item, index) => {
            newList[index].status = true
            // updateNotifis(newList[index])
        })
        setList(newList)
        setDay(new Date())
    }

    const updateNotifis = async (item) => {
        const notifiResult = await NotifiServices.updateNotifi(
            item._id,
            item,
        )
        if (notifiResult) {

        }
    }
    useEffect(() => { }, [day])
    return (
        <View className='flex-1 mt-2'>
            <View className='mx-1 mb-3 flex flex-row items-center justify-between '>
                <Text className='px-2 text-[17px] font-bold'>Mới</Text>
                <TouchableOpacity onPress={() => setRead()}>
                    <View className='flex flex-row items-center justify-between '>
                        <FontAwesome6 name='list-check' />
                        <Text className='mx-2'>Đánh dấu đã đọc</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                className='mx-2 bg-transparent'
                renderItem={({ item }) => <Notifi_Item item={item}
                />}
                ListFooterComponent={<View className='mb-20'></View>}
            />
        </View>
    );
}

export default notification;