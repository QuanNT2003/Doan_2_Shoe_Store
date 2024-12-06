import {
    ToastAndroid,
    Linking,
    View
} from "react-native"
import { useState, useEffect } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const PaymentPage = () => {
    const router = useRouter()
    const { paymentUrl } = useLocalSearchParams()

    useEffect(() => {
        const openPaymentUrl = async () => {
            try {
                if (paymentUrl) {
                    await Linking.openURL(paymentUrl);
                } else {
                    showToastWithGravity("Payment URL is invalid!");
                }
            } catch (err) {
                console.error("Error opening payment URL:", err);
                showToastWithGravity("Failed to open payment URL.");
            }
        };
        openPaymentUrl();
    }, [paymentUrl]);
    return (
        <View />

    )
}

export default PaymentPage