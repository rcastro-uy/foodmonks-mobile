import React, { useContext, useEffect, useState } from "react";
import {ActivityIndicator,StyleSheet, Text, View,ScrollView, Image, Dimensions,FlatList, TouchableOpacity, ListRenderItemInfo, ListRenderItem, LogBox, BackHandler, Alert, RefreshControl} from 'react-native';
import { CategoriaMenu, categorias, Producto } from '../interfaces/AppInterfaces';
import { CarritoContext } from '../context/CarritoContext';
import { RestaurantesContext } from "../context/RestaurantesContext";
import { AuthContext } from "../context/AuthContext";
import { RootStackParams } from "../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Icon, Input } from "react-native-elements";
import { PromotionMenu } from "../components/PromotionMenu";
import { productosStyles } from "../theme/ProductosTheme";
import { useForm } from "../hooks/useForm";



const {width,height} = Dimensions.get('screen');
interface Props extends StackScreenProps<RootStackParams, 'ProductosScreen'>{};

export default function ProductosScreen({navigation, route}:Props) {

  const idRestaurante = route.params.id;
  const nombreRestaurante = route.params.nombre;

  const contextCarrito = useContext(CarritoContext)

  const [refreshing, setRefreshing] = useState (false);
  const [menus, setMenus] = useState<Producto[]>([]);
  const [promociones, setPromociones] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState("");
  const [precioInicial, setPrecioInicial] = useState("")
  const [precioFinal, setPrecioFinal] = useState("")
  const [loading, setLoading] = useState(true);
  const { comprobarToken } = useContext(AuthContext);
  const { listarProductos } = useContext(RestaurantesContext);

  const { precioI, precioF, onChange } = useForm({
    precioI: '',
    precioF: '' 
  });



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
        gestureEnabled: false,
        headerRight: () =>( 
          
          <View style={productosStyles.iconContainer}>
              <TouchableOpacity
                  
                      onPress={()=> navigation.navigate('CartScreen',{'id': idRestaurante, 'nombre' : nombreRestaurante})}>
            {
            (contextCarrito.listarProductos().productos.length==0) ?
            (
            <Icon type="material-community" name='cart-outline' size={30} />
            ):
            (
              <Icon type="material-community" name='cart' size={30} /> 
            )
            }
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
        if (!navigation.isFocused()) {
          return false;
       }
       if (contextCarrito.listarProductos().productos.length != 0){
          Alert.alert("Estas seguro?", "Si regresa, el carrito se vaciará ", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Regresar", onPress: () => { contextCarrito.vaciarCarrito(), navigation.navigate('HomeDrawer')} }
          ]);
         
        }
         else navigation.navigate('HomeDrawer')
          
          return true;
        };
        
      BackHandler.addEventListener("hardwareBackPress",backAction);
      

      let isMounted = true;
      filtroPrecio()
      setLoading(true);
      comprobarToken();
      setMenus([]);
      setPromociones([]);
      listarProductos(idRestaurante, categoria, precioInicial, precioFinal).then((res:Producto[]) => {
          if (isMounted) {
              setMenus(res.filter((res) => 
              (res.multiplicadorPromocion ==0)) );
              const promos = res.filter((res) => 
              (res.multiplicadorPromocion !=0)) 
              setPromociones(promos)
              setLoading(false);
          }
      })
      return () => { isMounted = false; BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
       
    }, [contextCarrito.listarProductos().productos, precioInicial])

    const filtroPrecio = () => {
      if ( parseInt(precioI) > parseInt(precioF)){
          Alert.alert("Atencion", "El precio final debe ser mayor al precio inicial", [
            {
              text: "Ok",
              onPress: () => null,
              style: "cancel"
            }
          ]); 
      }else{
        setPrecioInicial(precioI)
        setPrecioFinal(precioF)
      }
    }

    const onRefresh = () => {
      setRefreshing(true);
      onChange(" ", 'precioF')
      onChange("", 'precioI')
      setPrecioFinal('')
      setPrecioInicial ('')
      setRefreshing(false);
    }

    const alertaCarrito = () =>{
      if (contextCarrito.listarProductos().productos.length != 0){
          Alert.alert("Estas seguro?", "Si regresa, el carrito se vaciará ", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Regresar", onPress: () => { contextCarrito.vaciarCarrito(), navigation.navigate('HomeDrawer')} }
          ]);
      }
      else
       navigation.navigate('HomeDrawer')
    }

    if ( loading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="black" size={ 60 } />
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
          <TouchableOpacity style={item.value == categoria ? productosStyles.selected : productosStyles.divCategorie}
          onPress={()=>manejarSeleccion (item.value)}>
            <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>{item.label}</Text>
          </TouchableOpacity>
        )
      }

      const onPress = (producto: Producto) => {
        navigation.navigate('ProductDetailsScreen', {'producto': producto, 'id': idRestaurante,'nombre': nombreRestaurante})
      }

    return (
      <>
       <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />  }> 
          <View style={productosStyles.containerBuscar}>
            <View style={{flexDirection: "row", alignContent:'center'}} >
              <View style={{flex:1}}>
                <Input 
                    placeholder="Precio inicial"
                    placeholderTextColor="rgba(255,80,40,0.3)"
                    inputContainerStyle={productosStyles.inputField}
                    leftIcon={<Icon size={24} color={"#FD801E"} 
                    type={'material-community'} name="cash"/>}
                    keyboardType="numeric"
                    selectionColor="white"
                    //errorMessage={errorEmail}
                    onChangeText = {(value) => onChange(value, 'precioI')}
                    //value={precioI}
                autoCapitalize="none"
                    autoCorrect={ false }
                />
              </View>
              <View style={{ flex:1}}>
                  <Input 
                        placeholder="precio final"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={productosStyles.inputField}
                        leftIcon={<Icon size={24} color={"#FD801E"} 
                        type={'material-community'} name="cash"/>}
                        keyboardType="numeric"
                        selectionColor="white"
                        //errorMessage={errorEmail}
                        onChangeText = {(value) => onChange(value, 'precioF')}
                        //value={precioF}
                        onSubmitEditing={ filtroPrecio }
                    autoCapitalize="none"
                        autoCorrect={ false }
                    />
                </View>
                <View style={{flex:0.3, justifyContent:'center'}}>
                   <TouchableOpacity
                    onPress={()=> filtroPrecio() }>
                    <Icon type="material-community" name='magnify' size={30} />  
                  </TouchableOpacity>
                </View>
            </View>              
                <View style={productosStyles.flatCategorias}>
                    <FlatList
                      horizontal={true}
                      data={categorias}
                      renderItem={({ item }) => renderItem(item)}
                      keyExtractor = { (item, index) => index.toString() }
                      style={productosStyles.containerCategoria}
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