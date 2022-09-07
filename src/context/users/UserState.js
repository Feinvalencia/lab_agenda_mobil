import React, { useReducer, useCallback } from 'react'
import UserReducer from './UserReducer'
import UserContext from './UserContext'
import { getUsers, updateUser } from '../../services/UsersServices'

const UserState = (props) => {
  const initialState = {
    updateUsers: false,
    users: [],
    userSelected: null
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { users, updateUsers, userSelected } = state

  const loadUsers = useCallback(async () => {
    const data = await getUsers()
    dispatch({ type: 'GET_USERS', payload: data })
    return data
  }, [])

  const selectUser = (user) => {
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const editUser = async (user) => {
    const data = await updateUser(user)
    dispatch({ type: 'EDIT_USER', payload: user })
  }

  const createTeacher = async (formData) => {
    // Crear la actividad y llamar al servicio
    const data = await addTeacher(formData)
    dispatch({ type: 'POST_TEACHER', payload: data })
    return data
  }

  const filterUser = async (filter) => {
    const data = await getUsers(filter)
    dispatch({ type: 'GET_USERS', payload: data })
    return data
  }

  return (
    <UserContext.Provider
      value={{
        users,
        loadUsers,
        selectUser, 
        filterUser,
        editUser,
        updateUser
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
