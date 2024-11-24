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
} from "react-native"
import {
    MaterialCommunityIcons,
    FontAwesome5
} from "@expo/vector-icons"
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import InputCustom from "../../components/InputCustom"
import LogoWithName from "../../../assets/images/Logo-with-name.png"
import * as asyncStorage from "../../store/asyncStorage"
import { WebView } from 'react-native-webview';
const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
}
const ChatView = () => {
    const router = useRouter()

    return (
        <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            automaticallyAdjustContentInsets={false}
            startInLoadingState={true}
            source={{
                html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tidio Chat</title>
        <script async src="https://code.tidio.co/ggjdlzaklc2msf4audpx31nouw8kdocu.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function () {
            // Đợi Tidio API sẵn sàng, sau đó mở chatbox
            window.tidioChatApi?.on("ready", function () {
              window.tidioChatApi.open();
            });
          });
        </script>
      </head>
      <body></body>
      </html>
    `,
            }}
        />
        // <WebView
        //     javaScriptEnabled={true} // Cho phép JavaScript
        //     domStorageEnabled={true} // Hỗ trợ DOM Storage
        //     originWhitelist={['*']} // Cho phép mọi nguồn
        //     automaticallyAdjustContentInsets={false} // Không tự điều chỉnh nội dung
        //     startInLoadingState={true} // Hiển thị trạng thái tải
        //     source={{
        //         html: `
        //   <!DOCTYPE html>
        //   <html lang="en">
        //   <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Tidio Chat</title>
        //     <script>
        //     document.tidioChatConfig = {
        //         open: true // Chatbox luôn mở
        //     };
        //     </script>
        //     <script async src="https://code.tidio.co/ggjdlzaklc2msf4audpx31nouw8kdocu.js"></script>
        //   </head>
        //   <body>
        //   </body>
        //   </html>
        // `,
        //     }}
        // />



    )
}

export default ChatView