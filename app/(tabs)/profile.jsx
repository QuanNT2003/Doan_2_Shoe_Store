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
import { useRouter } from "expo-router"
import {
    FontAwesome5,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import LogoWithName from "../../assets/images/sample.jpg"
function profile() {
    const router = useRouter()
    return (
        <View>
            <View className='flex-row bg-cyan-600 p-3 items-center mb-3'>
                {/* <Image
                    source={LogoWithName}
                    className='h-[100px] w-[100px] m-3 rounded-full'
                />
                <View>
                    <Text className='text-[18px] font-bold mb-2'> Ngo Trung Quan</Text>
                    <Text>Hội viên tiềm năng</Text>
                </View> */}
                <Image
                    source={LogoWithName}
                    className='h-[100px] w-[100px] m-3 rounded-full'
                />
                <TouchableOpacity onPress={() => router.push({ pathname: "(page)/Login" })}>
                    <Text className='text-white font-bold text-[18px]'>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View className='bg-white px-3 my-2'>
                <TouchableOpacity className='flex flex-row min-h-[60px] justify-between items-center border-b-[1px] border-y-neutral-200' onPress={() => router.push({ pathname: "(page)/OrderPage", params: { position: 0 } })}>
                    <View className='flex flex-row items-center'>
                        <View className='m-3'>
                            <FontAwesome5 name='clipboard-list' size={20} color="#60a5fa" solid />
                        </View>

                        <Text className='text-[18px]'>Đơn mua</Text>
                    </View>
                    <View className='flex flex-row items-center' >
                        <Text className='text-[12px] mr-2 text-gray-400'>Xem tất cả đơn hàng</Text>
                        <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                    </View>
                </TouchableOpacity>
                <View className='flex flex-row min-h-[60px] justify-between border-b-[1px] border-y-neutral-200'>
                    <TouchableOpacity className='flex items-center' onPress={() => router.push({ pathname: "(page)/OrderPage", params: { position: 0 } })}>
                        <View className='m-3'>
                            <FontAwesome5 name='wallet' size={20} />
                        </View>

                        <Text className='text-[12px] mb-2'>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex items-center' onPress={() => router.push({ pathname: "(page)/OrderPage", params: { position: 1 } })}>
                        <View className='m-3'>
                            <FontAwesome5 name='shipping-fast' size={20} />
                        </View>

                        <Text className='text-[12px] mb-2'>Chờ vận chuyển</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex items-center' onPress={() => router.push({ pathname: "(page)/OrderPage", params: { position: 2 } })}>
                        <View className='m-3'>
                            <FontAwesome5 name='box' size={20} />
                        </View>

                        <Text className='text-[12px] mb-2'>Chờ giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex items-center' onPress={() => router.push({ pathname: "(page)/OrderPage", params: { position: 3 } })}>
                        <View className='m-3'>
                            <FontAwesome5 name='box-open' size={20} />
                        </View>

                        <Text className='text-[12px] mb-2'>Đã nhận</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className='flex flex-row min-h-[60px] justify-between items-center border-b-[1px] border-y-neutral-200' onPress={() => router.push({ pathname: "(page)/ReturnPage", params: { position: 0 } })}>
                    <View className='flex flex-row items-center'>
                        <View className='m-3'>
                            <FontAwesome5 name='clipboard' size={20} color="#f87171" solid />
                        </View>

                        <Text className='text-[18px]'>Đơn hoàn trả</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-[12px] mr-2 text-gray-400'>Xem tất cả đơn hoàn hàng</Text>
                        <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row min-h-[60px] justify-between items-center border-b-[1px] border-y-neutral-200'>
                    <View className='flex flex-row items-center'>
                        <View className='m-3'>
                            <FontAwesome5 name='cart-plus' size={20} color="#facc15" solid />
                        </View>

                        <Text className='text-[18px]'>Mua lại</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-[12px] mr-2 text-gray-400'>Xem tất cả sản phẩm</Text>
                        <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                    </View>
                </TouchableOpacity>
            </View>
            <View className='bg-white px-3 my-2'>
                <TouchableOpacity className='flex flex-row min-h-[60px] justify-between items-center border-b-[1px] border-y-neutral-200' onPress={() => router.push({ pathname: "(page)/VoucherPage", params: { position: 1 } })}>
                    <View className='flex flex-row items-center'>
                        <View className='m-3'>
                            <MaterialCommunityIcons name='sale' size={20} color="#facc15" solid />
                        </View>

                        <Text className='text-[18px]'>Ví voucher</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-[12px] mr-2 text-gray-400'>Xem tất cả</Text>
                        <FontAwesome5 name='chevron-right' size={14} color='#9ca3af' solid />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row min-h-[60px] items-center border-b-[1px] border-y-neutral-200' onPress={() => router.push({ pathname: "(page)/UserDetail" })}>
                    <View className='m-3'>
                        <FontAwesome5 name='user' size={20} color="#60a5fa" solid />
                    </View>

                    <Text className='text-[18px]'>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row min-h-[60px] items-center border-b-[1px] border-y-neutral-200'>
                    <View className='m-3'>
                        <MaterialCommunityIcons name='logout' size={20} color="#f87171" solid />
                    </View>

                    <Text className='text-[18px]'>Đăng xuất</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default profile;