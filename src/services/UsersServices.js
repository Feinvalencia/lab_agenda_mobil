import axios from 'axios'
import { isEmpty } from 'lodash'
import { validateEmail } from './../utils/validations'
import { url_base_api } from './../utils/api_url'
import AsyncStorage from '@react-native-community/async-storage'


const getAuthHeader = async () => {
    let SESSION_DATA = await AsyncStorage.getItem('SESSION_DATA')
    let sessionData = JSON.parse(SESSION_DATA)
    const authHeader = {
      Authorization: `Bearer ${sessionData.token}`,
    }
    return authHeader
}

const parseUsers = (userResponse) => {
  const data = userResponse.map((item) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    role: item.role,
    blocked: item.blocked
  }))
  return data;
}

export const getUsers = async (filter = '') => {
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'GET',
      url: `${url_base_api}/users?search=${filter}`,
      headers,
    })
    return parseUsers(response.data.data.users)
  } catch (error) { }
}

export const updateUser = async (userData) => {
  const { name, email, role, blocked, id } = userData
  try {
    const headers = await getAuthHeader()
    const data = {
      id,
      name,
      email,
      role,
      blocked
    }
    const response = await axios({
      method: 'PUT',
      url: `${url_base_api}/users/${id}`,
      data,
      headers,
    })
    return true
  } catch (error) { }
}

