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
    buttonCreateNew:{
        backgroundColor: '#6800FF',
        width: '100%',
        height: 60,
        borderRadius: 30,
        margin: 20,
        marginTop: 40,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textButtonCreateNew: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '700'
    },
    input: {
        width: '100%',
        height: 35,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#222222',
    },
    inputDescription: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 5,
        padding: 8,
        fontSize: 16,
        justifyContent: 'flex-start',
        height: 170,
        textAlignVertical: 'top',
        color: '#222222',
    },
    textLabel: {
      fontSize: 18,
      color: '#FFFFFF',
      marginTop: 20,
      width: '100%',
      fontWeight: '600',
    },
    selectClient: {
      
       
      /*inputIOS: {
        width: '100%',
        height: 35,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#222222',
      },
      inputAndroid: {
        width: '100%',
        height: 35,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#222222',
      },*/
      
    }
})