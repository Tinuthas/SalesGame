import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import api from '../../services/api'
import {listCard} from '../../data/data'
import {formatDate} from '../../utils/formatDate'
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({navigation, route}) {
    const [listItems, onChangeItens] = useState([])
    const [likes, onChangeLikes] = useState([])
    const [loading, onChangeLoading] = useState(false)
    const [loadingLike, onChangeLoadingLike] = useState(false)

    async function getListLikes() {
        const responseLike = await api.get('/likes',  {
            headers: { 
                user: route.params.user
            }
        })
        onChangeLikes(responseLike.data)
    }

    async function getListItems() {
        const response = await api.get('/opportunities/all')
        onChangeItens(response.data)
    }

   
    

    useEffect(() => {
        (async function getListItems() {
            await handleRefreshList()
        })()
    }, [])

    async function showDetails(item) {
        navigation.navigate('Details', {item})
    }

    async function handleLike(item) {
        if(loadingLike == true) return
        onChangeLoadingLike(true)
        try{
            console.log(item.id)
            console.log(parseInt(route.params.user))
            const responseLike = await api.post('/likes', {}, {
                headers: { 
                    user: parseInt(route.params.user),
                    opportunity: item.id
                }
            })
            await getListLikes()
        }catch(err){
            console.log(err)
            if(err.response != undefined && err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }
        onChangeLoadingLike(false)
    }
    
    async function handleRefreshList() {
        onChangeLoading(true)
        try{
            await getListItems()
            await getListLikes()
        }catch(err){
            console.log(err)
            if(err.response != undefined && err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }
        onChangeLoading(false)
    }

    function createLikesView(item){
        var like = likes.find(element => element.id == item.id);
        if(like == null) return null
        return(
            <TouchableOpacity  onPress={() => handleLike(item)} style={styles.viewLikes}>
                <Text style={styles.textLikesItem}>{like.likes == null ? '0' : like.likes}</Text>
                <View style={styles.viewIconLikes}>
                    {like.liked > 0 ? 
                        <FontAwesome name="heart" size={20} color={"#FF2C34"} />
                    : 
                        <FontAwesome name="heart" size={20} color={"#FFFFFF"} />
                    }
                </View>
            </TouchableOpacity>
        )
    }

   


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatListView}
                data={listItems}
                keyExtractor={(item, index) => {
                    item.id;
                }}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => showDetails(item)} style={styles.viewItem}>
                        <View style={styles.viewLine}>
                            <Text style={styles.textNameProjectItem}>{item.nameProject.toUpperCase()}</Text>
        
                           
                            <Text style={styles.textPointsItem}>{item.points +' pontos'}</Text>
                        </View>
                        <Text style={styles.textDescriptionItem}>{item.user.name.toUpperCase()}</Text>
                        <Text style={styles.textDescriptionItem}>{item.description}</Text>
                        <Text style={styles.textDescriptionItem}>{item.client.name.toUpperCase()}</Text>
                        <View style={styles.viewLine}>
                            <Text style={styles.textDescriptionItem}>{formatDate(new Date(item.date))}</Text>
                            {createLikesView(item)}
                           
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={handleRefreshList}
            />
        </SafeAreaView>
    )
}