import {
    ToastAndroid,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { WebView } from 'react-native-webview';
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const PaymentPage = () => {
    const router = useRouter()
    const { paymentUrl } = useLocalSearchParams()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
                automaticallyAdjustContentInsets={false}
                startInLoadingState={true}
                source={{ uri: paymentUrl }}
            />
        </SafeAreaView>

    )
}

export default PaymentPage