import React, { useState, useContext, useEffect } from 'react'
import { Container, Text, Content, Form, Item, Input, Label } from 'native-base'

import { View, Button, Platform, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import globalStyles from './../../styles/global'
import DateTimePicker from '@react-native-community/datetimepicker'
import ActivityContext from '../../context/activities/ActivityContext'
import moment from 'moment'

const NewEvent = (props) => {
  const { navigation } = props
  const {
    saveActivityEvents,
    events,
    activitySelected,
    addEventToActivity,
  } = useContext(ActivityContext)
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState(new Date())
  const [showHour, setShowHour] = useState(false)
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [arrayEvents, setEvent] = useState({})

  useEffect(() => {
    setEvent(events)
  }, [])

  const addEvent = async () => {
    let eventToAdd = {
      start: moment(date).format('YYYY-MM-DD kk:mm:ss'),
      end: moment(
        moment(date)
          .set({ hour: hour.getHours(), minute: hour.getMinutes() })
          .toDate()
      ).format('YYYY-MM-DD kk:mm:ss'),
      title: title,
      summary: summary,
    }

    await addEventToActivity(eventToAdd)
    onConfirmAdd(eventToAdd)
  }

  const onConfirmAdd = (eventToAdd) => {
    Alert.alert('', 'Agregar clase a la agenda', [
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await saveActivityEvents(activitySelected.id, [
            ...arrayEvents,
            eventToAdd,
          ])
          if (response.error) {
            console.log(response.error)
          } else {
            navigation.navigate('calendar')
          }
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ])
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    showHour ? setHour(currentDate) : setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    setShowHour(false)
    showMode('date')
  }

  const showTimepicker = () => {
    setShowHour(false)
    showMode('time')
  }

  const showTimepickerHour = () => {
    setShowHour(true)
    showMode('time')
  }
  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <View style={styles.item}>
          <Button onPress={showDatepicker} title="Seleccione fecha" />
        </View>
        <View style={styles.item}>
          <Text> Fecha: {moment(date).format('YYYY-MM-DD')}</Text>
        </View>
        <View style={styles.item}>
          <Button onPress={showTimepicker} title="Seleccione hora incio" />
        </View>
        <View style={styles.item}>
          <Text>Hora inicio: {date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</Text>
        </View>
        <View style={styles.item}>
          <Button onPress={showTimepickerHour} title="Seleccione hora fin" />
        </View>
        <View style={styles.item}>
          <Text>Hora fin: {hour.getHours() + ':' + hour.getMinutes() + ':' + hour.getSeconds()}</Text>
        </View>
        <Item floatingLabel style={styles.item}>
          <Label>Ingrese título</Label>
          <Input
            autofocus
            value={title}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label>Ingrese notas</Label>
          <Input
            autofocus
            value={summary}
            onChange={(e) => setSummary(e.nativeEvent.text)}
          />
        </Item>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={showHour ? hour : date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={styles.btn}>
          <Button block title="Crear" onPress={addEvent}></Button>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
  },
  btn: {
    marginTop: 30,
    //  width: '95%',
    backgroundColor: '#3368FF',
  },
  btnLogin: {
    backgroundColor: '#3368FF',
  },
})

export default NewEvent
