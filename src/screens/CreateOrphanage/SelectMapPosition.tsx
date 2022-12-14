import React, { useState } from 'react';
import { View, Text,Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import mapMarker from '../../images/map-marker.png';
import {useNavigation} from '@react-navigation/native';


const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();

  const [position,setPosition] = useState({latitude:0,longitude:0});

  function handleSelectMapPosition(event:MapPressEvent){
    setPosition(event.nativeEvent.coordinate);
  }
  
  function handleNextStep(){
    navigation.navigate('OrphanageData',{position});
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude:-6.5205485,
          longitude:-38.4155765,
          latitudeDelta:0.008,
          longitudeDelta:0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >

        {position.latitude !== 0 && (
          <Marker 
          icon={mapMarker}
          coordinate ={{
            latitude:position.latitude,
            longitude: position.longitude,
          }}
        />
      )}
        
      </MapView>

      {position.latitude !== 0 && (
      <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
});



export default SelectMapPosition;