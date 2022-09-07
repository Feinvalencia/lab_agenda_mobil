import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Item, Input, Fab } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RoomContext from '../../../context/rooms/RoomContext'
import globalStyles from '../../../styles/global'
import ListRooms from '../../../components/Rooms/ListRooms'
import { useNavigation } from '@react-navigation/native'

const Rooms = () => {
  const navigation = useNavigation()

  const { loadRooms, rooms, filterRoom, updateRooms } = useContext(RoomContext)

  const [filter, setFilter] = useState('')

  useEffect(() => {
    loadRooms()
  }, [loadRooms, updateRooms])

  const getRoomsBySearch = async text => {
    setFilter(text)
    await filterRoom(text)
  }

  return (
      <Container style={globalStyles.container}>
      <Item>
        <Icon type="material-icons" name="search" />
        <Input
          placeholder="Buscar"
          value={filter}          
          onChange={(e) => getRoomsBySearch(e.nativeEvent.text)}
        />
      </Item>
        <Content style={globalStyles.content}>
          <ListRooms rooms={rooms} navigation={navigation} loading={false} />
        </Content>
        <Fab
        style={{ backgroundColor: '#3368FF' }}
        containerStyle={styles.btnContainer}
        position="bottomRight">
        <Icon
          type="material-icons"
          name="add"
          onPress={() => navigation.navigate('add-room')}
        />
      </Fab>
      </Container>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5
  }
})


export default Rooms
