import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken')
  const authToken = token || ''
  config.headers.Authorization = authToken
  return config
})
export default axios
