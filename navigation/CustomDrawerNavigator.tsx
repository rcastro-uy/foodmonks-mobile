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

const { width: windowWidth } = Dimensions.get('window');
const { height: windowHeight } = Dimensions.get('window');
export const CustomDrawerNavigator = (props: DrawerContentComponentProps) => {
    return (
    <SafeAreaView style={{flex: 1, maxWidth:windowWidth}}>
      <Image
        source={ require('../assets/foodMonks.png') }
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
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
        </View>
      </DrawerContentScrollView>
      <DrawerItem
          label="Perfil"
          onPress={() => props.navigation.navigate('Profile')}
        />
      <DrawerItem
          label="Cerrar sesion"
          onPress={ () => console.log("p") }
        />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create ({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 200,
    borderRadius: 100 / 2,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    alignSelf: 'center',
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