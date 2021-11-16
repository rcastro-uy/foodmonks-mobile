import { Dimensions, StyleSheet } from "react-native";

const { width: width, height: height } = Dimensions.get('window');
export const productDetailsStyles = StyleSheet.create ({

    image: {
        width:width,
        height:height/2.5,
    },
    container: {
        flex:0.33,
        backgroundColor:'white',
        top:15,
        paddingHorizontal: 11,
        justifyContent:'center',
        marginHorizontal:20,
        borderRadius:10
    },
    itemDescripcion: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    button: {
        width: 250, 
         backgroundColor:'#FD801E',
         borderRadius: 100,
         alignSelf: 'center'
     },
     title: {
         alignItems: 'center',
         color : 'white'
 
     },

})