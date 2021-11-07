import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, Text, View } from "react-native";
import { RestauranteComp } from "../interfaces/AppInterfaces";

export function listarRestauranteService(nombre: string, categoria: string, orden: boolean): any {
    const token = AsyncStorage.getItem('token');
    const refreshToken = AsyncStorage.getItem('refreshToken');
    console.log(token);
    console.log(`${API_URL}`)
    const data = {
        nombre: nombre,
        categoria: categoria,
        orden: orden,
    };
    const requestListarRestaurantes = axios({
        method: "GET",
        url: `${API_URL}/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
            RefreshAuthentication: `Bearer ${refreshToken}`,
        },
    });
    requestListarRestaurantes.then((res) => {
        if (res.status === 200) {
            return res.data;
        }
    }).catch(err => {
        return (
            Alert.alert(
                "Solicitud no realizada",
                `Error de comunicacion ${err}`,
                [
                    { text: "OK", style: "default" }
                ]
            )
        );
    });
    //response.then((res) => {checkTokens(res.config.headers.Authorization, res.config.headers.RefreshAuthentication)});
    //return response;
};