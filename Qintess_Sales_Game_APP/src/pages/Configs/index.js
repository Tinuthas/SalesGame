import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'
import {points, userConfigInfo} from '../../data/data'

export default function Configs({navigation}) {

    async function onPressExit(){
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.viewContainer}>
                    <Text style={styles.textTitle}>CONFIGURAÇÕES</Text>
                    <View style={styles.viewInput}>
                        <Text style={styles.textInputField}>Nome:</Text>
                        <View style={styles.viewInputColor}>
                            <Text style={styles.textInputData}>{userConfigInfo.name.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.textInputField}>Cliente:</Text>
                        <View style={styles.viewInputColor}>
                            <Text style={styles.textInputData}>{userConfigInfo.client.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.textInputField}>Tipo:</Text>
                        <View style={styles.viewInputColor}>
                            <Text style={styles.textInputData}>{userConfigInfo.type.toUpperCase()}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonExit}
                        onPress={onPressExit}>
                        <Text style={styles.buttonExitText}>SAIR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}