import React, { createContext, useContext, useState } from 'react';
import foodMonksApi from '../api/foodMonksApi';
import { Restaurante, RestauranteComp } from '../interfaces/AppInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';

type RestaurantesContextProps = {
    restaurantes: Restaurante[];
    cargarRestaurantes: (restaurantes: Restaurante[]) => void;
    listarRestaurantes: (nombre: string, categoria: string, orden: boolean) => Promise<any>;

    // correo: string;
    // fechaRegistro: Date;
    // rol: string;
    // estado: EstadoRestaurante;
    // rut: number;
    // descripcion: string;
    // nombre: string;
    // telefono: number;
    // calificacion: number;
    // imagen: string;
}

type result = {
    respuesta: boolean
}

export const RestaurantesContext = createContext({} as RestaurantesContextProps);

export const RestaurantesProvider = ({ children }: any ) => {

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    
    const cargarRestaurantes = async (restaurantes : Restaurante[]) => {
            setRestaurantes(restaurantes)
    }

    const listarRestaurantes = async(nombre: string, categoria: string, orden: boolean):Promise<any> => {
        let result = true;   
        try{ 
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = await foodMonksApi.get<Restaurante[]>(`/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
            { headers: {
                    Authorization: "Bearer " + token,
                    RefreshAuthentication: "Bearer " + refreshToken,
                }
            });
            // const restaurante = {
            //     correo: resp.data.correo,
            //     fechaRegistro: resp.data.fechaRegistro,
            //     rol: resp.data.rol,
            //     estado: resp.data.estado.valueOf(),
            //     rut: resp.data.rut,
            //     descripcion: resp.data.descripcion,
            //     nombre: resp.data.nombre,
            //     telefono: resp.data.telefono,
            //     calificacion: resp.data.calificacion,
            //     imagen: resp.data.imagen,
            // }
            //setRestaurantes([ ...restaurantes, resp.data ]);
            return resp.data;
        } catch (error:any){
            result = false
            Alert.alert(
                "Error direccion",
                error || 'Algo salió mal, intente mas tarde',
                [
                    { text: "OK", style: "default" }
                ]
            )
        }
    }

    return(
        <RestaurantesContext.Provider value={{
            restaurantes,
            cargarRestaurantes,
            listarRestaurantes
        }}>
            { children }
        </RestaurantesContext.Provider>
    )
}