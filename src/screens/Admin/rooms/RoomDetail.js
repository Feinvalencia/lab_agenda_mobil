import React, { useState, useContext } from 'react'
import { StyleSheet, Image, Alert, TextInput, View } from 'react-native'
import {
  Container,
  Content,
  Body,
  Text,
  Label,
  H1,
  Card,
  CardItem,
  Fab,
} from 'native-base'
import CheckBox from '@react-native-community/checkbox'

import globalStyles from '../../../styles/global'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RoomContext from '../../../context/rooms/RoomContext'
import { Edit } from '@material-ui/icons'

const RoomDetail = ({ route, navigation }) => {
  const {
    name,
    description,
    type,
    capacity,
    airConditioner,
    id,
  } = route.params.room
  const [active, setActive] = useState('false')
  const { editRoom } = useContext(RoomContext)

  const [descriptionRoom, setDescriptionRoom] = useState(description)
  const [typeRoom, setTypeRoom] = useState(type)
  const [capacityRoom, setCapacityRoom] = useState(capacity)
  const [airConditionerRoom, setAirConditionerRoom] = useState(airConditioner)

  const onConfirmEditRoom = () => {
    const data = {
      name,
      description: descriptionRoom,
      type: typeRoom,
      capacity: capacityRoom == null ? 0 : capacityRoom,
      airConditioner: airConditionerRoom,
      id,
    }

    if (data.description == '' || data.type == '' || data.capacity == null) {
      Alert.alert('Alerta', 'Todos los campos son obligatorios.', [
        {
          text: 'Aceptar',
        },
      ])
    } else if (data.capacity == 0) {
      Alert.alert('Alerta', 'La capacidad de la sala debe ser mayor a 0.', [
        {
          text: 'Aceptar',
        },
      ])
    } else {
      Alert.alert('Editar', '¿Desea guardar los cambios?', [
        {
          text: 'Guardar',
          onPress: () => {
            editRoom(data)
            navigation.navigate('salas')
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ])
    }
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <Text style={styles.title}>{name}</Text>
        <Card>
          <CardItem>
            <Body style={styles.body}>
              <Label style={styles.label}> Descripción: </Label>
              <TextInput
                style={globalStyles.input}
                placeholderTextColor={'#666'}
                value={descriptionRoom}
                onChange={(e) => setDescriptionRoom(e.nativeEvent.text)}
                maxLength={40}
              />

              <Label style={styles.label}> Tipo: </Label>
              <TextInput
                style={globalStyles.input}
                placeholderTextColor={'#666'}
                value={typeRoom}
                onChange={(e) => setTypeRoom(e.nativeEvent.text)}
              />

              <Label style={styles.label}> Capacidad: </Label>
              <TextInput
                style={globalStyles.input}
                value={capacityRoom.toString()}
                keyboardType="number-pad"
                onChange={(e) => setCapacityRoom(e.nativeEvent.text)}
              />

              <Text style={styles.label}>Aire Acondicionado</Text>
              <CheckBox
                value={airConditionerRoom}
                onValueChange={(newValue) => setAirConditionerRoom(newValue)}
                style={styles.checkbox}
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
          onPress={() => onConfirmEditRoom()}
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
    marginTop: 20,
  },
  picker: {
    alignSelf: 'stretch',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  title: {
    ...globalStyles.title,
    color: '#047BC4',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 26,
  },
})

export default RoomDetail
