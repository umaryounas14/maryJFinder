import React, { useState } from 'react';
  import { StyleSheet, Dimensions } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  const { width } = Dimensions.get('window');

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownInput = () => {
    const [value, setValue] = useState(null);

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Business Type*"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
    );
  };

  export default DropdownInput;

  const styles = StyleSheet.create({
    dropdown: {
      width: width * 0.9, // Adjust the percentage as needed
      margin: 5,
        height: 45,
        marginRight: 25,
        borderRadius: 15,
        padding: 20,
        borderWidth: 1, // Add border width
        borderColor: '#ddd', // Add border color 
        },

      item: {
        padding: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red'

      },
      placeholderStyle: {
        fontSize: 15,
        color: '#949494'
      },
      selectedTextStyle: {
        fontSize: 15,
        color: '#949494'
      },
    
      inputSearchStyle: {
        height: 40,
        fontSize: 10,
        borderRadius:10,
      },
    });