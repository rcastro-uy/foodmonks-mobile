import { Ionicons } from "@expo/vector-icons";
import React from "react"
import { View, Text, TextInput, Button, StyleSheet, Image, Keyboard } from "react-native"
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Background } from "../components/Background";
import { FoodLogo } from "../components/FoodLogo";
import { passRecoverService } from "../services/passRecoverService";
import { recoverpassStyles } from "../theme/RecoverPasswordTheme";

export default function RecoverPasswordScreen({navigation}:any) {
    const [email, setEmail] = React.useState("");

    const onRecoverPassword = () => {
        Keyboard.dismiss();
        passRecoverService(email);
    }

    return (
        <>
            <Background />

            <KeyboardAwareScrollView
                contentContainerStyle={ recoverpassStyles.formContainer }
            >
                <View style={{marginBottom:25}} > 
                    <FoodLogo />
                    <Text style={ recoverpassStyles.label }>Email:</Text>
                    <Input 
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={recoverpassStyles.inputField}
                        leftIcon={<Ionicons size={24} color={"#FD801E"} 
                        type={'font-awesome'} name="person"/>}
                        keyboardType="email-address"
                        selectionColor="black"
                        onChangeText = {setEmail}
                        value={email}
                        onSubmitEditing={ onRecoverPassword }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                </View>
                <View style={ recoverpassStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ recoverpassStyles.button }
                        onPress={ onRecoverPassword }
                        >
                        <Text style={ recoverpassStyles.buttonText } >Recuperar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}