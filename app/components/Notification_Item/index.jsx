import React from "react"
import { Image, Text, View } from "react-native"
import logo from "../../../assets/images/Logo-with-name.png"
import { format } from 'date-fns';
const Notifi_Item = ({ item }) => {
  return (
    <View
      className={
        item.status === true
          ? "flex h-[90px] my-1 w-full flex-row items-center bg-white"
          : "flex h-[90px] my-1 w-full flex-row items-center bg-cyan-100"
      }
    >
      <View className='text-wrap flex h-[100%] w-[20%] items-center justify-center'>
        <Image
          source={logo}
          className='me-4 h-[90%] w-[90%] rounded-full bg-white '
        />
      </View>

      <View className='h-[100%] w-[80%] pt-2'>
        <View className='relative mb-4 text-[15px]'>
          <Text>
            <Text className='font-semibold'>{item.title} </Text>
            {item.note}
          </Text>
        </View>
        <Text className='text-[13px] '>{format(new Date(item?.createdAt), 'dd MMM yyyy - HH:mm')}</Text>
      </View>
    </View>
  )
}

export default Notifi_Item
