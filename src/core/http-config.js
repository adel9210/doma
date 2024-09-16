import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default AxiosInstance
