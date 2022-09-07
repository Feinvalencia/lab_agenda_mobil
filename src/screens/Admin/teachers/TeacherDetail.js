import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Alert, Pressable, TextInput } from 'react-native'
import {
  Container,
  Content,
  Body,
  Text,
  Label,
  Card,
  CardItem,
  Fab,
} from 'native-base'

import globalStyles from '../../../styles/global'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TeacherContext from '../../../context/teachers/TeacherContext'

const TeacherDetail = ({ route, navigation }) => {
  const {
    cedula,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
    id,
  } = route.params.teacher
  const [active, setActive] = useState('false')
  const { editTeacher } = useContext(TeacherContext)

  const [cedulaID, setCedulaID] = useState(cedula)
  const [nameTeacher, setNameTeacher] = useState(firstName)
  const [lasNameTeacher, setLastNameTeacher] = useState(lastName)
  const [phone, setPhone] = useState(phoneNumber)
  const [addressTeacher, setAddressTeacher] = useState(address)

  useEffect(() => {
    setCedulaID(cedula)
  }, [cedula])

  const onConfirmEditTeacher = () => {
    const data = {
      cedula: cedulaID,
      firstName: nameTeacher,
      lastName: lasNameTeacher,
      phoneNumber: phone,
      address: addressTeacher,
      dateOfBirth,
      id,
    }

    Alert.alert('Editar', '¿Desea guardar los cambios?', [
      {
        text: 'Guardar',
        onPress: () => {
          editTeacher(data)
          navigation.navigate('profesores')
          console.log(data)
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ])
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <Card>
          <CardItem>
            <Body style={styles.body}>
              <Label style={styles.label}> Nombre: </Label>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#666'}
                value={nameTeacher}
                autoCapitalize={'words'}
                onChange={(e) => setNameTeacher(e.nativeEvent.text)}
              />

              <Label style={styles.label}> Apellido: </Label>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#666'}
                value={lasNameTeacher}
                onChange={(e) => setLastNameTeacher(e.nativeEvent.text)}
              />

              <Label style={styles.label}> Cédula: </Label>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#666'}
                value={cedulaID}
                keyboardType="number-pad"
                onChange={(e) => setCedulaID(e.nativeEvent.text)}
              />

              <Label style={styles.label}> Número de Teléfono: </Label>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#666'}
                value={phone}
                keyboardType="number-pad"
                onChange={(e) => setPhone(e.nativeEvent.text)}
              />
              <Label style={styles.label}> Dirección: </Label>
              <TextInput
                style={styles.input}
                placeholderTextColor={'#666'}
                value={addressTeacher}
                onChange={(e) => setAddressTeacher(e.nativeEvent.text)}
              />
            </Body>
          </CardItem>
        </Card>
      </Content>

      <Fab
        style={{ backgroundColor: '#3368FF' }}
        active={active}
        direction="up"
        containerStyle={{}}
        position="bottomRight">
        <Icon
          type="material-icons"
          name="save"
          onPress={() => onConfirmEditTeacher()}
        />
      </Fab>
    </Container>
  )
}
const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  body: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  picker: {
    alignSelf: 'stretch',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    borderColor: '#BDBFC1',
    borderWidth: 1,
  },
  title: {
    color: '#000',
    fontSize: 26,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
    marginTop: 10,
  },
})

export default TeacherDetail
