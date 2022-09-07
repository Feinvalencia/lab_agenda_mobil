export default (state, action) => {
  switch (action.type) {
    case 'GET_TEACHERS':
      return {
        ...state,
        teachers: action.payload,
      };

    case "SELECT_TEACHER":
      return {
        ...state,
        teacherSelected: action.payload,
      };

    case "POST_TEACHER":
      return {
            ...state,
            updateTeachers: !state.updateTeachers,              
          };

    case "PUT_TEACHER": 
      const updateTeacher = action.payload;

      const updatedTeachers = state.teachers.map((teacher) => {
        if (teacher.id === updateTeacher.id){
          return updateTeacher;
        }
        return teacher;
      });

      return {
        ...state,
        teachers: updatedTeachers
      };

    default:
      return state;
    
  }
}


