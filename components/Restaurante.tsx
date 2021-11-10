import React from 'react'
import { View, Text, TouchableWithoutFeedback, useWindowDimensions } from 'react-native'
import { RestauranteComp } from '../interfaces/AppInterfaces'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../theme/Normalization'

export const RestauranteComponent = ({nombre, descripcion, imagen, calificacion}: RestauranteComp) => {
    const { height, width } = useWindowDimensions();
    return (
        <>
        <TouchableWithoutFeedback
                onPress={() => {
                    // Navegar al restaurante seleccionado
                    // this.redirectToChatConverstion(item);
                }}>
                <View style={styles.restauranteCard}>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
                    <View style={styles.imagen}>
                    <Avatar
                        size={65}
                        title="IMG"
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        source={ require('../images/foodMonks.png') }
                    />
                    </View>
                    <View style={styles.textos}>
                    <Text
                        style={{
                            position: "relative",
                            width: widthPixel(200),
                            height: heightPixel(21),
                            marginLeft: pixelSizeHorizontal(0),
                            marginTop: pixelSizeVertical(5),
                        fontSize: fontPixel(18),
                        color: "black",
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        }}>
                        {nombre}
                    </Text>
                    <Text
                        style={{
                            color: "gray",
                            fontSize: fontPixel(12),
                            width: widthPixel(200),
                        }}>
                        {descripcion}
                        </Text>
                    </View>

                    <View
                        style={styles.calificacion}>
                        <AntDesign name="staro" size={20} color="black" />
                        <Text
                            style={{
                                position: 'absolute',
                                //width: widthPixel(17),
                                //height: heightPixel(14),
                                //left: pixelSizeHorizontal(150),
                                //top: pixelSizeVertical(14),
                                marginTop: pixelSizeVertical(2),
                                marginLeft: pixelSizeHorizontal(25),
                                fontSize: fontPixel(15),
                                color: "black",
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                alignItems: 'center'
                            }}>
                            {calificacion}
                    </Text>
                    </View>

                {/* </View> */}
                </View>
        </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    restauranteCard: {
        flexDirection: 'row',
        //alignItems: 'center',
        //flex: 1,
        position: "relative",
        //alignItems: "center",
        //justifyContent: "center",
        height: heightPixel(100),
        width: widthPixel(370),
        marginLeft: pixelSizeHorizontal(5),
        marginTop: pixelSizeVertical(20),
        borderRadius: 10,
        borderWidth: 1,
        // height: 90,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: "white",//Colors.white,
        // borderRadius: 15,
        // shadowColor: "#f0f",//Colors.shadow,
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 1,
        // shadowRadius: 8,
        // elevation: 8,
        // //flexDirection: 'column',
        // paddingLeft: 16,
        // paddingRight: 14,
        // marginTop: 6,
        // marginBottom: 6,
        // marginLeft: 16,
        // marginRight: 16,
    },
    imagen: {
        position: 'relative',
        height: heightPixel(65),
        width: widthPixel(65),
        borderRadius: 10,
        //backgroundColor: "black",
        //borderColor: "#eeeeee",
        //borderWidth: 10,
        marginTop: pixelSizeVertical(10),
        marginLeft: pixelSizeHorizontal(10),
        //borderStyle: 'solid',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    textos: {
        position: 'relative',
        marginRight: pixelSizeHorizontal(0),
        //backgroundColor: 'orange',
        width: widthPixel(200),
        margin: pixelSizeVertical(5),
        borderRadius: 5,
        borderColor: "#eeeeee",
        //height: heightPixel(0),
        //width: widthPixel(0),
        //borderWidth: 5,
        //borderStyle: 'solid',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    calificacion: {
        position: 'relative',
        width: widthPixel(60),
        height: heightPixel(30),
        marginLeft: pixelSizeHorizontal(20),
        marginTop: pixelSizeVertical(10),
        //backgroundColor: 'red'
        //alignItems: 'center',
        //justifyContent: 'center',
    },
});