import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";


export const profileStyles = StyleSheet.create ({
    container: {
        backgroundColor:'white',
        flexDirection: "row",
        margin: 15,
        justifyContent:'space-evenly',
        borderRadius:15,
        elevation:6,
        padding:20
    },
    containerList: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 30,
        backgroundColor:"white",
        borderRadius:7,
        elevation: 6,
    },
    optionContainer: {
        paddingHorizontal : 25,
        backgroundColor: 'transparent',
        bottom:5,
    },
    title: {
        color: '#FD801E',
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
        bottom:10,
        paddingStart: 15
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    imageProfile: {
        resizeMode: 'center',
        width: 120,
        height: 120,
        borderRadius:250,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        alignSelf: 'center',
    },
     optionText: {
        color: 'black',
        paddingStart: 10,
        fontSize: 18,
        fontWeight: 'bold'
    }

})