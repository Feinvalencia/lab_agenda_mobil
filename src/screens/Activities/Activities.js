import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Item, Input, Fab } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import ListActivities from './../../components/Activities/ListActivities'
import globalStyles from './../../styles/global'
import ActivityContext from '../../context/activities/ActivityContext'

const Activities = () => {
  const navigation = useNavigation()
  const {
    activities,
    loadActivities,
    updateActivities,
    filterActivity
  } = useContext(ActivityContext)

  const [filter, setFilter] = useState('')

  useEffect(() => {
    loadActivities()
  }, [loadActivities, updateActivities])

  const getActivitiesBySeacrh = async text => {
    setFilter(text)
    await filterActivity(text)
  }

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <Item>
          <Icon type="material-icons" name="search" />
          <Input
            placeholder="Buscar"
            value={filter}            
            onChange={e => getActivitiesBySeacrh(e.nativeEvent.text)}
          />
        </Item>
        <ListActivities
          activities={activities}
          navigation={navigation}          
          loading={false}
        />
      </Content>
      <Fab
        style={{ backgroundColor: '#3368FF' }}
        containerStyle={styles.btnContainer}
        position="bottomRight">
        <Icon
          type="material-icons"
          name="add"
          onPress={() => navigation.navigate('add-activity')}
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

export default Activities
