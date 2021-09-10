import {StyleSheet} from 'react-native'
//import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%'
    },
    flatListView: {
      width: '100%',
      padding: 20,
    },
    viewItem: {
      backgroundColor: '#3E3E3E',
      marginBottom: 25,
      borderRadius: 10,
    },
    viewLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textNameProjectItem: {
      color: '#FFD700',
      fontSize: 16,
      fontWeight: '700',
      margin: 10,
    },
    textPointsItem: {
      color: '#00FF00',
      fontSize: 15,
      fontWeight: 'bold',
      minWidth: 90,
      margin: 10,
      marginEnd: 2,
    },
    textDescriptionItem: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    viewLikes: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textLikesItem: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 10,
      marginEnd: 7
    },
    viewIconLikes: {
      marginEnd: 10,
      marginBottom: 10
    }
})