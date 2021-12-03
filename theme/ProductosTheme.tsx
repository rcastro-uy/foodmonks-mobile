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
      justifyContent:'flex-end',
      bottom:5
  
    },
    inputField: {
      borderBottomWidth: 1,
      borderBottomColor:"black"
  },
  containerBuscar : {
    top: 20, 
    justifyContent:'center',
    backgroundColor:'white',
    borderTopEndRadius: 30,
    borderTopStartRadius:30,
    padding:5
  },
  iconContainer: {
    alignItems:'flex-end',
    justifyContent: "space-evenly",
    width: 120
  },
  button: {
    borderWidth: 2,
    borderColor: '#FD801E',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    bottom:5
   
},
buttonText: {
    fontSize: 18,
    color: '#FD801E',
    alignSelf: 'center'
},

})