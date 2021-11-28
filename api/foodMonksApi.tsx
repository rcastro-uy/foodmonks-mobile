import axios from 'axios'
import {API_URL} from '@env'

console.log(API_URL)
const baseURL : string = `${API_URL}`

const foodMonksApi = axios.create( {baseURL});

export default foodMonksApi;