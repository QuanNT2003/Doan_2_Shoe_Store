import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import {
  FontAwesome5,
} from "@expo/vector-icons"

function InputCustom({
  value,
  placeholder,
  handleChange,
  error,
  title,
  require,
  area,
  password,
}) {
  const [hidden, setHidden] = useState(true)
  return (
    <View className='mt-1 flex flex-col'>
      <Text className='mb-1 text-base'>
        {title} {require ? <Text className='text-red-500'>*</Text> : ""}
      </Text>
      <View className='flex flex-row items-center justify-center gap-2'>
        <TextInput
          className={
            error === "" || error === undefined
              ? "flex-1 rounded border p-1 text-base font-semibold"
              : "flex-1 rounded border border-red-500 p-1 text-base font-semibold"
          }
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          multiline={area}
          secureTextEntry={password ? hidden : false}
        ></TextInput>
        {password &&
          (hidden === true ? (
            <TouchableOpacity onPress={() => setHidden(false)}>
              <FontAwesome5 name='eye' color="#888" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setHidden(true)}>
              <FontAwesome5 name='eye-slash' />
            </TouchableOpacity>
          ))}
      </View>

      {error === "" ? (
        <Text></Text>
      ) : (
        <Text className='mt-1 text-red-500'>{error}</Text>
      )}
    </View>
  )
}

export default InputCustom
