import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const MultiSelectComp = ({ title, items, selectedItems, setSelectedItems, single }) => {

    return (
        <View className='p-2 border-b-[1px] border-y-neutral-200'>
            <Text className='py-2'>{title}</Text>
            <MultiSelect
                items={items}
                uniqueKey="id"
                single={single}
                onSelectedItemsChange={setSelectedItems}
                selectedItems={selectedItems}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchIcon={false}
                styleInputGroup={{
                    color: '#CCC',
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#e5e5e5",
                    borderRadius: 10,
                }}
                submitButtonColor="#3b82f6"
                submitButtonText="Submit"
            />
        </View>

    )

}


export default MultiSelectComp

