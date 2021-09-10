import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert} from 'react-native';
import styles from './styles'
import api from '../../services/api'
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const AppStack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

import Awards from '../Awards'




export default function Rankings({navigation, route}) {

    const [listItems, onChangeItens] = useState([])
    const [loading, onChangeLoading] = useState(false)

    useEffect(() => {
        (async function getListItems() {
            await handleRefreshList()
        })()
    }, [])

    async function getListItems() {
        const type = route.params.type
        const params = type == 0 ? 'year' : 'month'
        const date = new Date()
        const response = await api.get(`/ranks/${params}`, {
            headers: { 
                year: date.getFullYear(),
                month: date.getMonth() + 1
            }
        })
        var list = response.data
        onChangeItens(list)
    }

    async function handleRefreshList() {
        onChangeLoading(true)
        try{
            await getListItems()
        }catch(err){
            console.log(err)
            if(err.response != undefined && err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }
        onChangeLoading(false)
    }

    function YearTab() {
        return(
            <FlatList
                style={styles.flatListView}
                data={listItems}
                keyExtractor={(item, index) => {
                    item.id;
                }}
                renderItem={({item}) => (
                    <View style={styles.viewFlat}>
                        {item.rank <= 5 ?
                            <View style={styles.viewStars}>
                                <View style={styles.rankLineFirsts}>
                                    {
                                        item.rank <= 1 ?
                                            <View style={styles.viewPointRankOne}>
                                                <Text style={styles.textRankFirsts}>{item.rank}</Text>
                                            </View>
                                        :
                                            <View style={styles.viewPointRankFive}>
                                                <Text style={styles.textRankFirsts}>{item.rank}</Text>
                                            </View>
                                    }
                                    <Text style={styles.textNameFirsts}>{item.name.toUpperCase()}</Text>
                                </View>
                                <FontAwesome name="star" size={30} color={"#F0FF00"} />
                            </View>
                        :
                            <View style={styles.viewNormalLines}>
                                <View style={styles.viewPointRankNormal}>
                                    <Text style={styles.textRankNormal}>{item.rank}</Text>
                                </View>
                                <Text style={styles.textNameNormal}>{item.name.toUpperCase()}</Text>
                                
                            </View>
                        } 
                       
                        
                    </View>
                )}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={handleRefreshList}
            />
        )
    }

    return (
        <View style={styles.container}>
            {YearTab()}
           
        </View>
    )
}


/*
 const [listItems, onChangeItens] = useState([])
    const [loading, onChangeLoading] = useState(false)
    const user = route.params.user

    useEffect(() => {
        (async function getListItems() {
            await handleRefreshList()
            console.log(`aqui`)
        })()
    }, [])

    async function getListItems() {
        const response = await api.get('/opportunities/all')
        onChangeItens(response.data)
    }

    async function handleRefreshList() {
        onChangeLoading(true)
        try{
            await getListItems()
        }catch(err){
            console.log(err)
            if(err.response != undefined && err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }
        onChangeLoading(false)
    }

*/