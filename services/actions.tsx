import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext } from 'react'
import { Alert } from 'react-native';
import foodMonksApi from '../api/foodMonksApi';

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



