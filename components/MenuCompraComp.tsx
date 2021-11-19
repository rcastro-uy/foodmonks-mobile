import React, { useContext } from 'react'
import { Dimensions, FlatList, TouchableOpacity, Image, View, Text, ListRenderItemInfo, StyleSheet } from 'react-native';
import { MenuCompra, Producto } from '../interfaces/AppInterfaces'

interface Props {
    vertical: boolean;
    productos: MenuCompra[];
    width: number;
    height: number;
}

export const MenuCompraComp = ({vertical,productos, width,height} : Props) => {
    const renderItemMenu = (item:MenuCompra) => {
        return (
         <View style={styles.container}>   
          <TouchableOpacity style={[styles.itemContainer, {width, height}]} >
           
            <Image style={{ flex:1, borderRadius: 18, }} source={{ uri: item.imagen }} />
            <View style={{ paddingLeft: 8, paddingRight: 8, height: 150 }}>
              <Text style={[styles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {item.menu} (x{item.cantidad}) </Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> Precio U: {item.precio}</Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> Descuento: {item.multiplicadorPromocion}%</Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> Subtotal: {item.precioPorCantidad}</Text>
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + item.calculado}</Text>
          </View>
          </TouchableOpacity>
          </View>
        )
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
              keyExtractor={({menu}, index) => menu}
              renderItem={({ item }:ListRenderItemInfo<MenuCompra>) => (
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
              keyExtractor={({menu}, index) => menu}
              renderItem={({ item }:ListRenderItemInfo<MenuCompra>) => (
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

