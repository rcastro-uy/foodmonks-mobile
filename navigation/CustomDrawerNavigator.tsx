import React, { useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';

const { width: windowWidth } = Dimensions.get('window');
const { height: windowHeight } = Dimensions.get('window');
export const CustomDrawerNavigator = (props : DrawerContentComponentProps) => {
  const { usuario, cerrarSesion } = useContext( AuthContext );
    return (
    <SafeAreaView style={{flex: 1, maxWidth:windowWidth}}>
      <Image
        source={ require('../images/monjeNegro.png') }
        style={styles.sideMenuProfileIcon}
      />
      <Text style={styles.textProfile}> {usuario?.nombre}</Text>
      <Text style={styles.textProfile}> {usuario?.apellido}</Text>
      <DrawerContentScrollView style={{top:30}} {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Restaurantes"
          onPress={() => console.log()}
        />
        <View style={styles.customItem}>
            <DrawerItem
              label="Restaurantes"
              onPress={() => props.navigation.navigate('Home')}
            />
          <Icon
            name='sc-telegram'
            type='evilicon'
            color='#517fa4'
          />
        </View> */}
      </DrawerContentScrollView>
      <DrawerItem
          label="Perfil"
          onPress={() => props.navigation.navigate('Mi cuenta')}
        />
      <DrawerItem
          label="Cerrar sesion"
          onPress={ cerrarSesion }
        />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create ({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 140,
    height: 140,
    borderRadius:200,
    top:25,
    borderColor: '#FFFFFF',
    alignSelf: 'center',
  },
  textProfile: {
    top:27, 
    fontSize:17, 
    fontWeight: 'bold', 
    textAlign:'center'
  },
  iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
  },
  customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
  },
})