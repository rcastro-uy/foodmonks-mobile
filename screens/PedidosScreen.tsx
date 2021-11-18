import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList, Image, TouchableOpacity, Keyboard, ListRenderItem, ListRenderItemInfo, View, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { categorias, EstadoPedido, MedioPago, Pedido, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "../theme/Normalization";
import { Picker } from "@react-native-picker/picker";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function PedidosScreen({navigation, route}:any) {
    const [pedidos, setPedidos] = React.useState([]);
    const [nombreRestaurante, setNombreRestaurante] = React.useState("");
    const [nombreMenu, setNombreMenu] = React.useState("");
    const [estadoPedido, setEstadoPedido] = React.useState(EstadoPedido.Cualquiera);
    const [medioPago, setMedioPago] = React.useState(MedioPago.CUALQUIERA);
    const [ordenamiento, setOrdenamiento] = React.useState("");
    const [fecha, setFecha] = React.useState(new Date());
    const [total, setTotal] = React.useState("");
    const [page, setPage] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const { comprobarToken } = useContext( AuthContext );
    const { listarPedidos } = useContext( RestaurantesContext );

    const onListarPedidos = () => {
        Keyboard.dismiss();
        console.log(`${nombreRestaurante} + ${nombreMenu} + ${estadoPedido}`)
        listarPedidos(nombreRestaurante, nombreMenu, estadoPedido, medioPago, ordenamiento, fecha, total, page).then((res) => {
            setPedidos(res)
        })
    }

    //const toggleSwitch = () => setOrden(previousState => !previousState);
    
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        comprobarToken();
        setPedidos([]);
        listarPedidos(nombreRestaurante, nombreMenu, estadoPedido, medioPago, ordenamiento, fecha, total, page).then((res) => {
            if (isMounted) {
                setPedidos(res);
                setLoading(false);
            }
        })
        console.log("Cargo los pedidos")
        return () => { isMounted = false };
    }, [])

    const renderFooter = () => {
        if(loading){
            return(
                <View style={{paddingVertical: 20}}>
                    <ActivityIndicator size='large' color='blue'/>
                </View>
            );
        }
        else {
            return(
                <Text>No hay mas pedidos</Text>
            );
        }
    }

    return (
        <>
        <SafeAreaView>        
        {/* <KeyboardAwareScrollView
        contentContainerStyle={ styles.formContainer }
        keyboardShouldPersistTaps='handled'
        > */}
        <Input
            placeholder="Nombre del restaurante"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={styles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            keyboardType="email-address"
            selectionColor="black"
            onChangeText = {setNombreRestaurante}
            value={nombreRestaurante}
            onSubmitEditing={ onListarPedidos }
            autoCapitalize="none"
            autoCorrect={ false }
        />
        {/* <Picker
        selectedValue={categoria}
        onValueChange={(value, index) => setCategoria(value)}
        mode="dropdown" // Android only
        style={styles.picker}
        >
        <Picker.Item key={""} label={"(Cualquiera)"} value={""} />
        {categorias.map((i, index) => 
            <Picker.Item key={index} label={i.label} value={i.value} />
        )}
        </Picker> */}
        <Text style={ {fontSize: fontPixel(15), color: 'black', marginLeft: pixelSizeHorizontal(340)} }>Orden</Text>
        {/* <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={orden ? "orange" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={styles.switch}
            value={orden}
        /> */}
        <TouchableOpacity
            activeOpacity={ 0.8 }
            style={ styles.button }
            onPress={ onListarPedidos }
        >
            <Text style={ styles.buttonText } >Buscar</Text>
        </TouchableOpacity>

        <FlatList
          data={pedidos}
          ListFooterComponent = {renderFooter}
          keyExtractor={({id}, index) => id.toString()}
          renderItem={({ item }:ListRenderItemInfo<Pedido>) => (
            <TouchableOpacity onPress={()=> navigation.navigate('PedidoDetailsScreen',{'idPedido':item.id,'estadoPedido':item.estadoPedido,'restaurante':item.restaurante}) }  activeOpacity={0.8}>
                <View style={styles.categoriesItemContainer}>
                    <Text style={styles.categoriesName}>{item.estadoPedido}</Text>
                    <Text style={styles.categoriesInfo}>{item.id} recipes</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        
        {/* <RestauranteComponent correo={"prueba"} nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={4.5}/>
        <RestauranteComponent correo={"prueba"}  nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={3.2}/> */}
        </SafeAreaView>
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
    switch: {
        position: 'relative',
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor:"black"
    },


    categoriesItemContainer: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 215,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
      },
      categoriesPhoto: {
        width: '100%',
        height: 155,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: 'blue',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
      },
      categoriesName: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
        marginTop: 8
      },
      categoriesInfo: {
        marginTop: 3,
        marginBottom: 5
      }
});