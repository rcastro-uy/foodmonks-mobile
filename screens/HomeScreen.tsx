import React, { useContext, useEffect } from "react";
import { Text, FlatList, TouchableOpacity, Keyboard, ListRenderItem, ListRenderItemInfo, View, ActivityIndicator, LogBox, RefreshControl } from "react-native";
import { categorias, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import { Icon, Image, Input, Switch } from "react-native-elements";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { ScrollView } from "react-native-gesture-handler";
import { homeStyles } from "../theme/HomeTheme";
import { AddressContext } from "../context/AddressContext";
import ChangeSelectedAddress from '../components/ChangeSelectedAddress';
import Modal from "../components/Modal";

export default function HomeScreen({navigation, route}:any) {

    const [refreshing, setRefreshing] = React.useState (false);
    const [nombre, setNombre] = React.useState("");
    const [limpiar, setLimpiar] = React.useState(false);
    const [categoria, setCategoria] = React.useState("");
    const [orden, setOrden] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { direcciones, direccionSeleccionada} = useContext( AddressContext );
    const [mostrarModal, setMostrarModal] = React.useState(false)
    const [renderComponent, setRenderComponent] = React.useState(<ChangeSelectedAddress />)
   
  
    const { listarRestaurantes, restaurantes } = useContext( RestaurantesContext );

    const onListarRestaurantes = async () => {
        Keyboard.dismiss();
        setLoading(true)
        await listarRestaurantes(nombre, categoria, orden, direccionSeleccionada!.id)
        setLoading(false)
      
    }

    const toggleSwitch = () => setOrden(previousState => !previousState);
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        navigation.setOptions({
            headerTitle:() => ( <TouchableOpacity style={ homeStyles.direccionSeleccionada } activeOpacity={0.8} onPress={()=> {cambiarDireccion()} }> 
           
            <Text style={homeStyles.text} >{direccionSeleccionada!.calle + ' ' + direccionSeleccionada!.numero}</Text> 
            <Icon
                type="material-community"
                name="chevron-down"
                color="white"
            /> 
    </TouchableOpacity>),
            headerTitleAlign:'center',
            headerShown: true,
            headerTitleStyle:({color:'white'}),
            
    
        })
        
        let isMounted = true;
        setLoading(true);
    
        listarRestaurantes(nombre, categoria, orden,direccionSeleccionada!.id).then((res) => {
            if (isMounted) {
                setLoading(false);
            }
        })
        
        return () => { isMounted = false };
    }, [limpiar, direccionSeleccionada])


    const setCategoriaFlatList = (value: string)  => {
        if(categoria == value){
        setCategoria("")
        }else{
        setCategoria(value)
        } 
      }

    const limpiarFiltros = () => {
        setCategoria('')
        setNombre('')
        setOrden(false)
        setLimpiar((previousState => !previousState))
    }
    
    const cambiarDireccion = () => {
        setRenderComponent(
            <ChangeSelectedAddress
            setMostrarModal={setMostrarModal}
            />
        )
        setMostrarModal(true)
    }

    return (
        <>
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={limpiarFiltros}
          />}>

        <View style={homeStyles.containerBuscar}>
                    <Input
                        placeholder="Nombre del restaurante"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={homeStyles.inputField}
                        leftIcon={<Icon size={24} color={"#FD801E"} 
                        type={'material-community'} name="store"/>}
                        keyboardType="email-address"
                        selectionColor="gray"
                        onChangeText = {setNombre}
                        value={nombre}
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                <View style={homeStyles.flatCategorias}>
                    <FlatList
                      horizontal={true}
                      data={categorias}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={item.value == categoria ? homeStyles.selected : homeStyles.divCategorie}
                        onPress={()=> setCategoriaFlatList(item.value)}>
                            <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor = { (item, index) => index.toString() }
                      style={homeStyles.containerCategoria}
                      showsHorizontalScrollIndicator={ false }
                    />              
                </View>
        <View style={{flexDirection:'row',flex:1,bottom:5, alignContent:'space-between', justifyContent:'flex-end', alignItems:'center' }} >      
        
            <Text style={homeStyles.labelSwitch}>Ordenar por calificación</Text>
            <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={orden ? "orange" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={orden}
            />
        
        </View>
            <View style={{flexDirection:'row', bottom:5, alignItems:'center', justifyContent:'space-evenly', }} >      
    
            <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ homeStyles.button }
                onPress={ onListarRestaurantes }
            >
                <Text style={ homeStyles.buttonText } >Buscar</Text>
            </TouchableOpacity>
           {(categoria!='' || nombre!='' || orden!=false)? (             
            <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ homeStyles.button }
                onPress={() => limpiarFiltros() }
            >
                <Text style={ homeStyles.buttonText } >Restablecer</Text>
            </TouchableOpacity>
           ):(null)}
            </View>  
    </View>
        
        {
         (loading)?
         (
            
                <View style={{ flex: 1, margin:50, alignSelf:'center', alignContent: 'center' }}>
                    <ActivityIndicator color="black" size={ 60 } />
                </View>
        ):(
    <View style={{ flex: 0.7,backgroundColor:"#f2f2f2", marginTop: 30 }}>
      { (restaurantes.length==0)?
        (<View style={homeStyles.imageNotFound}>
            <Image
            style={{width:'80%', padding: 10,height:250}}
            resizeMode="cover"
            source={ require('../images/product-not-found.png')}
          />
          </View>):
        (    
        <FlatList
          data={restaurantes}
          keyExtractor={({correo}, index) => correo}
          renderItem={({ item }:ListRenderItemInfo<Restaurante>) => (
            <TouchableOpacity onPress={()=> navigation.navigate('ProductosScreen',{'id':item.correo,'nombre':item.nombreRestaurante, 'imagen':item.imagen})}  activeOpacity={0.8}>
            
            <RestauranteComponent correo={item.correo} nombre={item.nombreRestaurante} descripcion={item.descripcion} imagen={item.imagen} calificacion={item.calificacion} cantidadCalificaciones={item.cantidadCalificaciones}/>
            </TouchableOpacity>   
        
            )}
        />
        )}
    </View>    
    )}
        <Modal visible={mostrarModal} setVisible={setMostrarModal}>
                {
                    renderComponent
                }
        </Modal>
        </ScrollView>
        </>
    )
}