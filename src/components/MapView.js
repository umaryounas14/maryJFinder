import React, { useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const { width } = Dimensions.get('window');

const MapComponent = ({ latitude, longitude, title, onMapLoaded }) => {
  
  useEffect(() => {
    if (onMapLoaded) {
      onMapLoaded(); // Track map load
    }
  }, [onMapLoaded]);

  // Function to open Google Maps with directions
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // Function to open the location in Google Maps
  const handleOpenInGoogleMaps = () => {
    const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }}>
          <Callout>
            <Text>{title}</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleGetDirections}>
          <Icon name="directions" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleOpenInGoogleMaps}>
          <Icon name="map" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MapComponent;
