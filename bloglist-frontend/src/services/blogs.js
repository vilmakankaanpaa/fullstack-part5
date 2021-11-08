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
  console.log('service: creating new blog')
  console.log('token', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blogObject => {
  console.log('service: increasing likes')
  console.log('blog:', blogObject)
  const id = blogObject.id
  const response = await axios.put(`${baseUrl}/${id}`, blogObject)
  return response.data
} 

export default { getAll, create, setToken, addLike }