import { View, Text } from "react-native"
import { Tabs, Redirect } from "expo-router"
import {
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons"
import HeaderCustom from "../components/HeaderCustom"

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='flex items-center justify-center gap-1'>
            {icon}
            {/* <Text
        className={`${focused ? "font-bold" : "font-semibold"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
        </View>
    )
}


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#3A57E8",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "#FFFFFF",
                    borderColor: "transparent",
                    height: 60,
                    borderRadius: 100,
                    margin: 15,
                },
            }}
        >
            {/* <Tabs.Screen name='report' options={{ href: null }} />
        <Tabs.Screen name='pagemana' options={{ href: null }} /> */}

            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    header: () => (<HeaderCustom />),
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<Entypo name='home' size={24} color={color} />}
                            color={color}
                            name='Trang chủ'
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='discount'
                options={{
                    title: "discount",
                    header: () => (<HeaderCustom />),
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<FontAwesome name='percent' size={24} color={color} />}
                            color={color}
                            name='Tìm kiếm'
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='notification'
                options={{
                    title: "Notifications",
                    header: () => (<HeaderCustom />),
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<Ionicons name='notifications' size={24} color={color} />}
                            color={color}
                            name='Thông báo'
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    header: () => (<HeaderCustom />),
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={
                                <MaterialIcons name='account-circle' size={24} color={color} />
                            }
                            color={color}
                            name='Tài khoản'
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabsLayout
