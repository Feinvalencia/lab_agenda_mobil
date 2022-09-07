import React, { useContext } from 'react'
import { StyleSheet, View, ScrollView, Text, Button, Image } from 'react-native'
import AuthenticationContext from './../context/authentication/AuthenticationContext'

const Profile = () => {
  const { signOut } = useContext(AuthenticationContext)

  const onSignOut = () => signOut()

  return (
    <ScrollView>
      <Image
        source={require('../../assets/img/gym_logo.png')}
        resizeMode="contain"
        style={styles.imageProfile}
      />
      <View style={styles.viewContainer}>
        <Button
          title="Cerrar sesión"
          containerStyle={styles.btnContainerLogout}
          buttonStyle={styles.btnLogout}
          onPress={() => onSignOut()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnContainerLogout: {
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
    marginTop: 10
  },
})

export default Profile
