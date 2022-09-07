import React, { useReducer } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import SessionReducer from './SessionReducer'
import SessionContext from './SessionContext'
import { login, register } from './../../services/SessionServices'

const SessionState = (props) => {
  const initialState = {
    isLoading: true,
    sessionData: null,
  }

  const [state, dispatch] = useReducer(SessionReducer, initialState)

  const signIn = async (formData) => {
    const data = await login(formData)
    await AsyncStorage.setItem('JWT_TOKEN', JSON.stringify(data))
    dispatch({ type: 'SIGN_IN', payload: data })
    return data
  }

  const signUp = async (formData) => {
    const data = await register(formData)
    await AsyncStorage.setItem('JWT_TOKEN', JSON.stringify(data))
    dispatch({ type: 'SIGN_IN', payload: data })
    return data
  }

  const signOut = async () => {
    await AsyncStorage.removeItem('JWT_TOKEN')
    dispatch({ type: 'SIGN_OUT' })
  }

  const restoreToken = async () => {
    let data = await AsyncStorage.getItem('JWT_TOKEN')
    dispatch({
      type: 'RESTORE_TOKEN',
      payload: data !== null ? JSON.parse(data) : null,
    })
  }

  return (
    <SessionContext.Provider
      value={{ state, signIn, signOut, signUp, restoreToken }}>
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionState
