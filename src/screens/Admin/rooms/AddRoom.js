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
import CheckBox from '@react-native-community/checkbox'
import Loading from '../../../components/common/Loading'
import globalStyles from '../../../styles/global'
import RoomContext from '../../../context/rooms/RoomContext'

const AddRoom = (props) => {
  const { createRoom } = useContext(RoomContext)

  const { navigation } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [capacity, setCapacity] = useState('')

  const [loading, setLoading] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    const formData = {
      name,
      description,
      type,
      capacity,
      airConditioner: toggleCheckBox,
    }
    const response = await createRoom(formData)
    setLoading(false)
    if (response.error) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
    } else {
      navigation.navigate('salas')
    }
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <Form>
          <Item floatingLabel>
            <Label>Nombre</Label>
            <Input
              
              onChange={(e) => setName(e.nativeEvent.text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Descripción</Label>
            <Input
              onChange={(e) => setDescription(e.nativeEvent.text)}
              maxLength={40}
            />
          </Item>
          <Item floatingLabel>
            <Label>Tipo</Label>
            <Input onChange={(e) => setType(e.nativeEvent.text)} />
          </Item>
          <Item floatingLabel>
            <Label>Capacidad</Label>
            <Input
              keyboardType="numeric"
              onChange={(e) => setCapacity(e.nativeEvent.text)}
            />
          </Item>
          <Item style={{ marginTop: 50 }}>
            <Label> Aire Acondicionado </Label>
            <CheckBox
              style={{ scaleX: 1.5, scaleY: 1.5, marginLeft: 100 }}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
          </Item>
          <Button style={styles.btnContainer} block onPress={onSubmit}>
            <Text>Crear</Text>
          </Button>
          <Loading isVisible={loading} text="Creando sala" />
        </Form>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  inputForm: {
    width: '100%',
    marginTop: 10,
  },
  btnContainer: {
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

export default AddRoom
