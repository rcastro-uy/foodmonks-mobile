import { API_URL } from "@env";
import axios from "axios";
import { Alert } from "react-native";

export function passRecoverService(email: string) {
    console.log(`${API_URL}`)
    const data = {
        email: email,
    };
    const requestPassRecover = (data: Object) => {
        return axios({
            method: "POST",
            url: `${API_URL}/v1/password/recuperacion/solicitud`,
            data: data,
            // headers: {
            //     Authorization: "Bearer " + "token",
            // },
        });
    };
    if (email === "" || email === "Correo") {
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
        requestPassRecover(data).then((response) => {
            if (response.status === 200) {
                return (
                    Alert.alert(
                        "Solicitud enviada",
                        `Email: ${data.email}`,
                        [
                            { text: "OK", style: "default" }
                        ]
                    )
                );
            }
        }).catch(err => {
            return (
                Alert.alert(
                    "Solicitud no enviada",
                    `Error de comunicacion ${err}`,
                    [
                        { text: "OK", style: "default" }
                    ]
                )
            );
        });
    }
}