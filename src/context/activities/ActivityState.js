import React, { useReducer, useCallback } from 'react'
import ActivityReducer from './ActivityReducer'
import ActivityContext from './ActivityContext'
import {
  getActivities,
  addActivity,
  removeActivity,
  saveEventsInActivity,
  getActivitiesById,
} from '../../services/ActivitiesServices'

const ActivityState = (props) => {
  const initialState = {
    updateActivities: false,
    activities: [],
    activitySelected: null,
    events: [],
  }

  const [state, dispatch] = useReducer(ActivityReducer, initialState)
  const { activities, updateActivities, activitySelected, events } = state

  const loadActivities = useCallback(async () => {
    const data = await getActivities()
    dispatch({ type: 'GET_ACTIVITIES', payload: data })
    return data
  }, [])

  const filterActivity = async (filter) => {
    const data = await getActivities(filter)
    dispatch({ type: 'GET_ACTIVITIES', payload: data })
    return data
  }
  const loadActivityById = async (id) => {
    const data = await getActivitiesById(id)


    // dispatch({ type: 'GET_ACTIVITIES_BY_ID', payload: data })
    console.log("data", data);

    return data
  }
  const createActivity = async (formData) => {
    // Crear la actividad y llamar al servicio
    const data = await addActivity(formData)
    dispatch({ type: 'POST_ACTIVITY', payload: data })
    return data
  }
  const deleteActivity = async (activityId) => {
    // Borra la actividad y llamar al servicio
    const data = await removeActivity(activityId)
    dispatch({ type: 'POST_ACTIVITY', payload: data })
    return data
  }

  const selectActivity = (activity) => {
    dispatch({ type: 'SELECT_ACTIVITY', payload: activity })
  }

  const addEventToActivity = (event) => {
    dispatch({ type: 'ADD_EVENT_TO_ACTIVITY', payload: event })
    return event
  }

  const saveActivityEvents = async (activity = activitySelected.id, newEvents = events) => {
    const data = await saveEventsInActivity(activity, newEvents)
    dispatch({ type: 'POST_EVENT', payload: newEvents })
    return data
  }

  return (
    <ActivityContext.Provider
      value={ {
        activities,
        updateActivities,
        activitySelected,
        events,
        state,
        loadActivityById,
        loadActivities,
        createActivity,
        filterActivity,
        deleteActivity,
        selectActivity,
        addEventToActivity,
        saveActivityEvents,
      } }>
      { props.children }
    </ActivityContext.Provider>
  )
}

export default ActivityState
