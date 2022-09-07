import React, { useState, useContext } from 'react'
import { StyleSheet, Image, Alert } from 'react-native'
import {
  Container,
  Content,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
  Fab
} from 'native-base'

import globalStyles from './../../styles/global'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActivityContext from '../../context/activities/ActivityContext'

const ActivityDetail = ({ route, navigation }) => {
  const { title, description, image, id } = route.params.activity
  const [active, setActive] = useState('false')
  const { deleteActivity } = useContext(ActivityContext)

  const onDeleteActivity = () => {
    setActive(!active)
    onConfirmDelete()
  }

  const onConfirmDelete = () => {
    Alert.alert('Eliminar', '¿Esta seguro de eliminar la actividad?', [
      {
        text: 'Confirmar',
        onPress: () => {
          deleteActivity(id)
          navigation.navigate('activities')
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
        <H1>{title}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image
                style={{
                  width: '100%',
                  height: 200,
                  marginTop: 20
                }}
                resizeMode="cover"
                source={
                  image
                    ? { uri: image }
                    : require('../../../assets/default_activity.jpeg')
                }
              />

              <Text style={{ marginTop: 20 }}>{description} </Text>
              <Text>Cupo: 25</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      {/*       <View style={{ flex: 1 }}>
       */}
      <Fab
        style={{ backgroundColor: '#3368FF' }}
        active={active}
        direction="up"
        containerStyle={{}}
        position="bottomRight">
        <Icon
          type="material-icons"
          name="adjust"
          onPress={() => setActive(!active)}
        />
        <Button style={{ backgroundColor: 'red' }}>
          <Icon
            type="material-icons"
            name="delete"
            onPress={() => onDeleteActivity()}
          />
        </Button>
        <Button style={{ backgroundColor: '#3B5998' }}>
          <Icon
            type="material-icons"
            name="event"
            onPress={() => navigation.navigate('calendar')}
          />
        </Button>
      </Fab>
      {/*       </View>
       */}
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
  }
})

export default ActivityDetail
