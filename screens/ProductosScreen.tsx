import React, { useContext, useEffect, useState } from "react";
import {ActivityIndicator,StyleSheet, Text, View,ScrollView, Image, Dimensions,FlatList, TouchableOpacity, ListRenderItemInfo, ListRenderItem} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
//import { useMenus } from '../hooks/useMenus';
import { CategoriaMenu, Producto } from '../interfaces/AppInterfaces';
import { Ionicons } from '@expo/vector-icons';
import { CarritoContext } from '../context/CarritoContext';
import { RestaurantesContext } from "../context/RestaurantesContext";
import { AuthContext } from "../context/AuthContext";

const { width: windowWidth } = Dimensions.get('window');

export default function ProductosScreen({navigation, route, restauranteId}:any) {
    const [ selectCategoria, setSelectCategoria ] = useState(0);
    //const { menusDisponibles, categorias, isLoading } = useMenus();
    const { top } = useSafeAreaInsets();
    const [menus, setMenus] = React.useState([]);
    const [promociones, setPromociones] = React.useState([]);
    const [categoria, setCategoria] = React.useState("");
    const [precioInicial, setPrecioInicial] = React.useState(0);
    const [precioFinal, setPrecioFinal] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const context = useContext(CarritoContext)
    const { comprobarToken } = useContext(AuthContext);
    const { listarProductos } = useContext(RestaurantesContext);

    useEffect(() => {
      let isMounted = true;
      setLoading(true);
      comprobarToken();
      setMenus([]);
      setPromociones([]);
      listarProductos(restauranteId, categoria, precioInicial, precioFinal).then((res) => {
          // Falta recorrer y filtrar por el descuento para diferenciar entre promociones y menus
          if (isMounted) {
              setMenus(res);
              setLoading(false);
          }
      })
      console.log("Cargo los productos")
      return () => { isMounted = false };
    }, [])

    if ( loading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }

    const renderItem=(item:CategoriaMenu) =>{
        return(
          <TouchableOpacity style={[styles.divCategorie,{backgroundColor:'pink',
            marginHorizontal: 2,
            paddingBottom: 20}]}>
          {/* onPress={()=>setSelectCategoria(item.id)}> */}
            {/* <Image
              style={{width:100,height:80}}
              resizeMode="contain"
              source={{uri : item.image}} /> */}
            <Text style={{fontWeight:'bold',fontSize:22}}>{item}</Text>
          </TouchableOpacity>
        )
      }

      const renderItemMenu = (item:Producto) => {
        let catg = selectCategoria
        if(catg==0||catg==item.categoria)
    {
        return (
          <TouchableOpacity style={styles.itemContainer} onPress={ () => console.log("Va al carrito")/*navigation.navigate('CarritoScreen')*/ }>
            <Image style={{ width: 100, height: 100, marginTop: 20, padding: 10, resizeMode: 'contain' }} source={{ uri: item.imagen }} />
            <View style={{ paddingLeft: 8, paddingRight: 8, height: 150 }}>
              <Text style={[styles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {item.nombre} </Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}>{item.nombre}</Text>
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 15, color:"green" }]}  >{'USD ' + item.price}</Text>
            

            <TouchableOpacity
            onPress={()=>context.agregarProducto(item)}
            style={{
              width:(windowWidth/2)-30,
              backgroundColor:"black",
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              borderRadius:5,
              padding:4
            }}>
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Agregar Pedido</Text>
            <View style={{width:10}} />
            <Ionicons name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
          </View>
          </TouchableOpacity>
        )
    } else {
        return(
            <Text>No hay mas categorias</Text>
        )
    }
    }

    return (
        <ScrollView>
        <View style={{ flex: 1,backgroundColor:"#f2f2f2", marginTop: top }}>
          {/* <View style={{width: windowWidth, alignItems:'center'}} >
              <Image style={{height:100,width:350, flex:1 }}  source={require("../images/FoodMonks4.png")}  />
              <Swiper style={{height:windowWidth/2}} showsPagination={false} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                {
                  categorias.map((itembann: any)=>{
                      const uri = itembann.image
                    return(
                      <Image style={styles.imageBanner} resizeMode="contain" source={{uri}}/>
                    )
                  })
                }
              </Swiper>
              <View style={{height:20}} />
          </View>

          <View style={{width:windowWidth, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
            <Text style={styles.titleCatg}>Categorias {selectCategoria}</Text>
            <FlatList
              horizontal={true}
              data={categorias}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor = { (item) => item.id.toString() }
            />
            <View style={{height:20}} />
          </View> */}
            
          <View style={styles.container}>
        
        <FlatList
            data={menus}
            keyExtractor={({nombre}, index) => nombre}
            renderItem={({ item }:ListRenderItemInfo<Producto>) => (
                renderItemMenu(item)
              )}
            //renderItem={({ item }: ListRenderItemInfo<Food>) => renderItemMenu(item)}
            numColumns={2}
        />
      
      </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        height:windowWidth/2,
        width:windowWidth-40,
        borderRadius:10,
        marginHorizontal:20
    },
    divCategorie:{
        backgroundColor:'red',
        margin:5, alignItems:'center',
        borderRadius:10,
        padding:10
    },
    titleCatg:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
    } 
});