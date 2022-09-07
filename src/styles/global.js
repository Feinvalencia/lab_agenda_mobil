import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  button: {
    backgroundColor: '#FFDA00',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  contenedor: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    transform: [{ translateY: 30 }],
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
  },
  btnEditar: {
    backgroundColor: '#50A1FC',
    marginTop: 10,
    width: 100
  },
  btnEliminar: {
    backgroundColor: '#F93636',
    marginTop: 10,
    width: 100,
    marginLeft: 15
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    borderColor: '#BDBFC1',
   borderWidth: 1,
  },
  title: {
    color: '#047BC4',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5
  }, 
})

export default globalStyles
