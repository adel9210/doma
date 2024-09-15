import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3500',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default AxiosInstance
