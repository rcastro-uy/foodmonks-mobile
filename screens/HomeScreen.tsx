import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Keyboard } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { listarRestauranteService } from "../services/listarRestaurantesService";
import { categorias, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import axios from "axios";
import { API_URL } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "../theme/Normalization";
import { Picker } from "@react-native-picker/picker";

export default function HomeScreen({navigation, route}:any) {
    const [restaurantes, setRestaurantes] = React.useState([]);
    const [nombre, setNombre] = React.useState("");
    const [categoria, setCategoria] = React.useState("");
    const [orden, setOrden] = React.useState(false);
    const { token, refreshToken, cerrarSesion } = useContext( AuthContext );

    const onListarRestaurantes = () => {
        Keyboard.dismiss();
        console.log(`${nombre} + ${categoria} + ${orden}`)
        listarRestauranteService(nombre, categoria, orden).then((data: any) => {
            setRestaurantes(data);
        });
    }

    const toggleSwitch = () => setOrden(previousState => !previousState);
    
    useEffect(() => {
        console.log(`Bearer ${token}`);
        console.log(`Bearer ${refreshToken}`);
        axios({
            method: "GET",
            url: `${API_URL}/v1/cliente/listarAbiertos?nombre=${nombre}&categoria=${categoria}&orden=${orden}`,
            headers: {
                Authorization: `Bearer ${token}`,
                RefreshAuthentication: `Bearer ${refreshToken}`,
            },
        }).then((res: any) => {
            if (res.status === 200) {
                console.log(res.data);
                setRestaurantes(res.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    
    return (
        <>
        <View style={ styles.headerContainer } >
        <Text style={ styles.title }>Restaurantes</Text>
        {/* <Ionicons 
        type='material-community'
        name='arrow-back-circle'
        size={35}
        color={"#FD801E"}
        onPress={ () => navigation.replace('Login') }
        style={ styles.buttonReturn } /> */}
        </View>
        <KeyboardAwareScrollView
        contentContainerStyle={ styles.formContainer }
        keyboardShouldPersistTaps='always'
        >
        <Input 
            placeholder="Nombre del restaurante"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={styles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            keyboardType="email-address"
            selectionColor="black"
            onChangeText = {setNombre}
            value={nombre}
            onSubmitEditing={ onListarRestaurantes }
            autoCapitalize="none"
            autoCorrect={ false }
        />
        <Picker
        selectedValue={categoria}
        onValueChange={(value, index) => setCategoria(value)}
        mode="dropdown" // Android only
        style={styles.picker}
        >
        <Picker.Item key={""} label={"(Cualquiera)"} value={""} />
        {categorias.map((i, index) => 
            <Picker.Item key={index} label={i.label} value={i.value} />
        )}
        </Picker>
        <Text style={ {fontSize: fontPixel(15), color: 'black', marginLeft: pixelSizeHorizontal(340)} }>Orden</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={orden ? "orange" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={orden}
        />
        <TouchableOpacity
            activeOpacity={ 0.8 }
            style={ styles.button }
            onPress={ onListarRestaurantes }
        >
            <Text style={ styles.buttonText } >Buscar</Text>
        </TouchableOpacity>

        {restaurantes.map((item: Restaurante, index: number) => {
            <RestauranteComponent nombre={item.nombre} descripcion={item.descripcion} imagen={item.imagen} calificacion={item.calificacion}/>
        })}

        <RestauranteComponent nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={4.5}/>
        <RestauranteComponent nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={3.2}/>
        
        {/* <Button 
            title="cerrar sesion"
            color="#5856D6"
            onPress={ cerrarSesion }
        /> */}
        </KeyboardAwareScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height: pixelSizeVertical(50),
        marginTop: pixelSizeVertical(30),
        borderBottomWidth:1
    },
    formContainer: {
        top:-10,
        marginTop:20,
        paddingHorizontal: 11,
        justifyContent:'center',
    },
    title: {
        color: '#FD801E',
        fontSize: fontPixel(25),
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center'
    },
    button: {
        borderWidth: 2,
        borderColor: '#FD801E',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        alignSelf:'center',
        width: '45%',
        marginBottom:20
    },
    buttonText: {
        fontSize: 18,
        color: '#FD801E',
        alignSelf: 'center'
    },
    buttonReturn: {
        position: 'absolute',
        bottom: -3,
        left: 5,
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor:"black"
    },
});