import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
})

export default axiosClient
