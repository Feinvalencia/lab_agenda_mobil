import React, { useContext, useEffect } from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import Loading from './../components/common/Loading'
import AccountStack from './AccountStack'
import ActivitiesStack from './ActivitiesStack'
import ProfileStack from './ProfileStack'
import AuthenticationContext from './../context/authentication/AuthenticationContext'
import AdminStack from './AdminStack'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Navigation = () => {
  const { restoreToken, state } = useContext(AuthenticationContext)

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
    // Obtiene el token jwt desde el storage para saber como navegar
    restoreToken()
  }, [])

  return state.isLoading ? (
    <Loading isVisible={ state.isLoading } text="Cargando sesión" />
  ) : (
      <NavigationContainer>
        { state.token == null ? (
          // No token found, user isn't signed in
          <Tab.Navigator
            initialRouteName="account"
            tabBarOptions={ {
              inactiveTintColor: '#646464',
              activeTintColor: '#3368FF',
            } }>
            <Stack.Screen
              name="account"
              component={ AccountStack }
              options={ { title: 'Cuenta' } }
            />
          </Tab.Navigator>
        ) : (
            // User is signed in
            <Tab.Navigator
              initialRouteName="activities"
              tabBarOptions={ {
                activeBackgroundColor: '#3368FF',
                inactiveBackgroundColor: '#3368FF',
                inactiveTintColor: '#AAAAAA',
                activeTintColor: '#FFFFFF',
              } }
              screenOptions={ ({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
              }) }>
              <Tab.Screen
                name="activities"
                component={ ActivitiesStack }
                options={ { title: 'Actividades' } }
              />
              <Tab.Screen
                name="profile"
                component={ ProfileStack }
                options={ { title: 'Mi Perfil' } }
              />
              { state.user.role === 'ADMIN' && 
               <Tab.Screen
               name="admin"
               component={ AdminStack }
               options={ { title: 'Admin' } }
             />
              }
            </Tab.Navigator>
          ) }
      </NavigationContainer>
    )
}

const screenOptions = (route, color) => {
  let iconName

  switch (route.name) {
    case 'activities':
      iconName = 'run'
      break
    case 'account':
      iconName = 'home-outline'
      break
    case 'profile':
      iconName = 'account'
      break
    default:
      break
    case 'admin': 
      iconName = 'account-cog'
      break
  }
  return (
    <Icon type="material-community" name={ iconName } size={ 22 } color={ color } />
  )
}

export default Navigation
