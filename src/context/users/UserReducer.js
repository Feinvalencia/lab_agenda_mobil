export default (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case "SELECT_USER":
        return {
          ...state,
          userSelected: action.payload,
        }
    case "EDIT_USER": 
        const updatedUser = action.payload;

        const updatedUsers = state.users.map((user) => {
          if (user.id === updatedUser.id){
            return updatedUser
          }
          return user
        });
        return {
          ...state,
          users: updatedUsers
        }

    default:
      return state
  }
}
