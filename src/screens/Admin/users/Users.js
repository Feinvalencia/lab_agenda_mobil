import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { Container, Content, Item, Input, Fab } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import UserContext from '../../../context/users/UserContext'
import globalStyles from '../../../styles/global'
import ListUsers from '../../../components/Users/ListUsers'
import { useNavigation } from '@react-navigation/native'

const Users = () => {
  const navigation = useNavigation();
  const { loadUsers, users, filterUser, updatedUsers } = useContext(UserContext);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadUsers()
  }, [loadUsers, updatedUsers])

  const getUsersBySearch = async text => {
    setFilter(text)
    await filterUser(text)
  };

  return (
       
      <Container style={globalStyles.container}>
      <Item>
        <Icon type="material-icons" name="search" />
        <Input
          placeholder="Buscar"
          value={filter}
          //autoFocus
          onChange={(e) => getUsersBySearch(e.nativeEvent.text)}
        />
      </Item>
        <Content style={globalStyles.content}>
          <ListUsers users={users} navigation={navigation} loading={false} />
        </Content>
      </Container>
    
  )
}

export default Users
