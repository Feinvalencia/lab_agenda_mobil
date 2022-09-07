import React from 'react'
import { Text, List  } from 'native-base'
import TeacherItem from './TeacherItem'

const ListTeachers = ({navigation, teachers, loading}) => {
    return (
        <List >
          { teachers && teachers.map((teacher, i) => (
            <TeacherItem
              key={ teacher.id }
              teacher={ teacher }
              navigation={ navigation }
            />
          )) }
        </List>
      )
}

ListTeachers.propTypes = {}


export default ListTeachers;