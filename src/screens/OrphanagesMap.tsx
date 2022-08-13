import React,{useState} from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  Dimensions,
  Platform,
  PermissionsAndroid, 
  TouchableOpacity
} from 'react-native';
import  MapView, {Marker,Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
/* import * as Location from 'expo-location'; */

import api from '../services/api';

interface Orphanage{
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}

const OrphanagesMap: React.FC = () => {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  /* const [location,setLocation] = useState(null); */

  const navigation = useNavigation();
  
  function handlerNavigateToOrphanageDetails(id:number){
    navigation.navigate('OrphanageDetails',{id});
  }
  
  function handleNavigateToCreateOrphanage(){
    navigation.navigate('SelectMapPosition');
  }
  /* async function getMyLocation(){
    
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('oi')
          return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
 
  } */
  // sempre que o usuário sair e voltar da tela, ela é disparada
  
  useFocusEffect(()=>{
    api.get('orphanages').then(response=>{     
      setOrphanages(response.data);
    }).catch(error=>console.log(error));
    /* getMyLocation(); */
  });
 
  return (
    <View style={styles.container}>
      <MapView
        onMapReady={()=>{
          Platform.OS === 'android' && PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(()=>{console.log("usuario aceitou")})
        }}
        style={styles.map}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude:-6.5205485,
          longitude:-38.4155765,
          latitudeDelta:0.008,
          longitudeDelta:0.008,
        }}
        showsUserLocation
        loadingEnabled
        minZoomLevel={17}
      >
      {orphanages.map(orphanage =>
        <Marker
          key={orphanage.id}
          icon={mapMarker}
          coordinate = {
            {
              latitude:orphanage.latitude,
              longitude:orphanage.longitude,
            }
          }
          calloutAnchor={{x:2.7, y:0.8}}

        >
          <Callout
            tooltip={true}
            onPress={()=>handlerNavigateToOrphanageDetails(orphanage.id)}
          >
            <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
        </Marker>
      )}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> {orphanages.length} orfanatos </Text>
        <TouchableOpacity 
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        > 
          <Feather name="plus" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer:{
    width:168,
    height:46,
    paddingHorizontal:16,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderRadius:16,
    justifyContent:'center',
  },
  calloutText:{
    color:'#8889a5',
    fontSize:14,
    fontFamily:'Nunito_700Bold'
  },
  footer:{
    position:'absolute',
    left:24,
    right:24,
    bottom:32,

    backgroundColor:"#fff",
    borderRadius:28,
    height:46,
    paddingLeft:24,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

    elevation:3,
  },
  footerText:{
    color:'#8fa7b3',
    fontFamily:'Nunito_700Bold'
  },
  createOrphanageButton:{
    width:56,
    height:56,
    backgroundColor: "#15c3d6",
    borderRadius:28,

    justifyContent:'center',
    alignItems:'center'
  }
})
export default OrphanagesMap;