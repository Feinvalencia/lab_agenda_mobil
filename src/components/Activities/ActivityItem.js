import React, { useContext, useState } from 'react'
import { StyleSheet, View, Image, Pressable, Alert } from 'react-native'
import { Text, Label } from 'native-base'
import ActivityContext from '../../context/activities/ActivityContext'
import globalStyles from './../../styles/global';

const ActivityItem = ({ activity, navigation }) => {
  const { name, description, capacity, type, image, id } = activity
  const { selectActivity } = useContext(ActivityContext);
  const [active, setActive] = useState('false');
  const { deleteActivity } = useContext(ActivityContext);

  const goActivityDetail = () => {
    selectActivity(activity)
    navigation.navigate('calendar');
  };

  const onDeleteActivity = () => {
    setActive(!active)
    onConfirmDelete()
  };

  const onConfirmDelete = () => {
    Alert.alert('Eliminar', '¿Esta seguro de eliminar la actividad?', [
      {
        text: 'Confirmar',
        onPress: () => {
          deleteActivity(id)
          navigation.navigate('activities')
        }
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ])
  };

  return (
    <View style={styles.contenedor}>
      <View>
        <View style={styles.contenedorImagen}>
          <Image style={styles.imagen} source={image ? { uri: image } : require('../../../assets/default_activity.jpeg')}/>
          <View style={styles.contenedorTexto}>
            <Text style={globalStyles.title}> {name} </Text>
            <View style={styles.view}>              
              <Text note numberOfLines={2} style={styles.text}> {description} </Text>
            </View>
            <View style={styles.view}>
              <Label style={styles.label}> Capacidad:  
                <Text style={styles.text}> {capacity} </Text>
              </Label>
            </View>
          </View>
        </View>  
        <View style={styles.contenedorBotones}>
          <Pressable 
            style={[styles.btn, globalStyles.btnEditar]}             
            onPress={() => goActivityDetail()}
            >
              <Text style={styles.btnTexto}>Eventos</Text>
          </Pressable>
          <Pressable style={[styles.btn, globalStyles.btnEliminar]}             
            onPress={() => onDeleteActivity()} >
              <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewActivity: {
    flexDirection: 'row',
    margin: 10,
  },
  activityName: {
    fontWeight: 'bold',
  },
  viewUser: {
    flexDirection: 'row',
    margin: 10,
  },
  view: {
    flexDirection: 'row',
  },
  body: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  text: {
    marginLeft: 3
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  imagen: {
      width: 80,
      height: 80,
      marginRight: 20
  },
  contenedorTexto: {
      flex: 1
  },
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5
  },
  btnEditar: {
    backgroundColor: '#50A1FC',
    width: 100
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  contenedorBotones: {
    alignItems: 'flex-start',
    paddingTop: 15,
    flexDirection: 'row', 
    alignItems: 'center',
  },
})

export default ActivityItem
