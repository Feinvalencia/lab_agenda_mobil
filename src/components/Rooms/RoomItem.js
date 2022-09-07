import React, { useContext, useState } from 'react';
import { Text, Label, }  from 'native-base';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import RoomContext from '../../context/rooms/RoomContext';
import globalStyles from '../../styles/global';


const RoomItem = ({room, navigation}) => {
  const { name, description, type, capacity, airConditioner, id } = room;
  const [active, setActive] = useState('false');

  const { selectRoom, deleteRoom } = useContext(RoomContext);

  const onDeleteRoom = () => {
    setActive(!active)
    onConfirmDelete()
  };

  const onConfirmDelete = () => {
    Alert.alert('Eliminar', '¿Esta seguro que quiere eliminar la sala?', [
      {
        text: 'Confirmar',
        onPress: () => {
          deleteRoom(id)
        }
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ])
  };

  const goRoomEdit = () => {
    selectRoom(room)
    navigation.navigate('edit-room', {
      room
    })
  };
  
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenido}>
        <View style={styles.contenedorTexto}>
          <Text style={styles.title}> {name} </Text>
          
          <View style={styles.view}>
            <Text style={styles.text}> { description } </Text>
          </View>

          <View style={styles.view}>
            <Label style={styles.label}> Tipo:  </Label>
            <Text style={styles.text}> { type }</Text>
          </View>

          <View style={styles.view}>
            <Label style={styles.label}> Capacidad:  </Label>
            <Text style={styles.text}> {capacity}</Text>
          </View>

          <View style={styles.view}>
            <Label style={styles.label}> Aire Acondicionado:  </Label>
            <Text style={styles.text}> {airConditioner ? 'SI' : 'NO'}</Text>
          </View>

        </View>
        
        <View style={styles.contenedorButton}>
          <Pressable key={id} 
            style={[styles.btn, globalStyles.btnEditar]}             
            onPress={() => goRoomEdit()}>
              <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable key={id} 
            style={[styles.btn, globalStyles.btnEliminar]}             
            onPress={() => onDeleteRoom()}>
              <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </View>    
      
  );
}

const styles = StyleSheet.create({
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
    color: '#047BC4',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5
  },
  btnEditar: {
    backgroundColor: '#50A1FC',
    marginTop: 10,
    width: 100
  },
  btnEliminar: {
    backgroundColor: '#50A1FC',
    marginTop: 10,
    width: 100,
    marginLeft: 15
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
  contenedorButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    
  },
})

export default RoomItem;