import React from 'react';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { View, Text } from 'react-native';

const LineChartComponent = () => {
  const data = [
    { month: 'Jan', impressions: 50, ctr: 10 },
    { month: 'Feb', impressions: 10, ctr: 20 },
    { month: 'Mar', impressions: 40, ctr: 40 },
    { month: 'Apr', impressions: 95, ctr: 50 },
    { month: 'May', impressions: -4, ctr: 60 },
    { month: 'Jun', impressions: -24, ctr: 70 },
    { month: 'Jul', impressions: 85, ctr: 50 },
    { month: 'Aug', impressions: 91, ctr: 20 },
    { month: 'Sep', impressions: 35, ctr: 30 },
    { month: 'Oct', impressions: 53, ctr: 85 },
    { month: 'Nov', impressions: -53, ctr: 30 },
    { month: 'Dec', impressions: 24, ctr: 60 },
  ];

  // Extract months and impressions
  const months = data.map((item, index) => ({ index, month: item.month }));
  const impressions = data.map(item => item.impressions);
  const ctr = data.map(item => item.ctr);
  
  return (
    <View style={{ height: 300, padding: 20, }}>
       <View style={{ flexDirection: 'row' , marginBottom: 10}}>
        <Text style={{ color: 'rgb(134, 65, 244)', marginRight: 10 }}>Impressions</Text>
        <Text style={{ color: 'red' }}>CTR</Text>
      </View>
      <LineChart
        style={{ flex: 1 }}
        data={impressions}
        contentInset={{ bottom: -1, left: 10, right: 10 }}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
      >
        <Grid svg={{ stroke: '#b5b3ac', strokeWidth: 0.5 }} />
      </LineChart>
      
      <LineChart
        style={{ flex: 1 }}
        data={ctr}
        contentInset={{ top: -0, bottom: 10, left: 10, right: 10 }}
        svg={{ stroke: 'red' }}
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
        formatLabel={(value, index) => value}
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
