import axios from 'axios'
import { SERVER } from '../../config'

const api = axios.create({
    baseURL: SERVER.URL
})


export default api