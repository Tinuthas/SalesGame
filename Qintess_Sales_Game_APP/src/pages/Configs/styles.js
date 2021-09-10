import {StyleSheet} from 'react-native'
//import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
      alignItems: 'center',
      width: '100%',
    },
    containerScrollView: {
      backgroundColor: '#222222',
      width: '100%',
    },
    viewContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    textTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
      marginTop: 20,
    },
    viewBoxPoints: {
      backgroundColor: '#3E3E3E',
      borderRadius: 10,
      height: 160,
      width: '100%',
      marginTop: 20,
      flexDirection: 'row'
    },
    viewBoxPointsChildren: {
      width: '50%',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    viewPointCray: {
      backgroundColor: '#C4C4C4',
      borderRadius: 30,
      height: 60,
      width: '75%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewPointGreen: {
      backgroundColor: '#00FF00',
      borderRadius: 30,
      height: 60,
      width: '75%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textPointTitle: {
      fontWeight: '700',
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 10,
    },
    textPointDescription: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#3E3E3E'
    },
    viewInput: {
      width: '100%',
      marginTop: 20
    },
    textInputField: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700'
    },
    viewInputColor: {
      height: 44,
      justifyContent: 'center',
      backgroundColor: '#3E3E3E',
      borderRadius: 10,
      marginTop: 8,
    },
    textInputData: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      marginStart: 10
    },
    buttonExit: {
      width: 223,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#FF2C34',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    buttonExitText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600'
    }
})