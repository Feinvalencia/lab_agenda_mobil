import React, { useState, useContext } from 'react'
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base'
import { StyleSheet } from 'react-native'
// import { Input, Button } from 'react-native-elements'
import Loading from '../../components/common/Loading'
import globalStyles from './../../styles/global'
import ActivityContext from '../../context/activities/ActivityContext'

const AddActivity = (props) => {
  const { navigation } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [capacity, setCapacity] = useState(null)
  const { createActivity } = useContext(ActivityContext)

  // const [formData, setFormData] = useState(defaultFormValue())
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    const formData = {
      name,
      description,
      type: 'Natacion',
      capacity,
    }
    await createActivity(formData)
    setLoading(false)
    // const {token, error} = data;
    navigation.navigate('activities')
  }

  return (
    <Container style={ globalStyles.container }>
      <Content style={ globalStyles.content }>
        <Form>
          <Item floatingLabel>
            <Label>Nombre</Label>
            <Input onChange={ (e) => setName(e.nativeEvent.text) } />
          </Item>
          <Item floatingLabel last>
            <Label>Descripción</Label>
            <Input onChange={ (e) => setDescription(e.nativeEvent.text) } />
          </Item>
          <Item floatingLabel last>
            <Label>Cupo</Label>
            <Input onChange={ (e) => setCapacity(e.nativeEvent.text) } />
          </Item>
          <Button style={ styles.btnContainerLogin } block onPress={ onSubmit }>
            <Text>Crear</Text>
          </Button>
          <Loading isVisible={ loading } text="Creando actividad" />
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

export default AddActivity
