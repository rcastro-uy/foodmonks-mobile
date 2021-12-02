import { Dimensions, StyleSheet } from "react-native";
import { fontPixel, pixelSizeVertical } from "./Normalization";

const { width: width } = Dimensions.get('window');
export const pedidosStyles = StyleSheet.create ({
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor:"black"
  },
  button: {
    borderWidth: 2,
    borderColor: '#FD801E',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf:'center',
    width: '45%',
    top:-10
  },
  buttonText: {
    fontSize: 18,
    color: '#FD801E',
    alignSelf: 'center'
  },
  imagedetalle: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    flex:0.3,
    margin:5,
    overflow: 'hidden',
    borderColor: '#FFFFFF',
    alignSelf: 'center',
},
  pedidoItemContainer: {
    flexDirection: "row",
    justifyContent:'space-evenly',
    backgroundColor:'white',
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    },
  atributoDestacado: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  atributo: {
    flex:1,
    marginTop: 3,
    marginBottom: 5
  },
  divCategorie:{
    backgroundColor:'#FD801E',
    borderColor: '#FD801E',
    margin:5, alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderRadius:10,
    padding:10
  },
  selected: {
    borderColor: '#FD801E',
    borderWidth: 2,
    backgroundColor:'black',
    justifyContent:'center',
    margin:5, alignItems:'center',
    borderRadius:10,
    padding:10
  },
  containerCategoria : {
    backgroundColor:'transparent',
    alignSelf:'center'
  },
  flatCategorias : {
    top:-12, 
    height:50,
    borderRadius:20,  
    backgroundColor:'transparent',
    justifyContent:'flex-end'
  },
  inputField2: {
    width: width/2.2,
    borderBottomWidth: 1,
    borderBottomColor:"black"
  },
  containerBuscar : {
    top: 20, 
    justifyContent:'center',
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