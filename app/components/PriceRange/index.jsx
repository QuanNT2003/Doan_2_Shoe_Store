import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const PriceRange = ({ title, fromPrice, setFromPrice, toPrice, setToPrice }) => {
    const onChangedFrom = (text) => {
        setFromPrice(text.replace(/[^0-9]/g, ''))

    }
    const onChangedTo = (text) => {
        setToPrice(text.replace(/[^0-9]/g, ''))

    }
    return (
        <View className='p-2 border-b-[1px] border-y-neutral-200'>
            <Text className='py-2'>{title}</Text>
            <View className='flex-row justify-around items-center'>
                <TextInput
                    className='w-[45%] rounded-md p-1 border-[1px] border-neutral-200'
                    keyboardType="numeric"
                    onChangeText={onChangedFrom}
                    value={fromPrice}
                />
                <Text>to</Text>
                <TextInput
                    className='w-[45%] rounded-md p-1 border-[1px] border-neutral-200'
                    keyboardType="numeric"
                    onChangeText={onChangedTo}
                    value={toPrice}
                />
            </View>
        </View>

    )

}


export default PriceRange