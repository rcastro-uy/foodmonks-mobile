import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
import { listarRestauranteService } from "../services/listarRestaurantesService";
import { Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";

export default function HomeScreen({navigation, route}:any) {
    const Restaurantes = listarRestauranteService("","",true);
    console.log(Restaurantes);
    const { cerrarSesion } = useContext( AuthContext );
    return (
        <View style={styles.container}>
            {/* {await listarRestauranteService("","",true).map((item: Restaurante, index: number) => {
                <RestauranteComponent nombre={item.nombre} descripcion={item.descripcion} imagen={item.imagen} calificacion={item.calificacion}/>
            })} */}
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