import React, { useContext, useState, useEffect } from 'react'
import { Dimensions, View, Text } from 'react-native'
import { LocaleConfig } from 'react-native-calendars'
import ActivityContext from '../../context/activities/ActivityContext'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Container, Fab } from 'native-base'
import moment from 'moment'
import EventCalendar from 'react-native-events-calendar'

let { width } = Dimensions.get('window')

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
}
LocaleConfig.defaultLocale = 'es'

const CalendarActivities = () => {
  const { state, events, loadActivityById } = useContext(ActivityContext)
  const [markedDates, setMarkedDate] = useState({})
  const [eventsLoaded, setEventsLoaded] = useState([])
  const [items, setItems] = useState({})
  const navigation = useNavigation()
  const [active, setActive] = useState('false')

  const currentDate = new Date()

  useEffect(() => {
    const func = async () => {
      const response = await loadActivityById(state.activitySelected.id)
      const marked = {}
      setEventsLoaded(response.events)
      response.events.forEach((item) => {
        marked[moment(item.start).format('YYYY-MM-DD kk:mm:ss')] = {
          marked: true,
        }
      })
      setMarkedDate(marked)
      loadItems(currentDate)
    }

    func()
  }, [events])

  const loadItems = (day) => {
    setTimeout(() => {
      const eventsByDay = eventsLoaded.filter((event) => {
        const start = moment(event.start).format('YYYY-MM-DD kk:mm:ss')
        return moment(start).isSame(day.dateString)
      })
      let aux = []
      if (eventsByDay.length != 0) {
        const time = moment(eventsByDay[0].start).format('YYYY-MM-DD kk:mm:ss')
        setItems([])
        aux[time] = []
        for (let n = 0; n < eventsByDay.length; n++) {
          aux[time].push({
            id: eventsByDay.id,
            start: moment(eventsByDay[n].start).format('YYYY-MM-DD kk:mm:ss'),
            end: moment(eventsByDay[n].end).format('YYYY-MM-DD kk:mm:ss'),
            title: eventsByDay[n].title,
            summary: eventsByDay[n].summary,
          })
        }
      }
      const newItems = {}
      Object.keys(aux).forEach((key) => {
        newItems[key] = aux[key]
      })

      setItems(newItems)
    }, 1000)
  }

  const renderItem = (item) => {
    return (
      <View style={[styles.item]}>
        <Text style={styles.textInfo}>
          Hora inicio: {moment(item.start).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.textInfo}>
          Hora Fin: {moment(item.end).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.textInfo}>Titulo: {item.title}</Text>
      </View>
    )
  }
  const renderEmptyData = () => {
    return (
      <View>
        <Text>No hay eventos</Text>
      </View>
    )
  }
  const _eventTapped = (event) => {
    navigation.navigate('event-detail', {
      event,
    })
  }

  return (
    <Container>
      <EventCalendar
        eventTapped={_eventTapped.bind(this)}
        events={events}
        width={width}
        initDate={currentDate}
        scrollToFirst
        upperCaseHeader
        uppercase
      />
      <Fab
        style={{ backgroundColor: '#3368FF' }}
        containerStyle={styles.btnContainer}
        position="bottomRight">
        <Icon
          type="material-icons"
          name="add"
          onPress={() => navigation.navigate('add-event')}
        />
      </Fab>
    </Container>
  )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  textInfo: {
    color: 'black',
  },
  indicator: {
    marginTop: 20,
  },
})

export default CalendarActivities
