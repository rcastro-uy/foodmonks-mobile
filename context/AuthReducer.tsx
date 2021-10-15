import { UserInfoResponse } from "../interfaces/appInterfaces";


export interface AuthState {
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    token: string | null;
    MensajeError: string;
    usuario: UserInfoResponse | null;
}

type AuthAction = 
    | { type: 'iniciarSesion', payload: { token: string, usuario: UserInfoResponse  }}
    | { type: 'error', payload: string }
    | { type: 'quitarError' }
    | { type: 'noAutenticado' }
    | { type: 'cerrarSesion' }


    export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

        switch (action.type) {
            case 'error':
                return {
                    ...state,
                    usuario: null,
                    estado: 'no-autenticado',
                    token: null,
                    MensajeError: action.payload
                }
        
            case 'quitarError':
                return {
                    ...state,
                    MensajeError: ''
                };
    
            case 'iniciarSesion':
                return {
                    ...state,
                    MensajeError: '',
                    estado: 'autenticado',
                    token: action.payload.token,
                    usuario: action.payload.usuario
                }
    
            case 'cerrarSesion':
            case 'noAutenticado':
                return {
                    ...state,
                    estado: 'no-autenticado',
                    token: null,
                    usuario: null
                }
    
            default:
                return state;
        }
    
    
    }
    