import { isEmpty } from 'lodash'
import axios from 'axios'
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

export const addTeacher = async (formData) => {
  let data = {
    teacher: formData,
  }

  try {
    if (isEmpty(formData.firstName) || isEmpty(formData.lastName) ||isEmpty(formData.cedula)) 
    {
      data.error = 'Los campos nombre, apellido y cédula son obligatorios'
    } 
    else 
    {
      const headers = await getAuthHeader();
      await axios({
        method: 'POST',
        url: `${url_base_api}/teachers`,
        data: data.teacher,
        headers,
      })
    }
  } catch (error) {
    data.error = 'Error al crear profesor'
  }

  return data
}

const parseTeachers = (teacherResponse) => {
  const data = teacherResponse.map((item) => ({
    id: item._id,
    cedula: item.cedula,
    firstName: item.firstName,
    lastName: item.lastName,
    phoneNumber: item.phoneNumber,
    address: item.address,
    dateOfBirth: item.dateOfBirth,
  }))
  return data
}

export const getTeachers = async (filter = '') => {
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'GET',
      url: `${url_base_api}/teachers?search=${filter}`,
      headers,
    })
    return parseTeachers(response.data.data.teacher)
  } catch (error) {}
}

export const removeTeacher = async (teacherId) => {
  console.log(teacherId)
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'DELETE',
      url: `${url_base_api}/teachers/${teacherId}`,
      headers,
    })
    return true
  } catch (error) {}
}

export const updateTeacher = async (teacherData) => {
  const {
    cedula,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    id,
  } = teacherData;

  try {
    console.log('services' + teacherData);

    const headers = await getAuthHeader()
    const data = {
      cedula,
      firstName,
      lastName,
      phoneNumber,
      address,
      dateOfBirth,
      id,
    }

    await axios({
      method: 'PUT',
      url: `${url_base_api}/teachers/${id}`,
      data,
      headers,
    })
    
  } 
  catch (error) 
  {
    data.error = 'Error al actualizar el profesor';
  }
}
