import {Platform, StyleSheet} from 'react-native'
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
    padding: 30,
  },
  textTitleDesc: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '700',
  },
  textProjectName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
    marginTop: 15,
  },
  textDescription: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
  },
  textClient: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
  },
  viewTimeline: {
    marginTop: 30,
  },
  viewTimelineRow: {
    flexDirection: 'row'
  },
  viewTextTimeline: {
    marginStart: 25,
  },
  textTimeline: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  viewLineSpace: {
    width: 2,
    height: 40,
    backgroundColor: '#C4C4C4',
    marginStart: 35,
    marginVertical: 10,
  },
  viewInterrogation: {
    backgroundColor: '#C4C4C4',
    borderRadius: 90,
    width: 74,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInterrogation: {
    color: '#3E3E3E',
    fontSize: 60,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 10,
    width: 100,
    height: 28,
    borderRadius: 30,
    backgroundColor: '#FF2C34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  }
    
})