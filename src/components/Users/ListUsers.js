import React from 'react'
import { List  } from 'native-base'
import { StyleSheet } from 'react-native'
import UserItem from './UserItem'
import { ScrollView } from 'react-native-gesture-handler'

const ListUsers = ({navigation, users, loading}) => {
  return (
    <ScrollView>
      <List>
        {
          users && users.map((user, i) => 
            (
              <UserItem key={user.id} user={user} navigation={navigation} />
            )
          ) 
        }
      </List>
    </ScrollView>
  )
}

ListUsers.propTypes = {}

const styles = StyleSheet.create({
  list : {
    
  },
});

export default ListUsers