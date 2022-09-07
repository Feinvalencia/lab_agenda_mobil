import React from 'react'
import { Text, List  } from 'native-base'
import RoomItem from './RoomItem'

const ListRooms = ({navigation, rooms, loading}) => {

    return (
        <List >
          { rooms && rooms.map((room, i) => (
            <RoomItem
              key={ room.id }
              room={ room }
              navigation={ navigation }
            />
          )) }
        </List>
      )
}

ListRooms.propTypes = {}


export default ListRooms;