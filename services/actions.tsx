import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext } from 'react'
import { Alert } from 'react-native';
import foodMonksApi from '../api/foodMonksApi';
import { menuPedido } from '../interfaces/AppInterfaces';

export const modificarPerfil = async (nombre : string, apellido: string): Promise<boolean> => {
        let result = true;
        try{ 
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = axios({
              method: "PUT",
              url: `${API_URL}/v1/cliente/modificarCliente?nombre=${nombre}&apellido=${apellido}`,
              headers: {
                Authorization: "Bearer " + token,
                RefreshAuthentication: "Bearer " + refreshToken,
              },
            });
             
       } catch (error:any){
        result = false
        Alert.alert(
            "Error al actualizar datos",
            error.response.data || 'Algo salió mal, intente mas tarde',
            [
                { text: "OK", style: "default" }
            ]
        )

      }
     
      return result
    }

    export const realizarPedido = async (restaurante : string, direccionId: number, medioPago: string, ordenId: string, linkAprobacion: string, total: number, menus: menuPedido[]): Promise<boolean> => {
      let result = true;
      const data = {
        restaurante: restaurante,
        direccionId: direccionId,
        medioPago: medioPago,
        total: total,
        ordenId: ordenId,
        linkAprobacion: linkAprobacion,
        menus: menus
      };
      try{ 
          const token = await AsyncStorage.getItem('token');
          const refreshToken = await AsyncStorage.getItem('refreshToken')
          const resp = axios({
            method: "POST",
            url: `${API_URL}/v1/cliente/realizarPedido`,
            data: data,
            headers: {
              Authorization: "Bearer " + token,
              RefreshAuthentication: "Bearer " + refreshToken,
            }
          }).then((resp) => {
            checkTokens( resp.config.headers!.Authorization, resp.config.headers!.RefreshAuthentication)
          })
           
     } catch (error:any){
      result = false
      Alert.alert(
          "Error al realizar pedido",
          error.response.data || 'Algo salió mal, intente de nuevo',
          [
              { text: "OK", style: "default" }
          ]
      )

    }
   
    return result
  }

  export const checkTokens = (auth: string, refreshAuth: string) => {
    const newAuth = auth.substring(7);
    const newRefreshAuth = refreshAuth.substring(7);
    obtenerTokens().then(response => { 
      if (response.token != null && response.refreshToken != null) {
        if (newAuth !== response.token || newRefreshAuth !== response.refreshToken) {
          localStorage.setItem("token", newAuth);
          localStorage.setItem("refreshToken", newRefreshAuth);
        }
      }
    })
  }
  
  const obtenerTokens = async () => {
    const token = await AsyncStorage.getItem('token')
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    return {token : token, refreshToken : refreshToken}
  }



  export const obtenerUri = async (monto: number, setUri: any) => {
    const data = JSON.stringify({
      total: monto,
     });
     let uri = ''
     obtenerTokens().then(response => {  
      
     fetch(`${API_URL}/v1/paypal/order/request`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: "Bearer " + response.token,
         RefreshAuthentication: "Bearer " + response.refreshToken,

       },
       body: data,
     }).then(response => response.url).then(text => {
      uri = text;
      setUri(uri)
     
     })
    })
  }

