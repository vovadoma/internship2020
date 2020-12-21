import axios from './axios'

const getProfileUser = (id) => {
  return axios.get(`api/profile/${id}`)
}
const getSettingProfileUser = (id) => {
  return axios.get(`api/setting/${id}`)
}
const editProfileUser = (editData) => {
  return axios.put('api/editProfile', editData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  getProfileUser,
  getSettingProfileUser,
  editProfileUser
}
