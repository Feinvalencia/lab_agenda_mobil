import React, { useState, useContext, useEffect } from 'react'
import { Container, Text, Content, Item, Input, Label } from 'native-base'

import { View, Button, Platform, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import globalStyles from './../../styles/global'
import DateTimePicker from '@react-native-community/datetimepicker'
import ActivityContext from '../../context/activities/ActivityContext'
import moment from 'moment'

const ModifyEvent = ({ route, navigation }) => {
  const event = route.params.event
  const {
    saveActivityEvents,
    events,
    activitySelected,
  } = useContext(ActivityContext)
  const [date, setDate] = useState(
    new Date(moment(event.start))
  )
  const [hour, setHour] = useState(
    new Date(moment(event.start))
  )
  const [showHour, setShowHour] = useState(false)
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [newTitle, setTitle] = useState(event.title)
  const [newSummary, setSummary] = useState(event.summary)
  const [arrayEvents, setEvents] = useState({})

  useEffect(() => {
    setEvents(events)
  }, [])

  const modifyEvent = async () => {
    let eventToModify = {
      start: moment(date).format('YYYY-MM-DD kk:mm:ss'),
      end: moment(
        moment(date)
          .set({ hour: hour.getHours(), minute: hour.getMinutes() })
          .toDate()
      ).format('YYYY-MM-DD kk:mm:ss'),
      title: newTitle,
      summary: newSummary,
    }

    onConfirmModify(eventToModify)
  }

  const onConfirmModify = (eventToModify) => {
    Alert.alert('', 'Guardar cambios a evento?', [
      {
        text: 'Confirmar',
        onPress: async () => {
          const newEvents = arrayEvents.filter((e) => {
            return (
              e.title != eventToModify.title &&
              e.start != eventToModify.start &&
              e.end != eventToModify.end &&
              e.summary != eventToModify.summary
            )
          })
          const response = await saveActivityEvents(activitySelected.id, [
            ...newEvents,
            eventToModify,
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
          <Text>Hora inicio: {date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds()}</Text>
        </View>
        <View style={styles.item}>
          <Button onPress={showTimepickerHour} title="Seleccione hora fin" />
        </View>
        <View style={styles.item}>
          <Text>Hora fin: {hour.getHours() + 1 + ':' + hour.getMinutes()+ ':' + hour.getSeconds()}</Text>
        </View>
        <Item floatingLabel style={styles.item}>
          <Label>Ingrese título</Label>
          <Input
            autofocus
            value={newTitle}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label>Notas</Label>
          <Input
            autofocus
            value={newSummary}
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
          <Button block title="Editar" onPress={modifyEvent}></Button>
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

export default ModifyEvent
