import axios from './axios'

const registerUser = formData => {
  return axios.post('api/registration', { formData: formData })
}
const loginUser = (email, password) => {
  return axios.post('api/login', { email, password })
}
const forgotPassword = (email) => {
  return axios.put('api/forgot', { email })
}
const getResetPassword = (resetToken) => {
  return axios.get(`api/reset/${resetToken}`)
}
const resetPassword = (password, repeatPassword, userId) => {
  return axios.put('api/reset', { password, repeatPassword, userId })
}
const getCurrentUser = () => {
  return axios.get('api/user')
}

export default {
  registerUser,
  loginUser,
  forgotPassword,
  getResetPassword,
  resetPassword,
  getCurrentUser
}
