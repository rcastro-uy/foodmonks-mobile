import { API_URL } from "@env";
import axios from "axios";
import { useContext } from "react";
import { Alert, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { RestauranteComp } from "../interfaces/AppInterfaces";

export async function listarRestauranteService(nombre: string, categoria: string, orden: boolean) {
    const { token, refreshToken } = useContext( AuthContext );
    console.log(token);
    console.log(`${API_URL}`)
    // const data = {
    //     nombre: nombre,
    //     categoria: categoria,
    //     orden: orden,
    // };
    await axios({
        method: "GET",
        url: `${API_URL}/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
        //data: data,
        headers: {
            Authorization: `Bearer ${token}`,
            RefreshAuthentication: `Bearer ${refreshToken}`,
        },
    }).then((res: any) => {
        if (res.status === 200) {
            return res.data;
        }
    }).catch((err: any) => {
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