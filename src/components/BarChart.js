import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

const BarChartComponent = () => {
  const fill = 'rgb(134, 65, 244)';
  const data = [50, 10, 40, 75, 24, 40, 50, 80];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <YAxis
          style={{ marginLeft: 10 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={10}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ height: 300, marginLeft: 10 }}
            data={data}
            svg={{ fill }}
            contentInset={{ top: 30, bottom: 30 }}
            horizontal={true}
          >
          </BarChart>
          <XAxis
            style={{ marginTop: 10 }}
            data={data}
            formatLabel={(value, index) => `${index + 2}`}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 10
  },
  chartContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default BarChartComponent;
