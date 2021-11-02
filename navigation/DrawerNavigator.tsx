import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CustomDrawerNavigator } from "./CustomDrawerNavigator";
import { Icon } from 'react-native-elements';
import AddressScreen from "../screens/AddressScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerNavigator {...props}/>}>
      <Drawer.Screen  name="Inicio" component={HomeScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'home' : 'home-outline' }
        type='material-community'
        color='black'
      />,
      drawerActiveTintColor: '#FD801E'
      }} />
       <Drawer.Screen name="Mis direcciones"  component={AddressScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'map-marker' : 'map-marker-outline' }
        type='material-community'
        color='black'
        />,
        headerTitleAlign:'center',
        drawerActiveTintColor: '#FD801E' 
      }} />
      <Drawer.Screen name="Mi cuenta" component={ProfileScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'account' : 'account-outline' }
        type='material-community'
        color='black'
        />,
        headerTitle:'',
        drawerActiveTintColor: '#FD801E' 
      }} />
    </Drawer.Navigator>
  );
};

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export default DrawerNavigator;