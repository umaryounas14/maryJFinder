import React from 'react';
import { Table, Row } from 'react-native-table-component';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

const TableComponent = ({ data, customStyles }) => {
  const styles = { ...defaultStyles, ...customStyles };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator ={false} horizontal>
        <Table>
          {data.map((rowData, index) => (
            <Row
              key={index}
              data={rowData.map((cellData, cellIndex) => {
                if (index === 0) {
                  return <Text style={styles.textBold}>{cellData}</Text>;
                } else if (cellIndex <= 1) {
                  return <Text style={[styles.text, {color: 'black'}]}>{cellData}</Text>;
                } else if (cellIndex === 6) {
                  return <Text style={[styles.text, {color: 'black'}]}>{cellData}</Text>;
                }
                return <Text style={styles.text}>{cellData}</Text>;
              })}
              style={[
                styles.row,
                index === 0 ? { backgroundColor: '#d3d3d3', borderRadius: 10 } : { backgroundColor: index % 2 ? 'transparent' : 'transparent' }
              ]}
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
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: 18,
  },
  row: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 14,
    width: 100,
    color: "black"
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    width: 100,
  },
});

export default TableComponent;
