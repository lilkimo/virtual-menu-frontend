import {mande} from 'mande'

export const api_url = 'http://localhost:8000'
const api = mande(api_url)
export default api
