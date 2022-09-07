import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Image, Alert } from 'react-native'
import {
  Container,
  Content,
  Button,
  Body,
  Text,
  Label,
  H1,
  Card,
  CardItem,
  Fab,
  Picker
} from 'native-base'

import globalStyles from '../../../styles/global'
import Icon from 'react-native-vector-icons/MaterialIcons'
import UserContext from '../../../context/users/UserContext'


const UserDetail = ({route, navigation}) => {
  const { name, email, blocked, role, id } = route.params.user
  const [isBlocked, setIsBlocked ] = useState(blocked)
  const [ userRole, setUserRole ] = useState(role)

  const { editUser  } = useContext(UserContext)

  const invertIsBlocked = !isBlocked;
  const labelIsBlocked = invertIsBlocked.toString();

  const setRoleLabel = () => {
    if (userRole === 'ADMIN')
    {
      return 'USER';
    } 
    else if (userRole === 'USER')
    {
      return 'ADMIN';
    }
  }

  const handleUserEdit = () => {
    const data = {
      name,
      email,
      blocked: isBlocked,
      role: userRole,
      id
    }
    Alert.alert('Editar', '¿Desea guardar los cambios?', [
      {
        text: 'Guardar',
        onPress: () => {
          editUser(data)
          navigation.navigate('usuarios')
        }
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ])
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={{ marginTop: 10}}>{name}</H1>
        <Card>
          <CardItem>
            <Body style={styles.body}>
              <Label style={styles.label}> Email:  </Label>
              <Text> { email} </Text>
              <Label style={styles.label}> Bloqueado:  </Label>
              <Picker style={styles.picker} 
                selectedValue={isBlocked} 
                onValueChange={valor => { setIsBlocked(valor)}} 
              >
                <Picker.Item label={isBlocked.toString()} value={isBlocked}/>
                <Picker.Item label={labelIsBlocked} value={!isBlocked}/>
              </Picker>
              <Label style={styles.label}> Rol de usuario:  </Label>
              <Picker style={styles.picker} selectedValue={userRole} onValueChange={valor => {
                setUserRole(valor)
              }}>
                <Picker.Item label={userRole} value = {role} />
                <Picker.Item label={setRoleLabel()} value = {setRoleLabel()} />
              </Picker>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Fab
        style={{ backgroundColor: '#3368FF' }}
        containerStyle={{}}
        position="bottomRight">
          <Icon
            type="material-icons"
            name="save"
            onPress={() => handleUserEdit()}
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
    shadowOpacity: 0.5
  },
  body: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  picker: {
    alignSelf: 'stretch'
  }
})


export default UserDetail