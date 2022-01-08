import axios from 'axios'

const baseUrl = "https://tyoajanseuranta44.azurewebsites.net/työajanseuranta/työmaat"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newTyömaat => {
    return axios.post(baseUrl, newTyömaat)
}

 const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (id,changedTyömaat) => {
    return axios.put(`${baseUrl}/${id}`, changedTyömaat)
}

export default { getAll, create, remove, update }