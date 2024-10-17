import { Stack } from "expo-router"
import React from "react"
import HeaderCustom from "../components/HeaderCustom"

import { Text, TextInput, TouchableOpacity, View } from "react-native"
const PageLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: true,
            header: () => (
                <HeaderCustom backButton />
            ),
            headerBackVisible: true,
        }}>
            <Stack.Screen
                name="ProductDetail/[id]"
            />
        </Stack>
    )
}

export default PageLayout
