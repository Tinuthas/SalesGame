import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert, ScrollView, RefreshControl } from 'react-native';
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import api from '../../services/api'
import {formatDate} from '../../utils/formatDate'
import AsyncStorage from '@react-native-community/async-storage';

export default function Opportunities({navigation, route}) {
    const [listItems, onChangeItens] = useState([])
    const [likes, onChangeLikes] = useState([])
    const [edit, onChangeEdit] = useState([])
    const [info, onChangeInfo] = useState(null)
    const [loading, onChangeLoading] = useState(false)
    const [loadingLike, onChangeLoadingLike] = useState(false)

    async function getListLikes() {
        const responseLike = await api.get('/likes/user',  {
            headers: { 
                user: route.params.user
            }
        })
        onChangeLikes(responseLike.data)
    }

    async function getListItems() {
        const response = await api.get('/opportunities/all/user', {
            headers: { 
                user: route.params.user
            }
        })

        var data = response.data
        var editList = []
        data.forEach(item => {
            editList.push({id: item.id, show: false})
        })

        onChangeItens(data)
        onChangeEdit(editList)
    }

    async function getListRank() {
        const response = await api.get('/ranks', {
            headers: { 
                user: route.params.user
            }
        })
        
        onChangeInfo(response.data)
    }

    useEffect(() => {
        (async function getListItems() {
            await handleRefreshList()
        })()

   
    }, [navigation])

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

    function createEditView(item) {
        var editItem = edit.find(element => element.id == item.id);
        if(editItem == null) return null
        if(editItem.show == false) return null
        return (
            <View style={styles.viewEditCardList}>
                <TouchableOpacity  
                    onPress={() => handleEditShow(item)} 
                    style={styles.buttonEditCard}>
                    <Text style={styles.textEditButton}>EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => handleDeleteShow(item)} 
                    style={styles.buttonEditCardDelete}>
                    <Text style={styles.textEditButton}>EXCLUIR</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async function handleRefreshList() {
        onChangeLoading(true)
        try{
            await getListItems()
            await getListLikes()
            await getListRank()
        }catch(err){
            console.log(err)
            if(err.response != undefined && err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }
        onChangeLoading(false)
    }

    async function handleNewOpportunity() {
        const user = route.params.user
        navigation.navigate('RegisterOpportunity', {user})
    }

    async function handleCartEdit(item) {
        const newEditList = edit.map((element) => {
            if(element.id === item.id) {
                const updateElement = {
                    ...element,
                    show: !element.show,
                }
                return updateElement
            }
            return element
        })

        onChangeEdit(newEditList)
    }

    async function handleEditShow(item) {
        const user = route.params.user
        navigation.navigate('RegisterOpportunity', {user, item})
    }

    async function handleDeleteShow(item) {

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerScrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefreshList}
                    />
                }>
                <View style={styles.viewTopList}>
                    <View style={styles.viewBoxPoints}>
                        <View style={styles.viewBoxPointsChildren}>
                            <View style={styles.viewPointCray}>
                                <Text style={styles.textPointDescription}>{info != null ? info[0].rank : ''}</Text>
                            </View>
                            <Text style={styles.textPointTitle}>Ranking</Text>
                        </View>
                        <View style={styles.viewBoxPointsChildren}>
                            <View style={styles.viewPointGreen}>
                                <Text style={styles.textPointDescription}>{info != null ? info[0].points : ''}</Text>
                            </View>
                            <Text style={styles.textPointTitle}>Total de pontos</Text>
                        </View>
                    </View>
                    <TouchableOpacity  
                        onPress={() => handleNewOpportunity()} 
                        style={styles.buttonCreateNew}>
                        <Text style={styles.textButtonCreateNew}>NOVA OPORTUNIDADE</Text>
                    </TouchableOpacity>
                </View>
                
            <FlatList
                style={styles.flatListView}
                data={listItems}
                keyExtractor={(item, index) => {
                    item.id;
                }}
                renderItem={({item}) => (
                    <View>
                        <TouchableOpacity 
                            onPress={() => showDetails(item)}  
                            onLongPress={() => handleCartEdit(item)} 
                            style={styles.viewItem}>
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
                            {createEditView(item)}
                            
                        </TouchableOpacity>
                        
                    </View>
                )}
                keyExtractor={item => item.id}
               
            />
            </ScrollView>
        </SafeAreaView>
    )
}