import React, { useReducer, useCallback } from 'react'
import TeacherReducer from './TeacherReducer'
import TeacherContext from './TeacherContext'
import { addTeacher, getTeachers, removeTeacher, updateTeacher } from '../../services/TeacherServices'

const TeacherState = (props) => {

  const initialState = {
    updateTeachers: false,
    teachers: [],
    teacherSelected: null,      
  };

  const [state, dispatch] = useReducer(TeacherReducer, initialState);
  const { updateTeachers, teacherSelected, teachers } = state;
    
  const loadTeachers = useCallback(async () => {
    const data = await getTeachers();
    dispatch({ type: 'GET_TEACHERS', payload: data });
    return data;
  }, []);

  const selectTeacher = (teacher) => {
    dispatch({ type: 'SELECT_TEACHER', payload: teacher });
  };

  const filterTeacher = async (filter) => {
    const data = await getTeachers(filter);
    dispatch({ type: 'GET_TEACHERS', payload: data });
    return data;
  };

  const createTeacher = async (formData) => {
    // Crear la actividad y llamar al servicio
    const data = await addTeacher(formData);
    dispatch({ type: 'POST_TEACHER', payload: data });
    return data;
  }

  const deleteTeacher = async (teacherId) => {
    // Borra la actividad y llamar al servicio
    const data = await removeTeacher(teacherId);
    dispatch({ type: 'POST_TEACHER', payload: data });
    return data;
  }

  const editTeacher = async (teacher) => {
    //Editar el profesor y llamar al servicio
    const data = await updateTeacher(teacher);
    dispatch({ type: 'POST_TEACHER', payload: data });
    return data;
  }

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        updateTeachers,
        teacherSelected,
        loadTeachers,
        selectTeacher, 
        filterTeacher,
        createTeacher,       
        deleteTeacher,        
        editTeacher
      }}>
      {props.children}
    </TeacherContext.Provider>
  )
};

export default TeacherState;
