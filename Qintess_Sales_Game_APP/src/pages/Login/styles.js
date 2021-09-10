import {StyleSheet} from 'react-native'
//import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    textTitle: {
      color: '#6800FF',
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      width: 271,
    },
    viewInputs:{
  
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      height: 57,
      width: 271,
      fontSize: 16,
      padding: 5,
      marginBottom: 20,
    },
    button: {
      width: 223,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#FF2C34',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600'
    }
  });