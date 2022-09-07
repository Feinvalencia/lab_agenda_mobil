import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Admin from '../screens/Admin/Admin'
import Users from '../screens/Admin/users/Users'
import Teachers from '../screens/Admin/teachers/Teachers'
import Rooms from '../screens/Admin/rooms/Rooms'
import UserDetail from '../screens/Admin/users/UserDetail'
import TeacherDetail from '../screens/Admin/teachers/TeacherDetail'
import AddTeacher from '../screens/Admin/teachers/AddTeacher'
import AddRoom from '../screens/Admin/rooms/AddRoom'
import RoomDetail from '../screens/Admin/rooms/RoomDetail'

const Stack = createStackNavigator()

const AdminStack = () => {
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
        name="administrador"
        component={Admin}
        options={{ title: 'Administrador' }}
      />
      <Stack.Screen
        name="usuarios"
        component={Users}
        options={{ title: 'Usuarios' }}
      />
      <Stack.Screen
        name="user-edit"
        component={ UserDetail }
        options={ { title: 'Editar usuario' } }
      />
      <Stack.Screen
        name="profesores"
        component={Teachers}
        options={{ title: 'Profesores' }}
      />
      <Stack.Screen
        name="teacher-edit"
        component={ TeacherDetail }
        options={ { title: 'Editar profesor' } }
      />
      <Stack.Screen
        name="add-teacher"
        component={AddTeacher}
        options={{ title: 'Agregar Profesor' }}
      />
      <Stack.Screen
        name="salas"
        component={Rooms}
        options={{ title: 'Salas' }}
      />
      <Stack.Screen
        name="add-room"
        component={AddRoom}
        options={{ title: 'Agregar Sala' }}
      />
      <Stack.Screen
        name="edit-room"
        component={RoomDetail}
        options={{ title: 'Editar Sala' }}
      />
    </Stack.Navigator>
  )
}

export default AdminStack
