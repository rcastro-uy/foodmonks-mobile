import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react'
import { Dimensions, FlatList, TouchableOpacity, Image, View, Text, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Producto } from '../interfaces/AppInterfaces'

interface Props {
    vertical: boolean;
    categoria: any;
    productos: Producto[];
    width: number;
    height: number;
    onPress: any
}


export const PromotionMenu = ({vertical,categoria,productos, width,height, onPress} : Props) => {
    
    const renderItemMenu = (item:Producto) => {
        let catg = categoria
        if(categoria==''||catg==item.categoria.toString())
    {
        return (
         <View style={styles.container}>   
          <TouchableOpacity style={[styles.itemContainer, {width, height}]} onPress={ () => {onPress(item)}} >
           
            <Image style={{ flex:1, borderRadius: 18, }} source={{ uri: item.imagen }} />
            <View style={{ paddingLeft: 8, paddingRight: 8, height: 150 }}>
            { (item.multiplicadorPromocion!=0) ?(
             <>
              <Text style={[styles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {item.multiplicadorPromocion}%OFF {item.nombre} </Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> {item.nombre}</Text>
             
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 15, color:"red", textDecorationLine:'line-through'}]}  >{'$ ' + item.price}</Text>
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + ((item.price*(100-item.multiplicadorPromocion))/100).toFixed(0)}</Text>
              </>
              ):
              ( 
               <> 
                <Text style={[styles.itemDescripcion, {
                    fontWeight: 'bold'
                  }]} > {item.nombre} </Text>
                  <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> {item.nombre}</Text>
                 
                <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + item.price}</Text>
               </>
              )
            }

            
          </View>
          </TouchableOpacity>
          </View>
        )
    } else {
        return(
          null
          )
    }
    }
    const itemSeparator = () =>{
        return(
        <View style={{marginVertical:8}}></View>
        )
    }

    if(vertical == true){
    return (
        <FlatList
              data={productos}
              keyExtractor={({nombre}, index) => nombre}
              renderItem={({ item }:ListRenderItemInfo<Producto>) => (
                  renderItemMenu(item)
                )}
              numColumns={2}
              ItemSeparatorComponent={itemSeparator}
        />
    )
    } else{
    return (
        <FlatList
              data={productos}
              horizontal={true}
              keyExtractor={({nombre}, index) => nombre}
              renderItem={({ item }:ListRenderItemInfo<Producto>) => (
                  renderItemMenu(item)
                )}
              showsHorizontalScrollIndicator={false}
             
        />

    )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        marginHorizontal: 5,
        top:10,
        paddingBottom: 20,
        paddingHorizontal: 7,
        justifyContent: 'center',
        borderRadius: 18,
        bottom: 10,
        
    },
    itemDescripcion: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    itemContainer: {
        width: 200,
        height: 280,
        top:20,
    }
    
});

