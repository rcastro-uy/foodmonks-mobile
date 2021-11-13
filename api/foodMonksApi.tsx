import axios from 'axios'
import { API_URL } from '@env'


const baseURL : string = `${API_URL}`
console.log (baseURL)

const foodMonksApi = axios.create( {baseURL});

export default foodMonksApi;