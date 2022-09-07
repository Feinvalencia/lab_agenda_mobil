import React from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { List } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'

import ActivityItem from './ActivityItem'

const ListActivities = ({ navigation, activities }) => {
  // const navigation = useNavigation()
  return (
    <List>
      { activities && activities.map((activity, i) => (
        <ActivityItem
          key={ activity.name }
          activity={ activity }
          navigation={ navigation }
        />
      )) }
    </List>
  )
}

const styles = StyleSheet.create({
  loaderActivities: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  notFoundActivities: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  }
})

ListActivities.propTypes = {}

export default ListActivities
