import { Dimensions, StyleSheet } from "react-native";

const { width: width } = Dimensions.get('window');
export const productosStyles = StyleSheet.create ({

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
      borderBottomWidth: 1,
      borderBottomColor:"black"
  },
  containerBuscar : {
    top: 20, 
    flex:0.3,
    //justifyContent:'center',
    backgroundColor:'white',
    borderTopEndRadius: 30,
    borderTopStartRadius:30
  },
  iconContainer: {
    alignItems:'flex-end',
    justifyContent: "space-evenly",
    width: 120
  }

})