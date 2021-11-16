import React, { useContext, useEffect, useState } from "react";
import {ActivityIndicator,StyleSheet, Text, View,ScrollView, Image, Dimensions,FlatList, TouchableOpacity, ListRenderItemInfo, ListRenderItem, LogBox, BackHandler, Alert} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
//import { useMenus } from '../hooks/useMenus';
import { CategoriaMenu, categorias, Producto } from '../interfaces/AppInterfaces';
import { Ionicons } from '@expo/vector-icons';
import { CarritoContext } from '../context/CarritoContext';
import { RestaurantesContext } from "../context/RestaurantesContext";
import { AuthContext } from "../context/AuthContext";
import { RootStackParams } from "../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Icon, Input } from "react-native-elements";
import { PromotionMenu } from "../components/PromotionMenu";
import { NavigationHelpersContext } from "@react-navigation/native";



const {width,height} = Dimensions.get('screen');
interface Props extends StackScreenProps<RootStackParams, 'ProductosScreen'>{};

export default function ProductosScreen({navigation, route}:Props) {

  const idRestaurante = route.params.id;
  const nombreRestaurante = route.params.nombre;

  const contextCarrito = useContext(CarritoContext)

  
  

    //const { menusDisponibles, categorias, isLoading } = useMenus();
    const [menus, setMenus] = React.useState<Producto[]>([]);
    const [promociones, setPromociones] = React.useState<Producto[]>([]);
    const [categoria, setCategoria] = React.useState("");
    const [precioInicial, setPrecioInicial] = React.useState(0);
    const [precioFinal, setPrecioFinal] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const context = useContext(CarritoContext)
    const { comprobarToken } = useContext(AuthContext);
    const { listarProductos } = useContext(RestaurantesContext);

    useEffect(() => {
       //para sacar la advertencia. De momento es la solucion
       LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
      navigation.setOptions({
        title:nombreRestaurante,
        headerTitleAlign:'center',
        headerShown: true,
        headerBackTitle: 'Atras',
        headerBackTitleStyle:{color:'black'},
        headerTintColor: 'black',
        headerRight: () =>( 
          
          <View style={styles.iconContainer}>
              <TouchableOpacity
                  
                      onPress={()=> navigation.navigate('CartScreen',{'id': idRestaurante, 'nombre' : nombreRestaurante})}>
  
            <Icon type="material-community" name='cart' size={30} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () =>( 
                      
              <TouchableOpacity
                      onPress={()=> alertaCarrito()}>
  
            <Icon type="material-community" name='arrow-left' />
            </TouchableOpacity>
         ),
      }
      )

      const backAction = () => {
        Alert.alert("Atencion", "Si regresa, el carrito se vaciará ", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Regresar", onPress: () => { contextCarrito.vaciarCarrito(), navigation.navigate('HomeDrawer')} }
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  

      let isMounted = true;
      setLoading(true);
      comprobarToken();
      setMenus([]);
      setPromociones([]);
      listarProductos(idRestaurante, categoria, precioInicial, precioFinal).then((res:Producto[]) => {
          // Falta recorrer y filtrar por el descuento para diferenciar entre promociones y menus
          if (isMounted) {
              setMenus(res.filter((res) => 
              (res.multiplicadorPromocion ==0)) );
              const promos = res.filter((res) => 
              (res.multiplicadorPromocion !=0)) 
              setPromociones(promos)
              setLoading(false);
          }
      })
      return () => { isMounted = false };
    }, [])

    const alertaCarrito = () =>{
      Alert.alert("Atencion", "Si regresa, el carrito se vaciará ", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Regresar", onPress: () => { contextCarrito.vaciarCarrito(), navigation.navigate('HomeDrawer')} }
      ]);

    }

    if ( loading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="black" size={ 100 } />
            </View>
        )
    }

    const manejarSeleccion = (value : string)  => {
      if(categoria === value)
      setCategoria('')
    else 
      setCategoria(value)
    }

    const renderItem=(item: any) =>{
        return(
          <TouchableOpacity style={item.value == categoria ? styles.selected : styles.divCategorie}
          onPress={()=>manejarSeleccion (item.value)}>
  
            {/* <Image
              style={{width:100,height:80}}
              resizeMode="contain"
              source={{uri : item.image}} /> */}
            <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>{item.label}</Text>
          </TouchableOpacity>
        )
      }

      const onPress = (producto: Producto) => {
        navigation.navigate('ProductDetailsScreen', {'producto': producto, 'id': idRestaurante,'nombre': nombreRestaurante})
      }

    return (
      <>
       <ScrollView> 
      <View style={styles.containerBuscar}>
      <View style={{flexDirection: "row", alignContent:'center'}} >
        <View>
      <Input 
            placeholder="Precio inicial"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={styles.inputField}
            leftIcon={<Icon size={24} color={"#FD801E"} 
            type={'material-community'} name="cash"/>}
            keyboardType="numeric"
            selectionColor="white"
            //errorMessage={errorEmail}
           // onChangeText = {(value) => onChange(value, 'email')}
           // value={email}

        autoCapitalize="none"
            autoCorrect={ false }
        />
        </View>
        <View >
      <Input 
            placeholder="precio final"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={[styles.inputField,{alignSelf:'flex-end'}]}
            leftIcon={<Icon size={24} color={"#FD801E"} 
            type={'material-community'} name="cash"/>}
            keyboardType="email-address"
            selectionColor="white"
            //errorMessage={errorEmail}
           // onChangeText = {(value) => onChange(value, 'email')}
           // value={email}

        autoCapitalize="none"
            autoCorrect={ false }
        />
        </View>


</View>    
        <View style={styles.flatCategorias}>
            {/*<Text style={styles.titleCatg}>Categorias {selectCategoria}</Text> */}
            <FlatList
              horizontal={true}
              data={categorias}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor = { (item, index) => index.toString() }
              style={styles.containerCategoria}
              showsHorizontalScrollIndicator={ false }
            />
           
          </View>
      </View>
      
        <View style={{ flex: 0.7,backgroundColor:"#f2f2f2", marginTop: 30 }}>
          <View style={{width: width, alignItems: 'center' }} >
               <Text style={{fontWeight: 'bold', fontSize:20,paddingStart:5, textAlign:'center'}}> Promociones</Text>
            <PromotionMenu vertical={false} categoria={categoria} productos={promociones} width={200} height={280} onPress={onPress} />
          </View>
           
          <View style={{width: width, padding:15, alignItems:'center' }}>
          <Text style={{fontWeight: 'bold', fontSize:20,paddingStart:5}}> Menus</Text>
          <PromotionMenu vertical={true} categoria={categoria} productos={menus} width={150} height={250} onPress={onPress} />
        
        
         
      </View>
        </View>
        </ScrollView>
    </>    
     
    )
}

const styles = StyleSheet.create({
    itemDescripcion: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    itemContainer: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
    },
    imageBanner: {
        height:width/2,
        width:width-40,
        borderRadius:10,
        marginHorizontal:20
    },
    divCategorie:{
        backgroundColor:'#FD801E',
        borderColor: '#FD801E',
        margin:5, alignItems:'center',
        borderWidth:2,
        borderRadius:10,
        padding:10
    },
    selected: {
      borderColor: '#FD801E',
      borderWidth: 2,
      backgroundColor:'black',
      margin:5, alignItems:'center',
        borderRadius:10,
        padding:10
    },
    containerCategoria : {
      backgroundColor:'transparent',
     

    },
    flatCategorias : {
      width:width, 
      height:50,
      borderRadius:20,  
      backgroundColor:'transparent',
      justifyContent:'flex-end'
  
    },
    inputField: {
      width: width/2.2,
      borderBottomWidth: 1,
      borderBottomColor:"black"
  },
  containerBuscar : {
    top: 20, 
    flex:0.3,
    justifyContent:'center',
    backgroundColor:'white',
    borderTopEndRadius: 30,
    borderTopStartRadius:30
  },
  iconContainer: {
    alignItems:'flex-end',
    justifyContent: "space-evenly",
    width: 120
  }
});