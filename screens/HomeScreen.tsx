import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
import { listarRestauranteService } from "../services/listarRestaurantesService";
import { Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function HomeScreen({navigation, route}:any) {
    const [restaurantes, setRestaurantes] = React.useState([]);
    const [nombre, setNombre] = React.useState();
    const [categoria, setCategoria] = React.useState();
    const [orden, setOrden] = React.useState();
    const { token, refreshToken } = useContext( AuthContext );
    const data = {
        nombre: nombre,
        categoria: categoria,
        orden: orden,
    };
    useEffect(() => {
        console.log(`Bearer ${token}`);
        console.log(`Bearer ${refreshToken}`);
        const requestListarRestaurantes = axios({
            method: "GET",
            url: `${API_URL}/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
                'RefreshAuthentication': `Bearer ${refreshToken}`,
            },
        });
        requestListarRestaurantes.then((res: any) => {
            if (res.status === 200) {
                console.log(res.data);
                setRestaurantes(res.data);
            }
        }).catch((error) => {
            console.log(error);
        });
        //restaurantesb = listarRestauranteService("","",true);
    }, [])
    const { cerrarSesion } = useContext( AuthContext );
    return (
        <View style={styles.container}>
            {restaurantes.map((item: Restaurante, index: number) => {
                <RestauranteComponent nombre={item.nombre} descripcion={item.descripcion} imagen={item.imagen} calificacion={item.calificacion}/>
            })}
           {/*para probar el cierre de sesion */}
            <Button 
                title="cerrar sesion"
                color="#5856D6"
                onPress={ cerrarSesion }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});