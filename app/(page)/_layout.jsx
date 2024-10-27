import { Stack } from "expo-router"
import React from "react"
import HeaderCustom from "../components/HeaderCustom"
import HeaderTitle from "../components/HeaderTitle"
const PageLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ProductDetail/[id]"
                options={{
                    headerShown: true,
                    header: () => (
                        <HeaderCustom backButton />
                    ),
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="ProductCollection/index"
                options={{
                    headerShown: true,
                    header: () => (
                        <HeaderCustom backButton />
                    ),
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="SearchPage/index"
                options={{
                    headerShown: false,

                }}
            />
            <Stack.Screen
                name="ShoppingCart/index"
                options={{
                    headerShown: true,
                    header: () => (
                        <HeaderTitle title={'Giỏ hàng'} />
                    ),
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen
                name="Order/index"
                options={{
                    headerShown: true,
                    header: () => (
                        <HeaderTitle title={'Đặt hàng'} />
                    ),
                    headerBackVisible: true,
                }}
            />
        </Stack>
    )
}

export default PageLayout
