import axios from 'axios'

const baseUrl = "https://tyoajanseuranta44.azurewebsites.net/työajanseuranta/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response.data)
}

export default { authenticate }