import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, Keyboard, ListRenderItem, ListRenderItemInfo, View, ActivityIndicator, LogBox } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { categorias, Restaurante } from "../interfaces/AppInterfaces";
import { RestauranteComponent } from "../components/Restaurante";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "../theme/Normalization";
import { Picker } from "@react-native-picker/picker";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements/dist/buttons/Button";
import { ScrollView } from "react-native-gesture-handler";
import { homeStyles } from "../theme/HomeTheme";

export default function HomeScreen({navigation, route}:any) {
    const [restaurantes, setRestaurantes] = React.useState([]);
    const [nombre, setNombre] = React.useState("");
    const [categoria, setCategoria] = React.useState("");
    const [orden, setOrden] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { cerrarSesion, comprobarToken } = useContext( AuthContext );
    const { listarRestaurantes } = useContext( RestaurantesContext );

    const onListarRestaurantes = () => {
        Keyboard.dismiss();
        console.log(`${nombre} + ${categoria} + ${orden}`)
        listarRestaurantes(nombre, categoria, orden).then((res) => {
            setRestaurantes(res)
        })
    }

    const toggleSwitch = () => setOrden(previousState => !previousState);
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        let isMounted = true;
        setLoading(true);
        comprobarToken();
        setRestaurantes([]);
        listarRestaurantes(nombre, categoria, orden).then((res) => {
            if (isMounted) {
                setRestaurantes(res);
                setLoading(false);
            }
        })
        console.log("Cargo los restaurantes")
        return () => { isMounted = false };
    }, [])

    const setCategoriaFlatList = (value: string)  => {
        if(categoria === value)
        setCategoria("")
      else
        setCategoria(value)
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
                <Text>No hay mas restaurantes</Text>
            );
        }
    }

    return (
        <>
        <ScrollView>        
        {/* <KeyboardAwareScrollView
        contentContainerStyle={ styles.formContainer }
        keyboardShouldPersistTaps='handled'
        > */}
        {/* <Input 
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
        /> */}
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
        <View style={homeStyles.containerBuscar}>
                <View style={{flexDirection: "row", alignContent:'center'}} >
                    <Input
                        placeholder="Nombre del restaurante"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={homeStyles.inputField}
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
                </View>     
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
        </View>
        <Text style={homeStyles.labelSwitch}>Orden</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={orden ? "orange" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={homeStyles.switch}
            value={orden}
        />
        <TouchableOpacity
            activeOpacity={ 0.8 }
            style={ homeStyles.button }
            onPress={ onListarRestaurantes }
        >
            <Text style={ homeStyles.buttonText } >Buscar</Text>
        </TouchableOpacity>

        <FlatList
          data={restaurantes}
          ListFooterComponent = {renderFooter}
          keyExtractor={({correo}, index) => correo}
          renderItem={({ item }:ListRenderItemInfo<Restaurante>) => (
            <TouchableOpacity onPress={()=> navigation.navigate('ProductosScreen',{'id':item.correo,'nombre':item.nombreRestaurante, 'imagen':item.imagen})}  activeOpacity={0.8}>
            
            <RestauranteComponent correo={item.correo} nombre={item.nombreRestaurante} descripcion={item.descripcion} imagen={item.imagen} calificacion={item.calificacion}/>
            </TouchableOpacity>   
        
            )}
        />
        
        {/* <RestauranteComponent correo={"prueba"} nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={4.5}/>
        <RestauranteComponent correo={"prueba"}  nombre={"Mauricio"} descripcion={"el restaurante"} imagen={"img.com"} calificacion={3.2}/> */}
        </ScrollView>
        </>
    )
}