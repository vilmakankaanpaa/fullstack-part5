import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blogObject => {
  const id = blogObject.id
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
}

const remove = async blogObject => {
  const id = blogObject.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const exportedObjects = { getAll, create, setToken, addLike, remove }
export default exportedObjects