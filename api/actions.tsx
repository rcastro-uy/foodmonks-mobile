import { API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext } from 'react'
import { Alert } from 'react-native';
import foodMonksApi from './foodMonksApi';
import { menuPedido } from '../interfaces/AppInterfaces';

export const modificarPerfil = async (nombre : string, apellido: string): Promise<boolean> => {
      console.log(API_URL)  
      let result = true;
        try{ 
            const resp = await foodMonksApi.put(`/v1/cliente/modificarCliente?nombre=${nombre}&apellido=${apellido}`)
             
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

    export const altaCalificacion = async (idPedido : string, puntaje: string, comentario: string): Promise<boolean> => {
      let result = true;
      try{ 
          const resp = await foodMonksApi.post('/v1/cliente/calificarRestaurante',{idPedido,puntaje,comentario})
           
     } catch (error:any){
      result = false
      Alert.alert(
          "Error al calificar",
          error.response.data || 'Algo salió mal, intente mas tarde',
          [
              { text: "OK", style: "default" }
          ]
      )
    }
    return result
  }

  export const modificarCalificacion = async (idPedido : string, puntaje: string, comentario: string): Promise<boolean> => {
    let result = true;
   
    try{ 
       const resp = await foodMonksApi.put('/v1/cliente/modificarCalificacionRestaurante',{idPedido,puntaje,comentario})
         
   } catch (error:any){
    result = false
    Alert.alert(
        "Error al modificar calificacion",
        error.response.data || 'Algo salió mal, intente mas tarde',
        [
            { text: "OK", style: "default" }
        ]
    )

  }
 
  return result
}

export const eliminarCalificacion = async (idPedido : string): Promise<boolean> => {
  let result = true;
  try{ 
       const resp = await foodMonksApi.delete(`/v1/cliente/eliminarCalificacionRestaurante?idPedido=${idPedido}`) 
 } catch (error:any){
  result = false
  Alert.alert(
      "Error al eliminar calificacion",
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
          const resp = await foodMonksApi.post('/v1/cliente/realizarPedido', data)
          
           
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

  export const obtenerUri = async (monto: number, setUri: any) => {
    const data = JSON.stringify({
      total: monto,
     });
     let uri = ''
     try{
     const resp = await foodMonksApi.post('/v1/paypal/order/request', data)   
      uri = resp.request.responseURL;
      setUri(uri)
     } catch(error : any) {
      Alert.alert(
        "Error al procesar el  pago",
        error.response.data || 'Algo salió mal, intente de nuevo mas tarde',
        [
            { text: "OK", style: "default" }
        ]
    )
     }
    
  }

