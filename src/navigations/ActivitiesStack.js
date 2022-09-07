import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Activities from '../screens/Activities/Activities'
import ActivityDetail from '../screens/Activities/ActivityDetail'
import AddActivity from '../screens/Activities/AddActivity'
import MyCalendar from '../screens/Calendar/MyCalendar'
import AddEvent from '../screens/Calendar/AddEvent'
import EventDetail from '../screens/Calendar/EventDetail'
import ModifyEvent from '../screens/Calendar/ModifyEvent'

const Stack = createStackNavigator()

const ActivitiesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3368FF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="activities"
        component={Activities}
        options={{ title: 'Actividades' }}
      />
      <Stack.Screen
        name="activity-deatail"
        component={ActivityDetail}
        options={{ title: 'Detalle de actividad' }}
      />
      <Stack.Screen
        name="add-activity"
        component={AddActivity}
        options={{ title: 'Nueva actividad' }}
      />
      <Stack.Screen
        name="calendar"
        component={MyCalendar}
        options={{ title: 'Agenda eventos' }}
      />
      <Stack.Screen
        name="add-event"
        component={AddEvent}
        options={{ title: 'Nuevo evento' }}
      />
      <Stack.Screen
        name="event-detail"
        component={EventDetail}
        options={{ title: 'Detalle evento' }}
      />
      <Stack.Screen
        name="edit-event"
        component={ModifyEvent}
        options={{ title: 'Editar evento' }}
      />
    </Stack.Navigator>
  )
}

export default ActivitiesStack
