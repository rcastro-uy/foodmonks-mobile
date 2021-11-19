import { Dimensions, StyleSheet } from "react-native";
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical } from "./Normalization";

const { width: width } = Dimensions.get('window');
export const homeStyles = StyleSheet.create ({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height: pixelSizeVertical(50),
        marginTop: pixelSizeVertical(30),
        borderBottomWidth:1
    },
    formContainer: {
        top:-10,
        marginTop:20,
        paddingHorizontal: 11,
        justifyContent:'center',
    },
    title: {
        color: '#FD801E',
        fontSize: fontPixel(25),
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center'
    },
    button: {
        borderWidth: 2,
        borderColor: '#FD801E',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        alignSelf:'center',
        width: '45%',
        marginBottom:20
    },
    buttonText: {
        fontSize: 18,
        color: '#FD801E',
        alignSelf: 'center'
    },
    buttonReturn: {
        position: 'absolute',
        bottom: -3,
        left: 5,
    },
    // picker: {
    //     marginVertical: 30,
    //     width: 300,
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: "#666",
    // },
    labelSwitch: {
        fontSize: fontPixel(15),
        color: 'black',
        width: 40,
        marginLeft: pixelSizeHorizontal(320),
        marginTop: pixelSizeVertical(30),
        position: 'relative'
    },
    switch: {
        position: 'relative',
    },
    inputField: {
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
    flatCategorias : {
        width:width, 
        height:50,
        borderRadius:20,  
        backgroundColor:'transparent',
        justifyContent:'flex-end'
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
})