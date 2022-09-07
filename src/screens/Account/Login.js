import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import LoginForm from '../../components/Account/LoginForm'

const Login = () => {
  const toastRef = useRef()
  return (
    <ScrollView>
      <Image
        source={require('../../../assets/img/gym_logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Toast
        ref={toastRef}
        position="center"
        useNativeDriver="true"
        opacity={0.9}
      />
    </ScrollView>
  )
}

const CreateAccount = () => {
  const navigation = useNavigation()
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{' '}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate('register')}>
        Regístrate
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  btnRegister: {
    color: '#3368FF',
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#3368FF',
    margin: 40,
  },
})

export default Login
