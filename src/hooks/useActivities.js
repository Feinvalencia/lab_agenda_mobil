import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getActivities } from './../services/ActivitiesServices'

const useActivities = () => {
  const [activities, setActivities] = useState([])

  useFocusEffect(
    useCallback(() => {
      const loadActivities = async () => {
        const response = await getActivities()
        setActivities(response)
      }
      loadActivities()
      console.log(activities)
    }, [])
  )

  return { activities }
}

export default useActivities
