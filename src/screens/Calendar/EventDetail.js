import React, { useState, useContext, useEffect } from 'react'

import { Text, Label, Container, Fab, Button } from 'native-base'
import { View, Alert, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import globalStyles from './../../styles/global'
import ActivityContext from '../../context/activities/ActivityContext'
import moment from 'moment'

const EventDetail = ({ route, navigation }) => {
  const event = route.params.event

  const {
    activitySelected,
    saveActivityEvents,
    loadActivityById,
  } = useContext(ActivityContext)

  const [active, setActive] = useState('false')

  const [eventsLoaded, setEventsLoaded] = useState([])

  useEffect(() => {
    const func = async () => {
      const response = await loadActivityById(activitySelected.id)
      setEventsLoaded(response.events)
    }

    func()
  }, [])

  const onDeleteEvent = () => {
    setActive(!active)
    onConfirmDelete()
  }

  const onConfirmDelete = () => {
    Alert.alert('Eliminar', '¿Esta seguro de eliminar el evento?', [
      {
        text: 'Confirmar',
        onPress: async () => {
          const newEvents = eventsLoaded.filter((e) => {
            return (
              e.title != event.title &&
              e.start != event.start &&
              e.end != event.end &&
              e.summary != event.summary
            )
          })
          const response = await saveActivityEvents(
            activitySelected.id,
            newEvents
          )
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

  return (    
    <View style={styles.contenedor}>

      <View>          
        <Text style={globalStyles.title}> {event.title} </Text>          
        <Text note numberOfLines={2} style={[styles.text, styles.summary]}> {event.summary} </Text>
        <View style={styles.view}>
          <Label style={styles.label}> Fecha:   
            <Text style={styles.text}> {moment(event.start).format('YYYY-MM-DD')} </Text>
          </Label>
        </View>

        <View style={styles.view}>
          <Label style={styles.label}> Hora inicio: 
            <Text style={styles.text}> {moment(event.start).format('kk:mm:ss')} </Text>
          </Label>
        </View>

        <View style={styles.view}>
          <Label style={styles.label}> Hora Fin: 
            <Text style={styles.text}> {moment(event.end).format('kk:mm:ss')} </Text>
          </Label>
        </View>
        
      </View>

      <View style={styles.contenedorButton}>
        <Pressable style={[styles.btn, globalStyles.btnEditar]} 
            onPress={() => navigation.navigate('edit-event', { event,})}>
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>

        <Pressable style={[styles.btn, globalStyles.btnEliminar]} 
          onPress={() => onDeleteEvent()}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </Pressable>
      </View> 
  
    </View>
    
  )
}

const styles = StyleSheet.create({
 contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  contenedorButton: {
    flexDirection: 'row', 
    alignItems: 'center',    
  },
  title: {
    color: '#047BC4',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5
  }, 

  view: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  text: {
    marginLeft: 3,
    fontWeight: '100',
  },

  summary: {
    textTransform: 'uppercase',
    paddingBottom: 10,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  contenedorTexto: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',  
},
})

export default EventDetail
