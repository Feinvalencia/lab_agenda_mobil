export default (state, action) => {
  switch (action.type) {
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
        activitySelected: null,
        events: null,
      }
    /*   case "GET_ACTIVITIES_BY_ID":
        return {
          ...state,
          activitySelected: action.payload,
         
        }; */
    case 'POST_ACTIVITY':
      return {
        ...state,
        updateActivities: !state.updateActivities,
      }
    case 'SELECT_ACTIVITY':
      return {
        ...state,
        activitySelected: action.payload,
        events: action.payload.events ? action.payload.events : [],
      }
    case 'ADD_EVENT_TO_ACTIVITY':
      return {
        ...state,
        events: [...state.events, action.payload],
      }
    case 'POST_EVENT':
      return {
        ...state,
        events: action.payload ? action.payload : [],
      }
    default:
      return state
  }
}
