import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import Loading from '../common/Loading'
import AuthenticationContext from './../../context/authentication/AuthenticationContext'
import { useNavigation } from '@react-navigation/native'

const RegisterForm = (props) => {
  const { signUp } = useContext(AuthenticationContext)
  const { toastRef } = props
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValue())
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()
  
  const onSubmit = async () => {
    setLoading(true)
    const data = await signUp(formData)
    setLoading(false)
    if (data.error) {
      toastRef.current.show(data.error)
    }
    else
    {
      navigation.navigate('login');
    }
  }

  const onChange = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text })
  }

  return (
    <View style={styles.fromContainer}>
      <Input
        placeholder="Nombre completo"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'name')}
        rightIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
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
        onChange={(e) => onChange(e, 'password')}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, 'repeatPassword')}
        password={true}
        secureTextEntry={!showRepeatPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  )
}

const defaultFormValue = () => ({
  nombre: '',
  email: '',
  password: '',
  repeatPassword: '',
})

const styles = StyleSheet.create({
  fromContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputForm: {
    width: '100%',
    marginTop: 10,
  },
  btnContainerRegister: {
    marginTop: 10,
    width: '95%',
  },
  btnRegister: {
    backgroundColor: '#3368FF',
  },
  iconRight: {
    color: '#c1c1c1',
  },
})

export default RegisterForm;
