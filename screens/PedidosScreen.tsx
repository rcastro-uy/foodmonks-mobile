import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList, Image, TouchableOpacity, Keyboard, ListRenderItem, ListRenderItemInfo, View, ActivityIndicator, ScrollView, LogBox } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { categorias, EstadoPedido, estadosPedido, MedioPago, mediosPago, Pedido, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon, Input, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "../theme/Normalization";
import { Picker } from "@react-native-picker/picker";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";
import { pedidosStyles } from "../theme/PedidosTheme";
import PickerMulti from "../components/PickerMultiPlatform";
import { List } from "react-native-paper";

export default function PedidosScreen({navigation, route}:any) {
    const [pedidos, setPedidos] = React.useState([]);
    const [nombreRestaurante, setNombreRestaurante] = React.useState("");
    const [nombreMenu, setNombreMenu] = React.useState("");
    const [estadoPedido, setEstadoPedido] = React.useState("");
    const [medioPago, setMedioPago] = React.useState("");
    const [ordenamiento, setOrdenamiento] = React.useState("");
    const [fecha, setFecha] = React.useState(new Date());
    const [total, setTotal] = React.useState("");
    const [page, setPage] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const { comprobarToken } = useContext( AuthContext );
    const { listarPedidos } = useContext( RestaurantesContext );

    const onListarPedidos = () => {
        Keyboard.dismiss();
        console.log(`${nombreRestaurante} + ${nombreMenu} + ${estadoPedido} + ${medioPago}`)
        listarPedidos(nombreRestaurante, nombreMenu, estadoPedido, medioPago, ordenamiento, fecha, total, page).then((res) => {
            setPedidos(res)
        })
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        let isMounted = true;
        const unsubscribe = navigation.addListener('focus', () => {
            
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
    });
        return () => { isMounted = false, unsubscribe };
    }, [navigation])

    //console.log(JSON.stringify(pedidos))

    const seleccionarEstado = (value: string)  => {
        if(estadoPedido === value)
        setEstadoPedido("")
      else 
        setEstadoPedido(value)
      }

      const seleccionarMedioPago = (value: string)  => {
        if(medioPago === value)
        setMedioPago("")
      else 
        setMedioPago(value)
      }

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
        <ScrollView>
            <View style={pedidosStyles.containerBuscar}>
                <View style={{flexDirection: "row", alignContent:'center'}} >
                    <Input
                        placeholder="Nombre del restaurante"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={pedidosStyles.inputField}
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
                </View>     
                <View style={pedidosStyles.flatCategorias}>
                    <FlatList
                      horizontal={true}
                      data={estadosPedido}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={item.value == estadoPedido ? pedidosStyles.selected : pedidosStyles.divCategorie}
                        onPress={()=> seleccionarEstado(item.value)}>
                          <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor = { (item, index) => index.toString() }
                      style={pedidosStyles.containerCategoria}
                      showsHorizontalScrollIndicator={ false }
                    />              
                </View>
                <View style={pedidosStyles.flatCategorias}>
                    <FlatList
                        horizontal={true}
                        data={mediosPago}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={item.value == medioPago ? pedidosStyles.selected : pedidosStyles.divCategorie}
                                onPress={()=> seleccionarMedioPago(item.value)}>
                                <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor = { (item, index) => index.toString() }
                        style={pedidosStyles.containerCategoria}
                        showsHorizontalScrollIndicator={ false }
                    /> 
                </View>
        </View>
        {/* <KeyboardAwareScrollView
        contentContainerStyle={ styles.formContainer }
        keyboardShouldPersistTaps='handled'
        > */}
        {/* <TouchableOpacity
            activeOpacity={ 0.8 }
            style={ pedidosStyles.button }
            onPress={ onListarPedidos }
        >
            <Text style={ pedidosStyles.buttonText } >Buscar</Text>
        </TouchableOpacity> */}

        <FlatList
          data={pedidos}
          ListFooterComponent = {renderFooter}
          keyExtractor={({id}, index) => id.toString()}
          renderItem={({ item }:ListRenderItemInfo<Pedido>) => (
            <TouchableOpacity onPress={()=> navigation.navigate('PedidoDetailsScreen',{'idPedido':item.id,'estadoPedido':item.estadoPedido,'calificacionRestaurante':item.calificacionRestaurante,'menus':item.menus}) }  activeOpacity={0.8}>
                <View style={pedidosStyles.pedidoItemContainer}>
                    <Text style={pedidosStyles.atributoDestacado}>Id Pedido: {item.id}</Text>
                    <Text style={pedidosStyles.atributo}>Dirección: {item.direccion}</Text>
                    <Text style={pedidosStyles.atributo}>Restaurante: {item.nombreRestaurante}</Text>
                    <Text style={pedidosStyles.atributo}>Medio de Pago: {item.medioPago}</Text>
                    <Text style={pedidosStyles.atributo}>Estado: {item.estadoPedido}</Text>
                    <Text style={pedidosStyles.atributo}>Fecha Entrega: {item.fechaHoraEntrega}</Text>
                    <Text style={pedidosStyles.atributo}>Calificación: {item.calificacionRestaurante}</Text>
                    <Text style={pedidosStyles.atributo}>Total: $ {item.total}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </ScrollView>
        </>
    )
}