export default (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.payload ? action.payload.user : null,
        token: action.payload ? action.payload.token : null,
        isLoading: false,
      }
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        token: null,
      }
  }
}
