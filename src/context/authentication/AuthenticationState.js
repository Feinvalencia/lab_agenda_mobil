import React, { useReducer, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import AuthenticationReducer from './AuthenticationReducer'
import AuthenticationContext from './AuthenticationContext'
import { login, register } from '../../services/AuthenticationServices'

const AuthenticationState = (props) => {
  const initialState = {
    isAuthenticated: false,
    isLoading: true,
  }
  const [state, dispatch] = useReducer(AuthenticationReducer, initialState)

  const signIn = async (formData) => {
    const data = await login(formData)
    await AsyncStorage.setItem('SESSION_DATA', JSON.stringify(data))
    dispatch({ type: 'SIGN_IN', payload: data })
    return data
  }

  const signUp = async (formData) => {
    const data = await register(formData)
    // await AsyncStorage.setItem('SESSION_DATA', JSON.stringify(data))
    dispatch({ type: 'SIGN_IN', payload: data })
    return data
  }

  const signOut = async () => {
    await AsyncStorage.removeItem('SESSION_DATA')
    dispatch({ type: 'SIGN_OUT' })
  }

  const restoreToken = useCallback(async () => {
    let data = await AsyncStorage.getItem('SESSION_DATA')
    dispatch({
      type: 'RESTORE_TOKEN',
      payload: data !== null ? JSON.parse(data) : null,
    })
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{ state, signIn, signUp, signOut, restoreToken }}>
      {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationState
