import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['July', 'August', 'September'],
  datasets: [
    {
      data: [17500, 20000, 22500, 22500, 22500], // Projected Impressions
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
      strokeWidth: 2,
    },
    {
      data: [2500, 3000, 3500, 3500, 3500], // Projected Clicks
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
      strokeWidth: 2,
    },
  ],
  legend: ['Projected Impressions', 'Projected Clicks'],
};

const ctrData = [14.0, 15.0, 14.5]; // Projected CTR (%)

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  
  decimalPlaces: 0, // Avoid decimal places for simplicity
  propsForLabels: {
    fontSize: 10,
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const PredictiveAnalysisGraph = () => {
  const chartHeight = 300;
  const chartPadding = 20; // Padding to keep the line within bounds
  const maxCTR = Math.max(...ctrData);
  const minCTR = Math.min(...ctrData);
  const ctrPoints = ctrData.map((value, index) => ({
    x: (index * (screenWidth - 100)) / (ctrData.length - 1) + 50, // adjust for padding/margin
    y: chartHeight - chartPadding - ((value - minCTR) * (chartHeight - 3 * chartPadding)) / (maxCTR - minCTR), // adjust for padding
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predictive Analytics / Forecasting</Text>
      <View>
        <LineChart
          data={data}
          width={screenWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          style={styles.chart}
          withShadow={false}
          withInnerLines ={false}

        />
        <Svg height={chartHeight} width={screenWidth} style={[styles.overlay, { paddingHorizontal: 10 }]}>
          {ctrPoints.map((point, index) => (
            index > 0 && (
              <Line
                key={`line-${index}`}
                x1={ctrPoints[index - 1].x}
                y1={ctrPoints[index - 1].y}
                x2={point.x}
                y2={point.y}
                stroke="green"
                strokeDasharray="3,5"
              />
            )
          ))}
          {ctrPoints.map((point, index) => (
            <Circle key={`circle-${index}`} cx={point.x} cy={point.y} r="2" fill="green" />
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default PredictiveAnalysisGraph;
