import React, { createContext, useContext, useState } from 'react';
import foodMonksApi from '../api/foodMonksApi';
import { Buffer } from "buffer"
import { Pedido, PedidoArray, Producto, Restaurante, RestauranteComp } from '../interfaces/AppInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type RestaurantesContextProps = {
    restaurantes: Restaurante[];
    productos: Producto[];
    listarRestaurantes: (nombre: string, categoria: string, orden: boolean) => Promise<any>;
    listarProductos: (restauranteId: string, categoria: string, precioInicial: string, precioFinal: string) => Promise<any>;
    obtenerRestaurante: (restauranteId: string) => Restaurante | undefined;
    listarPedidos: (nombreRestaurante: string, nombreMenu: string, estadoPedido: string, medioPago: string, ordenamiento: string, fecha: Date, total: string, page: number) => Promise<any>;
    realizarReclamo: (idPedido: number, razon: string, comentario: string) => Promise<any>;
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
            const resp = await foodMonksApi.get<Restaurante[]>(`/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`);
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

    const listarProductos = async(restaurante: string, categoria: string, precioInicial: string, precioFinal: string):Promise<any> => {
        let result = true;  
        let restauranteId = Buffer.from(restaurante, "utf8").toString('base64');
          
        try{ 
            const resp = await foodMonksApi.get<Producto[]>(`/v1/cliente/listarProductosRestaurante?id=${restauranteId}&categoria=${categoria}&precioInicial=${precioInicial}&precioFinal=${precioFinal}`);
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
    const listarPedidos = async(nombreRestaurante: string, nombreMenu: string, estadoPedido: string, medioPago: string, ordenamiento: string, fecha: Date, total: string, page: number):Promise<any> => {
        try{ 
            const resp = await foodMonksApi.get<PedidoArray>(`/v1/cliente/listarPedidosRealizados?estadoPedido=${estadoPedido}&nombreMenu=${nombreMenu}&nombreRestaurante=${nombreRestaurante}&medioPago=${medioPago}&orden=${ordenamiento}&fecha=${fecha}&total=${total}&page=${page}&size=5`);
            return resp.data;
        } catch (error:any){
            Alert.alert(
                "Error listando los pedidos",
                error || 'Algo salió mal, intente mas tarde',
                [
                    { text: "OK", style: "default" }
                ]
            )
        }
    }
    const realizarReclamo = async(idPedido: number, razon: string, comentario: string):Promise<any> => {
        try{ 
            const resp = await foodMonksApi.post(`/v1/cliente/agregarReclamo`,
            {
                pedidoId: idPedido,
                razon: razon,
                comentario: comentario
            });
            return resp;
        } catch (error:any){
            Alert.alert(
                "Error realizando el reclamo",
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
            productos,
            listarRestaurantes,
            listarProductos,
            obtenerRestaurante,
            listarPedidos,
            realizarReclamo
        }}>
            { children }
        </RestaurantesContext.Provider>
    )
}