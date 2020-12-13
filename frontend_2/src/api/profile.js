import axios from './axios'

const getProfileUser = (id) => {
  return axios.get(`api/profile/${id}`)
}
const getSettingProfileUser = (id) => {
  return axios.get(`api/setting/${id}`)
}
const putSettingProfileUser = (id) => {
  return axios.put(`api/setting/${id}`)
}

export default {
  getProfileUser,
  getSettingProfileUser,
  putSettingProfileUser
}
