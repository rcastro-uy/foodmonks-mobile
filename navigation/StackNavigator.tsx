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
import ProductosScreen from '../screens/ProductosScreen';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import ConfirmOrderScreen from '../screens/ConfirmOrderScreen';
import ProcessOrderScreen from "../screens/ProcessOrderScreen";
import { MenuCompra, Producto, menuPedido, Reclamo } from "../interfaces/AppInterfaces";
import PedidoDetailsScreen from "../screens/PedidoDetailsScreen";
import ReclamoScreen from "../screens/ReclamoScreen";
import PedidosScreen from "../screens/PedidosScreen";

export type RootStackParams = {
  Login: undefined,
  RegisterScreen: undefined,
  RecoverPasswordScreen: undefined,
  LoadingScreen: undefined,
  HomeDrawer: undefined,
  PaymentScreen: {restaurante: string, direccion: number,total: number, menus: menuPedido[]}
  ProductosScreen: {id: string, nombre:string},
  ProductDetailsScreen: {producto:Producto, id:string,nombre:string},
  CartScreen: {id: string, nombre:string},
  ConfirmOrderScreen : {id: string, bool?: boolean},
  ProcessOrderScreen: {restaurante: string, direccion: number,medioPago: string, ordenId: string, linkAprobacion:string, total: number, menus: menuPedido[]}
  PedidoDetailsScreen: {idPedido:number, estadoPedido:string, calificacionRestaurante:string, reclamo: Reclamo, menus:MenuCompra[]},
  ReclamoScreen: {idPedido:number, reclamo: Reclamo},
  PedidosScreen: undefined,
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
                <Stack.Screen name="ProductosScreen" component={ProductosScreen} />
                <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
                <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
                <Stack.Screen name="ProcessOrderScreen" component={ProcessOrderScreen} />
                <Stack.Screen name="PedidoDetailsScreen" component={PedidoDetailsScreen} />
                <Stack.Screen name="ReclamoScreen" component={ReclamoScreen} />
                <Stack.Screen name="PedidosScreen" component={PedidosScreen} />  
              </>
            )
      }
    </Stack.Navigator>
  );
};

export { MainStackNavigator };