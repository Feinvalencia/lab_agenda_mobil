import React from 'react'
import { StyleSheet, View, ScrollView, Text, Button, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Admin = () => {
    const navigation = useNavigation()
  return (
    <ScrollView>
    <Image
      source={require('../../../assets/img/gym_logo.png')}
      resizeMode="contain"
      style={styles.imageProfile}
    />
    <View style={styles.viewContainer}>
      <Button
        title="Usuarios"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogout}
        onPress={() => navigation.navigate('usuarios')}
      />
    </View>
    <View style={styles.viewContainer}>
      <Button
        title="Profesores"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogout}
        onPress={() => navigation.navigate('profesores')}
      />
    </View>
    <View style={styles.viewContainer}>
      <Button
        title="Salas"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogout}
        onPress={() => navigation.navigate('salas')}
      />
    </View>
   
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    btnContainer: {
      marginTop: 10,
      width: '95%',
    },
    btnLogout: {
      backgroundColor: '#3368FF',
    },
    imageProfile: {
      width: '100%',
      height: 150,
      marginTop: 20,
    },
    viewContainer: {
      marginRight: 40,
      marginLeft: 40,
      marginTop: 10,
      marginBottom: 10
    },
  })

export default Admin