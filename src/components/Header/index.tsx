import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps{
  title:string;
  showX?:boolean;
}

const Header: React.FC<HeaderProps> = ({title, showX=true}) => {
  const navigation = useNavigation();
  
  function handlerGoToAppHomepage(){
    navigation.navigate('OrphanagesMap');// vai para rota do mapa
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6"/>
      </TouchableOpacity>
     
      <Text style={styles.title}> {title} </Text>
      

      {showX ? (
        <TouchableOpacity onPress={handlerGoToAppHomepage}>
          <Feather name="x" size={24} color="##ff669d"/>
        </TouchableOpacity>
      ):(
        <View />
      )
      }

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },
});

export default Header;