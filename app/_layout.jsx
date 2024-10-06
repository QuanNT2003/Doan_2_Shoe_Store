import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const RootLayout = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#e9ecef] '>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  )
}

export default RootLayout