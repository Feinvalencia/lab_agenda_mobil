import 'react-native-gesture-handler'
import React from 'react'
import Navigation from './navigations/Navigation'
import AuthenticationState from './context/authentication/AuthenticationState'
import ActivityState from './context/activities/ActivityState'
import UserState from './context/users/UserState'
import TeacherState from './context/teachers/TeacherState'
import RoomState from './context/rooms/RoomState'

const App = () => {
  return (
    <AuthenticationState>
      <UserState>
        <TeacherState>
          <RoomState>
          <ActivityState>
            <Navigation />
          </ActivityState>
          </RoomState>
        </TeacherState>
      </UserState>
    </AuthenticationState>
  )
}

export default App
