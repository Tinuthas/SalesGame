import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert, DrawerLayoutAndroid } from 'react-native';
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import api from '../../services/api'
import {formatDate} from '../../utils/formatDate'
import {statusOpportunity} from '../../data/statusOpportunity'

export default function Home({navigation, route}) {
    var itemDescription = route.params.item
    const [status, onChangeStatus] = useState([])
    const [loading, onChangeLoading] = useState(false)
    
    async function getStatus() {
        try{
            const response = await api.get('/points', {
                headers: { 
                    opportunity: itemDescription.id
                }
            })
            var status = []
            var data = response.data
            var buttonActive = true
            for(var i = 0; i < statusOpportunity.length; i++){
                if(data[i] != undefined) {
                    status.push({
                        'name': statusOpportunity[i].name,
                        'type': statusOpportunity[i].type,
                        'date': data[i].date,
                        'points': data[i].number
                    })
                }else{
                    status.push({
                        'name': statusOpportunity[i].name,
                        'type': statusOpportunity[i].type,
                        'points': statusOpportunity[i].points,
                        'button': buttonActive
                    })
                    buttonActive = false
                }
            }
            console.log(status)

            onChangeStatus(status)
        }catch(err){
            console.log(err)
            if(err.response?.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }         
    }

    useEffect(() => {
        (async function getEffectStatus() {
            await getStatus()
        })()
    }, [])

    async function onPressFinish(item){
        console.log(item)
        try{
            if(loading == true) return
            onChangeLoading(true)
            const response = await api.post('/points', {
                type: item.type,
                number: item.points
            },{
                headers: { 
                    opportunity: itemDescription.id
                }
            })
            await getStatus()
            onChangeLoading(false)
        }catch(err){
            console.log(err)
            if(err.response?.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }     
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerScrollView}>
                <Text style={styles.textTitleDesc}>{itemDescription.user.name.toUpperCase()}</Text>
                <Text style={styles.textProjectName}>{itemDescription.nameProject.toUpperCase()}</Text>
                <Text style={styles.textDescription}>{itemDescription.description}</Text>
                <Text style={styles.textClient}>{itemDescription.client.name.toUpperCase()}</Text>

                <FlatList
                    style={styles.viewTimeline}
                    data={status}
                    keyExtractor={(item, index) => {
                        item.id;
                    }}
                    renderItem={({item, index}) => (
                        <View>
                            {index != 0 ? <View style={styles.viewLineSpace}></View> : null}
                            {item.date != undefined ?
                             <View style={styles.viewTimelineRow}>
                                <FontAwesome name="check-circle" size={85} color={"#00FF00"} />
                                <View style={styles.viewTextTimeline}>
                                    <Text style={styles.textTimeline}>{item.name}</Text>
                                    <Text style={styles.textTimeline}>{formatDate(new Date(item.date))}</Text>
                                </View>
                            </View>
                            : 
                            <View style={styles.viewTimelineRow}>
                                <View style={styles.viewInterrogation}>
                                    <Text style={styles.textInterrogation}>?</Text>
                                </View>
                                <View style={styles.viewTextTimeline}>
                                    <Text style={styles.textTimeline}>{item.name}</Text>
                                    {item.button == true ? 
                                        <TouchableOpacity
                                         style={styles.button}
                                         onPress={(e) => onPressFinish(item, e)}>
                                            <Text style={styles.buttonText}>CONCLUIR</Text>
                                        </TouchableOpacity>
                                    : null}
                                </View>
                            </View>
                            }
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    />
            </ScrollView>
        </SafeAreaView>
    )

}

/*

  <View style={styles.viewTimeline}>
                   
                </View>
                    <View style={styles.viewTimelineRow}>
                        <FontAwesome name="check-circle" size={85} color={"#00FF00"} />
                        <View style={styles.viewTextTimeline}>
                            <Text style={styles.textTimeline}>CRIAÇÃO</Text>
                            <Text style={styles.textTimeline}>{formatDate(new Date(item.date))}</Text>
                        </View>
                    </View>
                    <View style={styles.viewLineSpace}></View>
                    <View style={styles.viewTimelineRow}>
                        <View style={styles.viewInterrogation}>
                            <Text style={styles.textInterrogation}>?</Text>
                        </View>
                        <View style={styles.viewTextTimeline}>
                            <Text style={styles.textTimeline}>VALIDAÇÃO</Text>
                        </View>
                    </View>
                    <View style={styles.viewLineSpace}></View>
                    <View style={styles.viewTimelineRow}>
                        <View style={styles.viewInterrogation}>
                            <Text style={styles.textInterrogation}>?</Text>
                        </View>
                        <View style={styles.viewTextTimeline}>
                            <Text style={styles.textTimeline}>PROPOSTA</Text>
                        </View>
                    </View>
                    <View style={styles.viewLineSpace}></View>
                    <View style={styles.viewTimelineRow}>
                        <View style={styles.viewInterrogation}>
                            <Text style={styles.textInterrogation}>?</Text>
                        </View>
                        <View style={styles.viewTextTimeline}>
                            <Text style={styles.textTimeline}>FINALIZADO</Text>
                        </View>
                    </View>
*/