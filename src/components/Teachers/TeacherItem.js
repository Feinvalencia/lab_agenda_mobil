import React, { useContext, useState } from 'react';
import { Text, Label, }  from 'native-base';
import { 
  StyleSheet,
  View,  
  Pressable,
  Alert,  
} from 'react-native';
import TeacherContext from '../../context/teachers/TeacherContext';
import { formatDate } from '../../helpers';
import globalStyles from './../../styles/global';

const TeacherItem = ({teacher, navigation}) => {
  const { 
    cedula, 
    firstName, 
    lastName, 
    phoneNumber, 
    address, 
    dateOfBirth, 
    id 
  } = teacher;
  const { selectTeacher, deleteTeacher  } = useContext(TeacherContext);
  const [active, setActive] = useState('false');

  const goTeacherEdit = () => {
    selectTeacher(teacher)
    navigation.navigate('teacher-edit', {
      teacher
    })
  };

  const onDeleteTeacher = () => {
    setActive(!active)
    onConfirmDelete()
  };

  const onConfirmDelete = () => {
    Alert.alert('Eliminar', '¿Esta seguro que quiere eliminar el profesor?', [
      {
        text: 'Confirmar',
        onPress: () => {
          selectTeacher(id)
          deleteTeacher(id)
          navigation.navigate('profesores')
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
        <View style={styles.contenido}>

          <View style={styles.contenedorTexto}>
            
            <Text style={styles.title}> {firstName + ' ' + lastName} </Text>
            
            <View style={styles.view}>    
              <Label style={styles.label}> Cédula:  </Label>          
              <Text style={styles.text}> { cedula } </Text>
            </View>

            <View style={styles.view}>
              <Label style={styles.label}> Teléfono:  </Label>
              <Text style={styles.text}> { phoneNumber }</Text>
            </View>

            <View style={styles.view}>
              <Label style={styles.label}> Fecha Nacimiento:  </Label>
              <Text style={styles.text}> { formatDate(dateOfBirth) }</Text>
            </View>

            <View style={styles.view}>
              <Label style={styles.label}> Dirección:  </Label>
              <Text style={styles.text}> { address }</Text>
            </View>
          </View>

          <View style={styles.contenedorButton}>
            <Pressable 
              style={[styles.btn, globalStyles.btnEditar]}               
              onPress={() => goTeacherEdit()}>
              <Text style={styles.btnTexto}>Editar</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.btn, globalStyles.btnEliminar]}               
              onPress={() => onDeleteTeacher()}>
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

export default TeacherItem;