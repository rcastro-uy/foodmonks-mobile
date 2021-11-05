import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, Text, View } from "react-native";

export async function listarRestauranteService(nombre: string, categoria: string, orden: boolean) {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    console.log(`${API_URL}`)
    const data = {
        nombre: nombre,
        categoria: categoria,
        orden: orden,
    };
    const requestListarRestaurantes = axios({
        method: "GET",
        url: `${API_URL}/v1/cliente/listarAbiertos?nombre=${data.nombre}&categoria=${data.categoria}&orden=${data.orden}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
            //'RefreshAuthentication': "Bearer " + getRefreshToken(),
        },
    });
    requestListarRestaurantes.then((res) => {
        if (res.status === 200) {
            return res;
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