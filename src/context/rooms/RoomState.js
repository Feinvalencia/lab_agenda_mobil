import React, { useReducer, useCallback } from 'react'
import RoomReducer from './RoomReducer'
import RoomContext from './RoomContext'
import { addRoom, getRooms, removeRoom, updateRoom } from '../../services/RoomServices'

const RoomState = (props) => {

  const initialState = {
    updateRooms: false,
    rooms: [],
    roomSelected: null,    
  };

  const [state, dispatch] = useReducer(RoomReducer, initialState);
  const { updateRooms, roomSelected, rooms } = state;
    
  const loadRooms = useCallback(async () => {
    const data = await getRooms()
    dispatch({ type: 'GET_ROOMS', payload: data })
    return data
  }, []);

  const selectRoom = (room) => {
    dispatch({ type: 'SELECT_ROOM', payload: room })
  };

  const filterRoom = async (filter) => {
    const data = await getRooms(filter)
    dispatch({ type: 'GET_ROOMS', payload: data })
    return data
  };

  const createRoom = async (formData) => {
    // Crear la actividad y llamar al servicio
    const data = await addRoom(formData)
    dispatch({ type: 'POST_ROOM', payload: data })
    return data
  };

  const deleteRoom = async (teacherId) => {
    // Borra la actividad y llamar al servicio
    const data = await removeRoom(teacherId)
    dispatch({ type: 'POST_ROOM', payload: data })
    return data
  };

  const editRoom = async (room) => {
    const data = await updateRoom(room);
    dispatch({ type: 'POST_ROOM', payload: data });
    return data;
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        loadRooms,
        selectRoom, 
        filterRoom,
        createRoom,
        updateRooms,
        deleteRoom,
        roomSelected,
        editRoom
      }}>
      {props.children}
    </RoomContext.Provider>
  );

}

export default RoomState;
