import axios from "axios"
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {getAll, create, remove}