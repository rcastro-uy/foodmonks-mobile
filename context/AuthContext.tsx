import React, { createContext, useReducer } from "react";
import foodMonksApi from "../api/foodMonksApi";
import { LoginData, LoginResponse, UserInfoResponse } from "../interfaces/appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";


interface AuthContextProps {
    MensajeError: string;
    token: string | null;
    usuario: UserInfoResponse | null;
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    registrarCuenta: (  ) => void;
    iniciarSesion: ( loginData : LoginData ) => void;
    cerrarSesion: () => void;
    quitarError: () => void;
}

const authInicialState: AuthState = {
    MensajeError: '',
    token: null,
    usuario: null,
    estado: 'chequear'
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) =>{

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    const registrarCuenta = () => {}
    const iniciarSesion = async( {email, password} : LoginData) => {

        try {

            const resp1 = await foodMonksApi.post<LoginResponse>('/v1/auth/login', { email, password } );
            if (resp1.data.token != null){
                try {
                    const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
                        headers: {
                            Authorization: "Bearer " + resp1.data.token,
                          }
                    });
                    console.log(resp.data)
           
                } catch (error: any) {
                    console.log(error.response.data.message);
                }
            }
            console.log(resp1.data.token);
            
        } catch (error : any) {
            console.log(error.response.data.message);
            
        }
    }
    const cerrarSesion = () =>  {}
    const quitarError = () =>  {}

    return(
        <AuthContext.Provider value={{
            ...state,
            registrarCuenta,
            iniciarSesion,
            cerrarSesion,
            quitarError 
        }}>
            {children}
        </AuthContext.Provider>
    )
}