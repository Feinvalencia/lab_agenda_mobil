export default (state, action) => {
  switch (action.type) {
    case 'GET_ROOMS':
      return {
        ...state,
        rooms: action.payload,
      }

    case "SELECT_ROOM":
        return {
          ...state,
          roomSelected: action.payload,
        };

    case "POST_ROOM":
      return {
            ...state,
            updateRooms: !state.updateRooms,
            
          };
      
    case "PUT_ROOM": 
          const updateRoom = action.payload;
    
          const updatedRooms = state.rooms.map((room) => {
            if (room.id === updateRoom.id){
              return updateRoom;
            }
            return room;
          });
    
          return {
            ...state,
            rooms: updatedRooms
          };

    default:
      return state;
      
  }
};
