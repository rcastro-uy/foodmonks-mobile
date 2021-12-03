import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CustomDrawerNavigator } from "./CustomDrawerNavigator";
import { Icon } from 'react-native-elements';
import AddressScreen from "../screens/AddressScreen";
import ConfirmOrderScreen from "../screens/ConfirmOrderScreen";
import PedidosScreen from "../screens/PedidosScreen";
import { Ionicons } from "@expo/vector-icons";

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
      title:'Inicio',
      headerTitleAlign: 'center',
      headerTitleStyle:({color:'white'}),
      headerStyle:({backgroundColor:'#FD801E'}),
      headerTintColor:'black',
      drawerActiveTintColor: '#FD801E'
      }} />
       <Drawer.Screen name="Mis direcciones"  component={AddressScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'map-marker' : 'map-marker-outline' }
        type='material-community'
        color='black'
        />,
        headerTitleAlign:'center',
        headerTitleStyle:({color:'white'}),
        headerTintColor:'black',
        headerStyle:({backgroundColor:'#FD801E'}),
        drawerActiveTintColor: '#FD801E' 
      }} />
      <Drawer.Screen name="Pedidos"  component={PedidosScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'fast-food' : 'fast-food-outline' }
        type='ionicon'
        color='black'
        />,
        headerTitleAlign:'center',
        headerTitleStyle:({color:'white'}),
        headerStyle:({backgroundColor:'#FD801E'}),
        headerTintColor:'black',
        drawerActiveTintColor: '#FD801E' 
      }} />
      <Drawer.Screen name="Mi cuenta" component={ProfileScreen} options={{
        drawerIcon: ({ focused }) => <Icon
        name= {focused ? 'account' : 'account-outline' }
        type='material-community'
        color='black'
        />,
        headerTitle:'Mi cuenta',
        headerTitleAlign: 'center',
        headerTitleStyle:({color:'white'}),
        headerStyle:({backgroundColor:'#FD801E'}),
        headerTintColor:'black',
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