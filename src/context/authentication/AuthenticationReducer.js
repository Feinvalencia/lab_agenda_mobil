export default (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload ? action.payload.user : null,
        token: action.payload ? action.payload.token : null,
        isAuthenticated: action.payload.error ? false : true,
      }
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.payload ? action.payload.user : null,
        token: action.payload ? action.payload.token : null,
        isAuthenticated: action.payload ? true : false,
        isLoading: false,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
