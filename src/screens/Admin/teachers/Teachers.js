import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Container, Content, Item, Input, Fab } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TeacherContext from '../../../context/teachers/TeacherContext'
import globalStyles from '../../../styles/global'
import ListTeachers from '../../../components/Teachers/ListTeachers'
import { useNavigation } from '@react-navigation/native'

const Teachers = () => {
  const navigation = useNavigation()

  const { loadTeachers, teachers, filterTeacher, updateTeachers } = useContext(TeacherContext)

  const [filter, setFilter] = useState('')

  useEffect(() => {
    loadTeachers()
  }, [loadTeachers, updateTeachers])

  const getTeachersBySearch = async text => {
    setFilter(text)
    await filterTeacher(text)
  }

  return (
    <Container style={globalStyles.container}>
      <Item>
        <Icon type="material-icons" name="search" />
        <Input
          placeholder="Buscar"
          value={filter}
          //autoFocus
          onChange={(e) => getTeachersBySearch(e.nativeEvent.text)}
        />
      </Item>
      <Content style={globalStyles.content}>
        <ListTeachers teachers={teachers} navigation={navigation} loading={false} />
      </Content>
      <Fab style={{ backgroundColor: '#3368FF' }}
        containerStyle={styles.btnContainer}
        position="bottomRight">
        <Icon type="material-icons" name="add" 
              onPress={() => navigation.navigate('add-teacher')} />
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


export default Teachers
