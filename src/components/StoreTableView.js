import React from 'react';
import {Table, Row} from 'react-native-table-component';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const StoreTableView = ({data}) => {
  const styles = {...defaultStyles};

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Table>
          {data.map((rowData, index) => (
            <Row
              key={index}
              data={rowData.map((cellData, cellIndex) => {
                if (index === 0) {
                  return <Text style={styles.textBold}>{cellData}</Text>;
                } else if (cellIndex <= 1) {
                  return (
                    <Text style={[styles.text, {color: 'black'}]}>
                      {cellData}
                    </Text>
                  );
                } else if (cellIndex === 5) {
                  // Render Activate/Edit button
                  const isActivateButton = cellData === 'Activate';
                  return (
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: isActivateButton
                            ? '#099D63'
                            : '#FF0000',
                        },
                      ]}
                      onPress={() => {
                        // Handle button press action here
                        console.log(cellData + ' pressed');
                      }}>
                      <Text style={styles.actionButtonText}>{cellData}</Text>
                    </TouchableOpacity>
                  );
                }
                return <Text style={styles.text}>{cellData}</Text>;
              })}
              style={styles.row}
            />
          ))}
        </Table>
      </ScrollView>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    marginBottom: 100,
    marginHorizontal: 5,
    height: 120,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 13,
    width: 120,
    color: 'black'
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    width: 120,
    color: 'black'
  },
  actionButton: {
    backgroundColor: '#099D63',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default StoreTableView;
