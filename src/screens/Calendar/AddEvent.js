import React, { useState, useContext, useEffect } from 'react'
import NewEvent from '../../components/Calendar/NewEvent'

const AddEvent = props => {
  const { navigation } = props
  return <NewEvent navigation={navigation} />
}

export default AddEvent
