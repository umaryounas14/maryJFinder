// DatePickerModal.js
import React, { useState } from 'react';
import { View, Modal, Button, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerModal = ({ visible, onConfirm, onCancel, date, mode }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleConfirm = () => {
    onConfirm(selectedDate);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.datePickerContainer}>
          <DatePicker
            date={selectedDate}
            onDateChange={setSelectedDate}
            mode={mode}
          />
          <View style={styles.buttonContainer}>
            <Button title="Done" onPress={handleConfirm} />
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});

export default DatePickerModal;
