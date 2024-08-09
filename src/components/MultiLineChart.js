import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const data = {
  labels: ["30", "07", "14", "21", "20"],
  datasets: [
    {
      data: [40, 35, 50, 40, 30, 45],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Edibles that help me sleep
      strokeWidth: 1
    },
    {
      data: [30, 6, 35, 45, 10, 35],
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // CBD oil for anxiety
      strokeWidth: 1,
      strokeDashArray: [2, 2], // dashed line
    },
    {
      data: [40, 8, 25, 25, 10, 25],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // THC vape pens
      strokeWidth: 1
    },
    {
      data: [10, 30, 45, 25, 12, 15],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Strongest pre-rolls
      strokeWidth: 1
    },
    {
      data: [5, 15, 10, 9, 15, 39],
      color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Pain relief tinctures
      strokeWidth: 1
    },
    {
      data: [5, 9, 7, 12, 9, 8],
      color: (opacity = 1) => `rgba(0, 200, 200, ${opacity})`, // CTR
      strokeWidth: 1,
      strokeDashArray: [2, 2], // dashed line
    },
    {
      data: [2, 32, 3, 16, 28, 3],
      color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Conversion Rate
      strokeWidth: 1,
      strokeDashArray: [2, 2], // dashed line
    }
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#f0f0f0",
  fillShadowGradientOpacity: 0,
  backgroundGradientTo: "#f0f0f0",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  decimalPlaces: 0, // optional, defaults to 2dp
  propsForDots: {
    r: "2",
    strokeWidth: "3",
  },
  propsForLabels: {
    fontSize: 10,
    fontWeight: 'bold',
  }
};
const legend = ["Edibles that help me sleep", "CBD oil for anxiety", "THC vape pens", "Strongest pre-rolls", "Pain relief tinctures", "CTR", "Conversion Rate"];

const MultiLineChart = () => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });

  return (
    <ScrollView style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth} // reduce width for padding
        height={300} // increase height for better visibility
        chartConfig={chartConfig}
        style={styles.chart}
        withInnerLines ={false}
        verticalLabelRotation={0} // rotate labels for better readability
        withVerticalLabels={true} // remove vertical labels
        withShadow={false}
        onDataPointClick={(data) => {
          let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y);

          isSamePoint ? setTooltipPos((previousState) => {
            return {
              ...previousState,
              value: data.value,
              visible: !previousState.visible
            }
          })
            : setTooltipPos({ x: data.x, y: data.y, value: data.value, visible: true });
        }}
      />
      {tooltipPos.visible && (
        <View style={{
          position: 'absolute',
          top: tooltipPos.y - 20,
          left: tooltipPos.x + 10,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 5,
          elevation: 5
        }}>
          <Text style={{ fontSize: 12 }}>{tooltipPos.value}</Text>
        </View>
      )}
      <View style={styles.legendContainer}>
        {legend.map((legend, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: data.datasets[index].color(1) }]} />
            <Text style={styles.legendText}>{legend}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16
  },
  chart: {
    marginVertical: 5,
    borderRadius: 10,
    marginLeft: -25
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 8
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginRight: 5
  },
  legendText: {
    fontSize: 10
  }
});

export default MultiLineChart;
