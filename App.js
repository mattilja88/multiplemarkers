import { useEffect, useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import Map from './screens/Map'
import MainAppbar from './components/MainAppbar'
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './screens/Settings'

const Stack = createNativeStackNavigator()

const settings = {
  backGround: '#00a484',
};

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs',
};

const mapTypeIcons = {
  standard: 'map',
  satellite: 'satellite-variant',
  hybrid: 'google-earth',
};

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known);
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [mapType, setMapType] = useState('standard');

  const handleMapTypeChange = (newMapType) => {
    setMapType(newMapType);
  };

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setIcon(icons.location_searching);
    try {
      if (status !== 'granted') {
        console.log("Geolocation not granted");
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
      setLocation({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude, 
        latitudeDelta: 0.05, 
        longitudeDelta: 0.05 
      });
      setIcon(icons.location_found);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async()=> {
      getUserPosition()
    })()
  }, [])

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Map'>
          <Stack.Screen 
            name="Map" 
            options={{ headerShown: false }} 
          >
            {({ navigation, route }) => ( 
              <>
                <MainAppbar
                  navigation={navigation}
                  route = {route} 
                  title="Map"
                  backgroundColor={settings.backGround}
                  icon={icon}
                  getUserPosition={getUserPosition}
                  handleMapType={handleMapTypeChange}
                  mapTypeIcons={mapTypeIcons}
                  mapType={mapType}
                />
                <Map location={location} mapType={mapType} />
              </>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="Settings" 
            options={{ title: 'Settings' }} 
          >
            {() => (
              <Settings 
                backgroundColor={settings.backGround} 
                mapType={mapType} 
                setMapType={setMapType} 
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}