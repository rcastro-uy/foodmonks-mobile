import React, { createContext, useContext, useState } from 'react';
import foodMonksApi from '../api/foodMonksApi';

import { Direccione, ResponseAddDireccion } from '../interfaces/AppInterfaces';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type AddressContextProps = {
    direcciones: Direccione[];
    cargarDirecciones: (direcciones : Direccione[]) => void;
    agregarDireccion: ( numero: number, calle: string, esquina: string, detalles: string, latitud:  number, longitud: number ) => Promise<boolean>;
    modificarDireccion: ( id:number, numero: number, calle: string, esquina: string, detalles: string, latitud:  number, longitud: number ) => Promise<boolean>;
    eliminarDireccion: ( id:  number ) => Promise<boolean>;
    
}

type result = {
    respuesta: boolean
}



export const AddressContext = createContext({} as AddressContextProps);



export const AddressProvider = ({ children }: any ) => {


    const [direcciones, setDirecciones] = useState<Direccione[]>([]);
    
    
    const cargarDirecciones = async (direcciones : Direccione[]) => {
            setDirecciones(direcciones)
    }

    const agregarDireccion = async(numero: number, calle: string, esquina: string, detalles: string, latitud:  number, longitud: number ):Promise<boolean> => {
        let result = true;   
        try{ 
              const token = await AsyncStorage.getItem('token');
              console.log(token)
              const refreshToken = await AsyncStorage.getItem('refreshToken')
              const resp = await foodMonksApi.post<ResponseAddDireccion>('/v1/cliente/agregarDireccion', {
                    numero,calle,esquina,detalles,latitud, longitud,
              },{headers: {
                Authorization: "Bearer " + token,
                RefreshAuthentication: "Bearer " + refreshToken,
              },});

              const direccion = {
                  id: resp.data.id,
                  numero: numero,
                  calle: calle,
                  esquina: esquina,
                  detalles: detalles,
                  latitud: latitud,
                  longitud: longitud
              }
              setDirecciones([ ...direcciones, direccion ]);
        } catch (error:any){
            result = false
            Alert.alert(
                "Error direccion",
                error.response.data || 'Algo salió mal, intente mas tarde',
                [
                    { text: "OK", style: "default" }
                ]
            )

        }
        return result

    }

    const modificarDireccion = async( id: number,numero: number, calle: string, esquina: string, detalles: string, latitud:  number, longitud: number  ):Promise<boolean> =>{
        let result = true;
        try{ 
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = await foodMonksApi.put('/v1/cliente/modificarDireccion', {
                id, numero,calle,esquina,detalles,latitud, longitud,
          },{params:{
            id},headers: {
                Authorization: "Bearer " + token,
                RefreshAuthentication: "Bearer " + refreshToken,
              },});

              const direccion = {
                id: id,
                numero: numero,
                calle: calle,
                esquina: esquina,
                detalles: detalles,
                latitud: latitud,
                longitud: longitud
            }

              setDirecciones( direcciones.map( dir => {
                return (dir.id === id )
                        ? direccion
                        : dir;
            }) );

           
      } catch (error:any){
        result = false
        Alert.alert(
            "Error direccion",
            error.response.data || 'Algo salió mal, intente mas tarde',
            [
                { text: "OK", style: "default" }
            ]
        )

      }
     
      return result
    }

    const eliminarDireccion = async( id : number): Promise<boolean> => {
        let result = true;
        try{ 
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = await foodMonksApi.delete('/v1/cliente/eliminarDireccion', { params:{
                id
            },headers: {
              Authorization: "Bearer " + token,
              RefreshAuthentication: "Bearer " + refreshToken,
            }});

            let indice = direcciones.findIndex(dir => dir.id === id );
            console.log (indice)
            const auxDirecciones = [...direcciones]
            auxDirecciones.splice(indice,1)
            setDirecciones(auxDirecciones)
      } catch (error:any){
        result = false
        Alert.alert(
            "Error direccion",
            error.response.data || 'Algo salió mal, intente mas tarde',
            [
                { text: "OK", style: "default" }
            ]
        )

      }
      return result
    }

        


    return(
        <AddressContext.Provider value={{
            direcciones,
            cargarDirecciones,
            agregarDireccion,
            modificarDireccion,
            eliminarDireccion
        }}>
            { children }
        </AddressContext.Provider>
    )
}