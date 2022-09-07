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

export const addRoom = async (formData) => {
    let data = {
      room: formData,
    }
    try {
      if (isEmpty(formData.name) || isEmpty(formData.type) || isEmpty(formData.description) || isEmpty(formData.capacity)) {
        data.error = 'Todos los campos son obligatorios'
      } else {
        const headers = await getAuthHeader()
        console.log(data.room)
        await axios({
          method: 'POST',
          url: `${url_base_api}/rooms`,
          data: data.room,
          headers,
        })
      }
    } catch (error) {
      data.error = 'Error al crear la sala'
    }
    return data
}

const parseRooms = (roomResponse) => {
    const data = roomResponse.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      type: item.type,
      capacity: item.capacity,
      airConditioner: item.airConditioner
    }))
    return data;
}

export const getRooms = async (filter = '') => {
    try {
      const headers = await getAuthHeader()
      const response = await axios({
        method: 'GET',
        url: `${url_base_api}/rooms?search=${filter}`,
        headers,
      })
      return parseRooms(response.data.data.rooms)
    } catch (error) { }
}

export const removeRoom = async (roomId) => {
  console.log(roomId)
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'DELETE',
      url: `${url_base_api}/rooms/${roomId}`,
      headers,
    })
    return true
  } catch (error) { }
};

export const updateRoom = async (roomData) => {
  const 
  {
    name, 
    description, 
    type, 
    capacity, 
    airConditioner, 
    id 
  } = roomData;

  try 
  {
    console.log(roomData);
    const headers = await getAuthHeader()
    const data = {
      name, 
      description, 
      type, 
      capacity, 
      airConditioner, 
      id 
    };

    const response = await axios({
      method: 'PUT',
      url: `${url_base_api}/rooms/${id}`,
      data,
      headers,
    });

    return true;
  } 
  catch (error) {
    return false;
  }
};

  
