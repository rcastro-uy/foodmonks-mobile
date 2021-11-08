import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from '../screens/SplashScreen';
import { LoadingScreen } from "../screens/LoadingScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import RecoveryPasswordScreen from "../screens/RecoverPasswordScreen";
import PaymentScreen from '../screens/PaymentScreen';

export type RootStackParams = {
  Login: undefined,
  RegisterScreen: undefined,
  RecoverPasswordScreen: undefined,
  LoadingScreen: undefined,
  HomeDrawer: undefined,
  PaymentScreen: {amt: number}

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
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
              </>
            )
      }
    </Stack.Navigator>
  );
};

export { MainStackNavigator };