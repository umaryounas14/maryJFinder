import React from 'react';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const LineChartComponent = ({ data, lineColor, title, label }) => {
  // Extract months and impressions
  const months = data.map((item, index) => ({ index, month: item.month }));
  const impressions = data.map(item => item.impressions);
  const ctr = data.map(item => item.ctr);

  return (
    <View style={{ height: 300, padding: 20 }}>
      {/* Render the title */}
      {title && (
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
          {title}
        </Text>
      )}
      
      {/* Render the label */}
      <View style={{ flexDirection: 'row', marginBottom: 20, marginLeft: 10 }}>
        <Text style={{ color: lineColor || 'rgb(134, 65, 244)' }}>{label}</Text>
        {/* Add additional space if needed */}
      </View>
      
      <LineChart
        style={{ flex: 1 }}
        data={impressions}
        contentInset={{ bottom: -1, left: 10, right: 10 }}
        svg={{ stroke: lineColor || 'rgb(134, 65, 244)' }}
      >
        <Grid svg={{ stroke: '#b5b3ac', strokeWidth: 0.5 }} />
      </LineChart>
      
      <YAxis
        style={{ position: 'absolute', top: 0, bottom: 0, left: -5, marginLeft: 10 }}
        data={impressions}
        contentInset={{ top: 30, bottom: 50 }}
        svg={{ fontSize: 10, fill: 'black' }}
        numberOfTicks={10}
        min={0}
        formatLabel={(value) => value}
      />
      
      <XAxis
        style={{ marginTop: 10 }}
        data={months}
        formatLabel={(value, index) => months[index].month}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 10, fill: 'black' }}
      />
    </View>
  );
};

export default LineChartComponent;
