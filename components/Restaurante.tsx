import React from 'react'
import { View, Text, TouchableWithoutFeedback, useWindowDimensions } from 'react-native'
import { RestauranteComp } from '../interfaces/AppInterfaces'
import { StyleSheet } from 'react-native'
import { Avatar, Rating } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../theme/Normalization'
import { useNavigation } from '@react-navigation/native'

export const RestauranteComponent = ({correo, nombre, descripcion, imagen, calificacion, cantidadCalificaciones}: RestauranteComp) => {
    //const { navigate } = useNavigation()
    const { height, width } = useWindowDimensions();
    return (
        <>
              <View style={styles.restauranteCard}>
                    <Avatar
                        size="large"
                        title="IMG"
                        rounded
                        activeOpacity={0.7}
                        source={{
                            uri:
                              `${imagen}`,
                          }}
                    />
                    <View style={styles.textos}>
                    <Text
                        style={{
                            position: "relative",
                            width: widthPixel(200),
                            height: heightPixel(21),
                            marginLeft: pixelSizeHorizontal(0),
                            marginTop: pixelSizeVertical(5),
                        fontSize: fontPixel(20),
                        color: "black",
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        }}>
                        {nombre}
                    </Text>
                    <Text
                        style={{
                            color: "gray",
                            fontSize: fontPixel(15),
                            width: widthPixel(200),
                        }}>
                        {descripcion}
                        </Text>
                    </View>

                    <View
                        style={styles.calificacion}>
                        <Rating  fractions="{1}"  imageSize={17}  showRating={false} startingValue={calificacion} />
                        <Text style={{alignSelf:'center'}}>{calificacion}</Text>
                    {(cantidadCalificaciones <10 )?
                        ( <Text style={{borderWidth:0,padding:2, color:'black',fontWeight: "bold", backgroundColor:'#6DC36D', alignSelf:'center' }}>Nuevo</Text> ) : (null)
                    }
                           
                    
                    </View>

                {/* </View> */}
                </View>
        </>
    );
}

const styles = StyleSheet.create({
    restauranteCard: {
        flexDirection: 'row',
        //alignItems: 'center',
        alignContent:'center',
        flex: 1,
        backgroundColor:'white',
        alignSelf:'center',
        //alignItems: "center",
        justifyContent: "center",
        padding:10,
        margin:10,
        borderRadius: 10,
        borderWidth: 1,
       
    },
    textos: {
        position: 'relative',
        marginRight: pixelSizeHorizontal(0),
        //backgroundColor: 'orange',
        width: widthPixel(200),
        margin: pixelSizeVertical(5),
        borderRadius: 5,
        borderColor: "#eeeeee",
        paddingStart:10
    },
    calificacion: {
        
    },
});