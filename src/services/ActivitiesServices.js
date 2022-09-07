import { isEmpty } from 'lodash'
import axios from 'axios'
import { url_base_api } from './../utils/api_url'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'

const getAuthHeader = async () => {
  let SESSION_DATA = await AsyncStorage.getItem('SESSION_DATA')
  let sessionData = JSON.parse(SESSION_DATA)
  const authHeader = {
    Authorization: `Bearer ${sessionData.token}`,
  }
  return authHeader
}

export const addActivity = async (formData) => {
  let data = {
    activity: formData,
  }
  try {
    if (isEmpty(formData.name)) {
      data.error = 'El nombre es obligatorio'
    } else {
      const headers = await getAuthHeader()
      await axios({
        method: 'POST',
        url: `${url_base_api}/activities`,
        data,
        headers,
      })
    }
  } catch (error) {
    data.error = 'Error al crear actividad'
  }
  return data
}

const parseEvents = (events) =>
  events.map((item) => ({
    id: item._id,
    start: moment(item.start).format('YYYY-MM-DD kk:mm:ss'),
    end: moment(item.end).format('YYYY-MM-DD kk:mm:ss'),
    summary: item.summary,
    title: item.title
  }))

const parseActivities = (activitiesResponse) =>
  activitiesResponse.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    capacity: item.capacity,
    type: item.type,
    image: item.image,
    events: parseEvents(item.events),
  }))

const parseActivity = (activityResponse) => {
  return {
    id: activityResponse._id,
    name: activityResponse.name,
    description: activityResponse.description,
    capacity: activityResponse.capacity,
    type: activityResponse.type,
    image: activityResponse.image,
    events: parseEvents(activityResponse.events),
  }
}

export const getActivities = async (filter = '') => {
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'GET',
      url: `${url_base_api}/activities?search=${filter}`,
      headers,
    })
    return parseActivities(response.data.data.activity)
  } catch (error) { }
}
export const getActivitiesById = async (id) => {
  try {
    const headers = await getAuthHeader()
    const response = await axios({
      method: 'GET',
      url: `${url_base_api}/activities/${id}`,
      headers,
    })
    console.log("data axios", response);
    return parseActivity(response.data.data.activity)
  } catch (error) { }
}


export const removeActivity = async (activityId) => {
  try {
    const headers = await getAuthHeader()

    const response = await axios({
      method: 'DELETE',
      url: `${url_base_api}/activities/${activityId}`,
      headers,
    })
    return true
  } catch (error) { }
}

export const saveEventsInActivity = async (activityId, events) => {
  try {
    const headers = await getAuthHeader()
    const data = {
      events,
    }
    const response = await axios({
      method: 'PUT',
      url: `${url_base_api}/activities/${activityId}/events`,
      data,
      headers,
    })
    return true
  } catch (error) { }
}
