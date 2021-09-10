import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api'
import styles from './styles'

export default function Login({navigation}) {

    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
  
    useEffect(() => {
      AsyncStorage.getItem('user').then(user=> {
        if(user){
          navigation.navigate('Home', {user})
        }
      })
    })

    async function onPress() {
      
      if(username == '' || password == '') {
        console.log('Temos campos vazios')
        return Alert.alert('Temos campos vazios')
      }


      var response = null

      try{
        response = await api.post('/login', {username, password})
      }catch(err){
        console.log(err)
        if(err.response != undefined && err.response.data != undefined)
          if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
        return Alert.alert(err.message)
      }

      console.log(response)
      const {id} = response.data

      await AsyncStorage.setItem('user', id.toString())

      navigation.navigate('Home', {user: id})
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Qintess Sales Game</Text>
        <View style={styles.viewInputs}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder={'Username'}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder={'Password'}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  
}