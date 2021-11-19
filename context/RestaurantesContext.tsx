import React, { createContext, useContext, useState } from 'react';
import foodMonksApi from '../api/foodMonksApi';
import { Producto, Restaurante, RestauranteComp } from '../interfaces/AppInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type RestaurantesContextProps = {
    restaurantes: Restaurante[];
    productos: Producto[];
    listarRestaurantes: (nombre: string, categoria: string, orden: boolean) => Promise<any>;
    listarProductos: (restauranteId: string, categoria: string, precioInicial: string, precioFinal: string) => Promise<any>;
    obtenerRestaurante: (restauranteId: string) => Restaurante | undefined;

}

type result = {
    respuesta: boolean
}

export const RestaurantesContext = createContext({} as RestaurantesContextProps);

export const RestaurantesProvider = ({ children }: any ) => {

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);

   

    const listarRestaurantes = async(nombre: string, categoria: string, orden: boolean):Promise<any> => {
        let result = true;   
        try{ 
            const token = await AsyncStorage.getItem('token');
            //console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = await foodMonksApi.get<Restaurante[]>(`/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
            { headers: {
                    Authorization: "Bearer " + token,
                    RefreshAuthentication: "Bearer " + refreshToken,
                }
            });
            setRestaurantes(resp.data)
            return resp.data;
        } catch (error:any){
            result = false
            Alert.alert(
                "Error listando los restaurantes",
                error || 'Algo salió mal, intente mas tarde',
                [
                    { text: "OK", style: "default" }
                ]
            )
        }
    }

    const listarProductos = async(restauranteId: string, categoria: string, precioInicial: string, precioFinal: string):Promise<any> => {
        let result = true;   
        try{ 
            const token = await AsyncStorage.getItem('token');
            //console.log(token)
            const refreshToken = await AsyncStorage.getItem('refreshToken')
            const resp = await foodMonksApi.get<Producto[]>(`/v1/cliente/listarProductosRestaurante?id=${restauranteId}&categoria=${categoria}&precioInicial=${precioInicial}&precioFinal=${precioFinal}`,
            { headers: {
                    Authorization: "Bearer " + token,
                    RefreshAuthentication: "Bearer " + refreshToken,
                }
            });
            //setRestaurantes([ ...restaurantes, resp.data ]);
            return resp.data;
        } catch (error:any){
            result = false
            Alert.alert(
                "Error listando los menus",
                error || 'Algo salió mal, intente mas tarde',
                [
                    { text: "OK", style: "default" }
                ]
            )
        }
    }

    const obtenerRestaurante = (id :string) => {
        return restaurantes.find(restaurante => restaurante.correo === id);
    }

    return(
        <RestaurantesContext.Provider value={{
            restaurantes,
            productos,
            listarRestaurantes,
            listarProductos,
            obtenerRestaurante
        }}>
            { children }
        </RestaurantesContext.Provider>
    )
}