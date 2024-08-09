import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

const data = [
  { query: 'Edibles that help me sleep', storeClicks: 110, mapClicks: 100, productClicks: 200 },
  { query: 'CBD oil for anxiety', storeClicks: 130, mapClicks: 90, productClicks: 150 },
  { query: 'THC vape pens', storeClicks: 100, mapClicks: 80, productClicks: 120 },
  { query: 'Strongest pre-rolls', storeClicks: 80, mapClicks: 60, productClicks: 100 },
  { query: 'Pain relief tinctures', storeClicks: 60, mapClicks: 40, productClicks: 70 },
];

const colors = [
  '#ffffcc',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#2c7fb8',
  '#253494',
];

const getColor = (value) => {
  if (value > 170) return colors[5];
  if (value > 130) return colors[4];
  if (value > 90) return colors[3];
  if (value > 40) return colors[2];
  if (value > 10) return colors[1];
  return colors[0];
};

const Heatmap = () => {
  const { width } = Dimensions.get('window');
  const cellWidth = (width - 40) / 3; // Adjust for padding
  const cellHeight = 40;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.queryCell}>{item.query}</Text>
      <View style={styles.cellContainer}>
        <Svg height={cellHeight} width={cellWidth}>
          <Rect
            x={0}
            y={0}
            width={cellWidth}
            height={cellHeight}
            fill={getColor(item.storeClicks)}
          />
          <Text
            x={cellWidth / 2}
            y={cellHeight / 2}
            fontSize="12"
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {item.storeClicks}
          </Text>
        </Svg>
      </View>
      <View style={styles.cellContainer}>
        <Svg height={cellHeight} width={cellWidth}>
          <Rect
            x={0}
            y={0}
            width={cellWidth}
            height={cellHeight}
            fill={getColor(item.mapClicks)}
          />
          <Text
            x={cellWidth / 2}
            y={cellHeight / 2}
            fontSize="12"
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {item.mapClicks}
          </Text>
        </Svg>
      </View>
      <View style={styles.cellContainer}>
        <Svg height={cellHeight} width={cellWidth}>
          <Rect
            x={0}
            y={0}
            width={cellWidth}
            height={cellHeight}
            fill={getColor(item.productClicks)}
          />
          <Text
            x={cellWidth / 2}
            y={cellHeight / 2}
            fontSize="14"
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {item.productClicks}
          </Text>
        </Svg>
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Engagement Heatmap</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Query</Text>
            <Text style={styles.cell}>Store Clicks</Text>
            <Text style={styles.cell}>Map Clicks</Text>
            <Text style={styles.cell}>Product Clicks</Text>
          </View>
        </View>
      }
      data={data}
      keyExtractor={(item) => item.query}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 10 }} // Ensure some padding
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  headerContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    width: (Dimensions.get('window').width - 40) / 4, // Adjusted for padding
    textAlign: 'center',
    fontWeight: 'bold',
  },
  queryCell: {
    width: 100,
    textAlign: 'left',
    paddingRight: 10,
  },
  cellContainer: {
    width: (Dimensions.get('window').width - 40) / 4, // Adjusted for padding
  },
});

export default Heatmap;
