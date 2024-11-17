import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, TextInput, Platform, View, Text } from 'react-native';

function MDateTimePicker({
    dateTime,
    setDateTime,
}) {
    const [showPicker, setShowPicker] = useState(false)
    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = (event, selectedDate) => {
        if (event.type === "set") {
            const currentDate = selectedDate || date;
            setDateTime(currentDate);
            if (Platform.OS === 'android') {
                setShowPicker(false); // Hide the picker after date is selected on Android
            }
        } else {
            setShowPicker(false); // Dismiss picker if the action is 'dismissed'
        }
    };
    return (
        <View>
            <Text className='mb-2'>Ngày sinh</Text>
            {
                showPicker && (
                    <DateTimePicker
                        onChange={onChange}
                        value={dateTime}
                        mode="date"
                        display="spinner"
                    />
                )
            }
            {
                !showPicker && (
                    <Pressable onPress={toggleDatePicker}>
                        <TextInput
                            placeholder={'Chọn ngày sinh'}
                            value={dateTime.toLocaleDateString()}
                            editable={false}
                            onPressIn={toggleDatePicker}
                            className='px-2 py-2 font-semibold text-base border w-[100%] rounded-2xl'
                        />
                    </Pressable>
                )
            }
        </View>
    );
}

export default MDateTimePicker;