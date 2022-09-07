import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Account/Login'
import Register from '../screens/Account/Register'

const Stack = createStackNavigator()

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3368FF',
        },
        headerTitleStyle: {
          alignSelf: 'center',
          fontWeight: 'bold',
        },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: 'Registro' }}
      />
    </Stack.Navigator>
  )
}

export default AccountStack
