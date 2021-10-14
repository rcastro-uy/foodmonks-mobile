import axios from "axios";
import { Alert } from "react-native";

export function passRecoverService(email: string) {
    const data = {
        email: email
    }
    if (email === "") {
        return (
            Alert.alert(
                "Solicitud no enviada",
                `Ingrese el correo`,
                [
                    { text: "OK", style: "default" }
                ]
            )
        );
    } else {
        axios({
            method: "POST",
            url: `${process.env.URL_API}/api/v1/users/passRecover`,
            data: data,
        }).then(res => {
            return (
                Alert.alert(
                    "Solicitud enviada",
                    `Email: ${email}`,
                    [
                        { text: "OK", style: "default" }
                    ]
                )
            );
        }).catch(err => {
            return (
                Alert.alert(
                    "Solicitud no enviada",
                    "Error de comunicacion",
                    [
                        { text: "OK", style: "default" }
                    ]
                )
            );
        });
    }
}