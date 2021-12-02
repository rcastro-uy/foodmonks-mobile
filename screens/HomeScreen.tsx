import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, Keyboard, ListRenderItem, ListRenderItemInfo, View, ActivityIndicator, LogBox } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { categorias, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon, Image, Input, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "../theme/Normalization";
import { Picker } from "@react-native-picker/picker";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";
import { ScrollView } from "react-native-gesture-handler";
import { homeStyles } from "../theme/HomeTheme";

export default function HomeScreen({navigation, route}:any) {
    //const [restaurantes, setRestaurantes] = React.useState([]);
    const [nombre, setNombre] = React.useState("");
    const [limpiar, setLimpiar] = React.useState(false);
    const [categoria, setCategoria] = React.useState("");
    const [orden, setOrden] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { listarRestaurantes, restaurantes } = useContext( RestaurantesContext );

    const onListarRestaurantes = async () => {
        Keyboard.dismiss();
        console.log(`${nombre} + ${categoria} + ${orden}`)
        setLoading(true)
        await listarRestaurantes(nombre, categoria, orden)
        setLoading(false)
        setCategoria('')
        setOrden(false)
        setNombre('')
    }

    const toggleSwitch = () => setOrden(previousState => !previousState);
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        let isMounted = true;
        setLoading(true);
    
        listarRestaurantes(nombre, categoria, orden).then((res) => {
            if (isMounted) {
                setLoading(false);
            }
        })
        
        return () => { isMounted = false };
    }, [limpiar])


    const setCategoriaFlatList = (value: string)  => {
        if(categoria == value){
        setCategoria("")
        }else{
        setCategoria(value)
        } 
      }

    
        

    return (
        <>
        <ScrollView>        
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
                        onSubmitEditing={ onListarRestaurantes }
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

            <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ homeStyles.button }
                onPress={() => setLimpiar(previousState => !previousState) }
            >
                <Text style={ homeStyles.buttonText } >Limpiar</Text>
            </TouchableOpacity>

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
    
        </ScrollView>
        </>
    )
}