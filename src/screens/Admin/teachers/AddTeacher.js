import React, { useState, useContext } from 'react'
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base'
import { StyleSheet, Alert } from 'react-native'

import DatePicker from 'react-native-date-picker'
import Loading from '../../../components/common/Loading'
import globalStyles from '../../../styles/global'
import TeacherContext from '../../../context/teachers/TeacherContext'

const AddTeacher = (props) => {
  const { createTeacher } = useContext(TeacherContext)

  const { navigation } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cedula, setCedula] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    const formData = {
      firstName,
      lastName,
      cedula,
      phoneNumber,
      address,
      dateOfBirth,
    }

    const response = await createTeacher(formData)
    setLoading(false)
    if (response.error) {
      Alert.alert(
        'Error',
        'Los campos "Nombre", "Apellido" y "Cédula" son obligatorios'
      )
    } else {
      navigation.navigate('profesores')
    }
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <Form>
          <Item floatingLabel>
            <Label>Nombre</Label>
            <Input onChange={(e) => setFirstName(e.nativeEvent.text)} />
          </Item>
          <Item floatingLabel>
            <Label>Apellido</Label>
            <Input onChange={(e) => setLastName(e.nativeEvent.text)} />
          </Item>
          <Item floatingLabel>
            <Label>Cédula</Label>
            <Input onChange={(e) => setCedula(e.nativeEvent.text)} />
          </Item>
          <Item floatingLabel>
            <Label>Número de teléfono</Label>
            <Input onChange={(e) => setPhoneNumber(e.nativeEvent.text)} />
          </Item>
          <Item floatingLabel>
            <Label> Dirección </Label>
            <Input onChange={(e) => setAddress(e.nativeEvent.text)} />
          </Item>
          <Item stackedLabel onPress={() => setDatePickerIsOpen(true)}>
            <Label> Fecha de Nacimiento </Label>
            {datePickerIsOpen && (
              <DatePicker
                style={{ height: 90, marginTop: 15 }}
                open={datePickerIsOpen}
                date={dateOfBirth}
                locale="es"
                onDateChange={(date) => {
                  setDateOfBirth(date)
                }}
                on={() => setDatePickerIsOpen(false)}
                mode="date"
              />
            )}
          </Item>

          <Button style={styles.btnContainerLogin} block onPress={onSubmit}>
            <Text>Crear</Text>
          </Button>
          <Loading isVisible={loading} text=" Creando profesor" />
        </Form>
      </Content>
    </Container>
  )
}

const defaultFormValue = () => ({
  email: '',
  password: '',
})

const styles = StyleSheet.create({
  inputForm: {
    width: '100%',
    marginTop: 10,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: '100%',
  },
  btnLogin: {
    backgroundColor: '#3368FF',
  },
  iconRight: {
    color: '#c1c1c1',
  },
})

export default AddTeacher
