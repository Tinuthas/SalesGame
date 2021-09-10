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
    borderRadius: 10
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
  },
  viewTopList: {
    width: '100%',
    paddingHorizontal:20,
  },
  viewBoxPoints: {
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    height: 160,
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
  buttonCreateNew:{
    backgroundColor: '#6800FF',
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 25,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  textButtonCreateNew: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700'
  },
  viewEditCardList: {
    backgroundColor: '#4F4F4F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  buttonEditCard: {
    backgroundColor: '#6800FF',
    width: '30%',
    height: 35,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonEditCardDelete: {
    backgroundColor: '#FF2C34',
    width: '30%',
    height: 35,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textEditButton: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
})