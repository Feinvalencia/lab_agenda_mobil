import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import Loading from '../common/Loading'
import AuthenticationContext from './../../context/authentication/AuthenticationContext'

const LoginForm = (props) => {
  const { signIn } = useContext(AuthenticationContext)
  const { toastRef } = props
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValue())
  const [loading, setLoading] = useState(false)

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const onSubmit = async () => {
    setLoading(true)
    const data = await signIn(formData)
    setLoading(false)
    if (data.error) {
      toastRef.current.show(data.error)
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        autoCapitalize="none"
        onChange={(e) => onChange(e, 'email')}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, 'password')}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  )
}

const defaultFormValue = () => ({
  email: '',
  password: '',
})

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  inputForm: {
    width: '100%',
    marginTop: 5,
  },
  btnContainerLogin: {
    marginTop: 10,
    width: '95%',
  },
  btnLogin: {
    backgroundColor: '#3368FF',
  },
  iconRight: {
    color: '#c1c1c1',
  },
})

export default LoginForm
