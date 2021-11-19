import { Dimensions, StyleSheet } from "react-native";


const { width: windowWidth } = Dimensions.get('window');
export const confirmOrderStyles = StyleSheet.create ({
    container: {
        alignSelf: "center",
        justifyContent:'center',
        alignItems: "center",
        backgroundColor: 'white',
        width: windowWidth/1.1,
        top: 15,
        elevation:5,
        borderRadius:6,
        marginBottom: 20
    },
    containerDetalles: {
        alignSelf: "center",
        backgroundColor: 'white',
        width: windowWidth/1.1,
        top: 15,
        elevation:5,
        borderRadius:6,
        marginBottom: 20
    },
    containerAddress: {
        alignSelf: "center",
        backgroundColor: 'white',
        width: windowWidth/1.1,
        elevation:5,
        borderRadius:6,
        marginBottom: 20
    },
    containerRadioButton: {
        alignSelf: "center",
        alignItems: "center",
        flexDirection:"row",
        justifyContent: "center",
        backgroundColor: 'white',
        width: windowWidth/1.1,
        elevation:5,
        borderRadius:6,
        marginBottom: 20
    },
    title: {
        color: '#FD801E',
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
        
        paddingStart: 15
    },
    button: {
        width: 200, 
        alignSelf:'center',
        borderColor: '#FD801E',
        backgroundColor: '#FD801E',
         borderWidth:2,
         borderRadius: 100,    
     },
     titleButton: {
         alignItems: 'center',
         color : 'white'
     },
    
})