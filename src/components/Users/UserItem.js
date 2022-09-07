import React, { useContext } from 'react';
import { Text, Label }  from 'native-base'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import UserContext from '../../context/users/UserContext';
import globalStyles from './../../styles/global';

const UserItem = ({user, navigation}) => {
  const { name, email, role, blocked, id } = user
  const { selectUser } = useContext(UserContext)

  const userIconsMap = {
    false: require('../../../assets/user-icon.png'),
    true: require('../../../assets/user-blocked-icon.png')
  }

  const goUserEdit = () => {
    selectUser(user)
    navigation.navigate('user-edit', {
      user
    })
  }

  return (
    <View style={styles.contenedor}>
      <View>
        <View style={styles.contenedorImagen}>
          <Image style={styles.imagen} source={userIconsMap[blocked.toString()]}/>
          <View style={styles.contenedorTexto}>
            <Text style={styles.title}> {name} </Text>
            <View style={styles.view}>              
              <Text style={styles.text}> { email} </Text>
            </View>
            <View style={styles.view}>
              <Label style={styles.label}> Bloqueado:  </Label>
              <Text style={styles.text}> {blocked.toString()}</Text>
            </View>
            <View style={styles.view}>
              <Label style={styles.label}> Rol:  </Label>
              <Text style={styles.text}> {role}</Text>
            </View>
          </View>
        </View>  
        <View style={styles.contenedorBotones}>
          <Pressable 
            style={[styles.btn, styles.btnEditar]} 
            key={id} 
            onPress={() => goUserEdit()}>
              <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
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
  contenedorButton: {
    alignItems: 'flex-start'
  },
})

export default UserItem