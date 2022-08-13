import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrphanagesMap from '../screens/OrphanagesMap';
import OrphanagesDetails from '../screens/OrphanageDetails';
import OrphanageData from '../screens/CreateOrphanage/OrphanageData';
import SelectMapPosition from '../screens/CreateOrphanage/SelectMapPosition';
import Header from '../components/Header';

const {Navigator, Screen} = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator 
        screenOptions={{headerShown:false,}}
        initialRouteName='OrphanagesMap'
        >
        <Screen name="OrphanagesMap" component={OrphanagesMap}/>
        <Screen  
          name="OrphanageDetails" 
          component={OrphanagesDetails}
          options={{
            headerShown:true,
            header: ()=> <Header title='Orfanato' showX ={false}/>
          }}
        />
        <Screen  
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown:true,
            header: ()=> <Header title='Selecione no Mapa'/>
          }}
        />
        <Screen  
          name="OrphanageData" 
          component={OrphanageData}
          options={{
            headerShown:true,
            header: ()=> <Header title='Informe os dados'/>
          }}
        />
      </Navigator>

    </NavigationContainer>

  );
}

export default Routes;