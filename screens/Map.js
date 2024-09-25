import { StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'

export default function Map({ location, mapType }) {
    const [markers, setMarkers] = useState([]);

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkers([...markers, coords]); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                region={location}
                mapType={mapType}
                onLongPress={showMarker} 
            >
                {markers.map((item, index) => ( 
                    <Marker 
                        key={index} 
                        title={`My Marker ${index+1} - leveyttä: ${item.latitude.toFixed(2)}, pituutta: ${item.longitude.toFixed(2)}`}
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                    />
                ))}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        height: '100%',
        width: '100%',
    },
})
