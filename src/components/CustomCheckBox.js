// CustomCheckbox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckbox = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#099D63',
    borderColor: '#099D63',
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
});

export default CustomCheckbox;
