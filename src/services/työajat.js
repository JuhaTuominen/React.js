import axios from 'axios'

const baseUrl = "https://tyoajanseuranta44.azurewebsites.net/työajanseuranta/työajat"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newTyöajat => {
    return axios.post(baseUrl, newTyöajat)
}

 const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (id,changedTyöajat) => {
    return axios.put(`${baseUrl}/${id}`, changedTyöajat)
}

export default { getAll, create, remove, update }