import {StyleSheet} from 'react-native'
//import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
    },
    flatListView: {
      paddingTop: 20,
      paddingBottom: 50,
    },
    viewFlat: {
      width: '100%',
    },
    viewStars: {
      width: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 30,
      marginTop: 15,
    },
    rankLineFirsts: {
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewPointRankOne: {
      width: 50,
      height: 50,
      backgroundColor: '#00FF00',
      borderRadius: 90,
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewPointRankFive: {
      width: 50,
      height: 50,
      backgroundColor: '#C4C4C4',
      borderRadius: 90,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textRankFirsts: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#3e3e3e'
    },
    textNameFirsts: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: '400',
      width: '76%',
      marginStart: 20,
    },
    viewNormalLines: {
      width: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 30,
      marginTop: 10,
    },
    viewPointRankNormal: {
      width: 50,
      height: 50,
      borderRadius: 90,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textRankNormal: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#C4C4C4'
    },
    textNameNormal: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '400',
      width: '76%',
      marginStart: 20,
    }
})