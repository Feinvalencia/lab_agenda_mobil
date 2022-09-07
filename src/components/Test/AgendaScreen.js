import React, { Component, Fragment } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Agenda } from 'react-native-calendars'

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: { CONTAINER: 'calendarList' },
  horizontalList: { CONTAINER: 'horizontalList' },
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: { CONTAINER: 'expandableCalendar' },
  weekCalendar: { CONTAINER: 'weekCalendar' },
}

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: {},
    }
  }

  render() {
    console.log('Render')
    return (
      <Fragment>
        <View style={styles.sectionContainer}>
          <Agenda
            style={styles.agenda}
            markedDates={{
              '2020-08-04': {
                periods: [
                  { startingDay: false, endingDay: true, color: '#5f9ea0' },
                ],
              },
              '2020-08-05': {
                periods: [
                  { startingDay: true, endingDay: false, color: '#ffa500' },
                  { color: 'transparent' },
                ],
              },
            }}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-period"
            items={{
              '2020-08-04': [{ text: 'item 1 - any js object' }],
              '2020-08-05': [{ text: 'item 2 - any js object' }],
              '2020-08-06': [{ text: 'item 3 - any js object' }],
              '2020-08-07': [{ text: 'item 4 - any js object' }],
              '2020-08-08': [
                { text: 'item 5 - any js object' },
                { text: 'any js object 2' },
              ],
            }}
            // callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={(month) => {
              console.log('trigger items loading')
            }}
            // callback that gets called on day press
            onDayPress={(day) => {
              console.log('day pressed')
            }}
            // callback that gets called when day changes while scrolling agenda list
            onDayChange={(day) => {
              console.log('day changed')
            }}
            theme={{
              agendaDayTextColor: '#333333',
              agendaDayNumColor: '#333333',
              agendaTodayColor: '#333333',
              agendaKnobColor: '#333333',
            }}
          />
        </View>
      </Fragment>
    )
  }

  loadItems(day) {
    console.log('loadItems')
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = this.timeToString(time)
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = []
          const numItems = Math.floor(Math.random() * 3 + 1)
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            })
          }
        }
      }
      const newItems = {}
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key]
      })
      this.setState({
        items: newItems,
      })
    }, 1000)
  }

  renderItem(item) {
    console.log('renderItem')

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderEmptyDate() {
    console.log('renderEmptyDate')
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    )
  }

  rowHasChanged(r1, r2) {
    console.log('rowHasChanged')
    return r1.name !== r2.name
  }

  timeToString(time) {
    console.log('timeToString')
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }
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
  sectionContainer: {
    height: '80%',
  },
})
