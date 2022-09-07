import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screens/Profile'

const Stack = createStackNavigator()

const ProfileStack = () => {
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
        name="profile"
        component={Profile}
        options={{ title: 'Mi Perfil' }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
