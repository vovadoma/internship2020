import axios from './axios'

const registerUser = formData => {
  return axios.post('api/registration', { formData: formData })
}
const loginUser = (email, password) => {
  return axios.post('api/login', { email, password })
}
export default {
  registerUser,
  loginUser
}
