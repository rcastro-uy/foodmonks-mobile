import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from '../screens/SplashScreen';
import { LoadingScreen } from "../screens/LoadingScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import RecoveryPasswordScreen from "../screens/RecoverPasswordScreen";
import ProductosScreen from '../screens/ProductosScreen';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { Producto } from "../interfaces/AppInterfaces";
import CartScreen from "../screens/CartScreen";

export type RootStackParams = {
  Login: undefined,
  RegisterScreen: undefined,
  RecoverPasswordScreen: undefined,
  LoadingScreen: undefined,
  HomeDrawer: undefined,
  PaymentScreen: {amt: number},
  ProductosScreen: {id: string, nombre:string},
  ProductDetailsScreen: {producto:Producto, id:string,nombre:string},
  CartScreen: {id: string, nombre:string}

}



const Stack = createNativeStackNavigator<RootStackParams>();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {

  const { estado, primerCarga } = useContext( AuthContext );

  if ( primerCarga) return <SplashScreen />
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}>
       
      {
        
        (estado !== 'autenticado') 
          ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                <Stack.Screen name="RecoverPasswordScreen" component={ RecoveryPasswordScreen } />
              </>
            )
          : (
              <>
                <Stack.Screen name="LoadingScreen" component={ LoadingScreen } />
                <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="ProductosScreen" component={ProductosScreen} />
                <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
            
              </>
            )
      }
    </Stack.Navigator>
  );
};

export { MainStackNavigator };