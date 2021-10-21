import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {

  const { estado } = useContext( AuthContext );


  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}>
       
      {
        
          
       
        
      
        (estado !== 'autenticado') 
          ? (
              <>
                <Stack.Screen name="SplashScreen" component={ SplashScreen } />
                <Stack.Screen name="LoadingScreen" component={ LoadingScreen } />
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )
          : (
              <>
                <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{ headerShown: false }}/>
              </>
            )
      }
    </Stack.Navigator>
  );
};

export { MainStackNavigator };