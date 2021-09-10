import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api'
import styles from './styles'

export default function RegisterOpportunity({navigation, route}) {

    const [selectClients, onChangeSelectClients] = useState([])

    const [nameProject, onChangeNameProject] = useState("");
    const [description, onChangeDescription] = useState("");
    const [client, onChangeClient] = useState("");
    const [email, onChangeEmail] = useState("");
    const [fone, onChangeFone] = useState("");

    useEffect(() => {
        (async function getListItems() {
            try{
                const response = await api.get('/clients/all')
                var clients = []
                console.log(response.data)
                response.data.forEach(element => {
                    clients.push({label: element.name, value: element.id})
                });
                console.log(clients)
                onChangeSelectClients(clients)

                var item = route.params.item
                if(item != undefined) {
                    onChangeNameProject(item.nameProject)
                    onChangeDescription(item.description)
                    onChangeEmail(item.email)
                    onChangeFone(item.fone)
                    console.log(clients)
                    clients.forEach(itemClient => {
                        console.log(item.client.name)
                        if(item.client.name == itemClient.label){
                            console.log('client: ' + itemClient.value)
                            onChangeClient(itemClient.value)
                        }
                            
                    })
                    
                    
                }

            }catch(err){
                console.log(err)
                if(err.response != undefined && err.response.data != undefined)
                    if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
                return Alert.alert(err.message)
            }         
        })()
    }, [])



    async function handleNewOpportunity() {
        console.log('enviando')
        
        if(nameProject == '' || description == '' || client == null || client == '' || email == '' || fone == '') {
            console.log('Temos campos vazios')
            return Alert.alert('Temos campos vazios')
        }

        var regFone = /(\+)?(\d{2})?(\s)?(\()?(\d{2})?(\))?(\s)?\d{5}(-)?\d{4}/g
        var regFone2 = /(\+)?(\d{2})?(\s)?(\()?(\d{2})?(\))?(\s)?\d{4}(-)?\d{4}/g
        var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(!regEmail.test(email)){
            console.log('Formato de e-mail incorreto')
            return Alert.alert('Formato de e-mail incorreto')
        }

        if(!(regFone.test(fone) | regFone2.test(fone))){
            console.log('Formato de telefone incorreto')
            return Alert.alert('Formato de telefone incorreto')
        }



        var nameClient = ''
        selectClients.forEach(element => {
            if(parseInt(client) == element.value)
                nameClient = element.label
        })
        if(nameClient == '') {
            console.log('Cliente não encontrado')
            return Alert.alert('Cliente não encontrado')
        }
        
        try{
            const response = await api.post('/opportunities', {
                nameProject,
                description,
                client: {
                    name: nameClient
                },
                email,
                fone
            },{
                headers: { 
                    user: route.params.user
                }
            })
            console.log(response.data)
            navigation.goBack()
        }catch(err) {
            if(err.response.data != undefined)
                if(err.response.data.message != undefined) return Alert.alert(err.response.data.message)
            return Alert.alert(err.message)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerScrollView}>
                <View style={styles.viewContainer}>

                    <Text style={styles.textLabel}>Nome do Projeto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNameProject}
                        value={nameProject}
                        placeholder={'Nome do Projeto'}
                        maxLength = {60}
                    />
                    <Text style={styles.textLabel}>Descrição:</Text>
                    <TextInput
                        style={styles.inputDescription}
                        onChangeText={onChangeDescription}
                        value={description}
                        placeholder={'Descrição'}
                        maxLength = {255}
                        multiline={true}
                    />
                    <Text style={styles.textLabel}>Cliente:</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecionar um cliente',
                            value: null,
                        }}
                        style={{
                            inputIOS: {
                                height: 35,
                                backgroundColor: '#FFFFFF',
                                marginTop: 10,
                                borderRadius: 5,
                                paddingHorizontal: 8,
                                fontSize: 16,
                                color: '#222222',
                            },
                            inputAndroid: {
                                height: 35,
                                backgroundColor: '#FFFFFF',
                                marginTop: 10,
                                borderRadius: 5,
                                paddingHorizontal: 8,
                                fontSize: 16,
                                color: '#222222',
                            },
                            
                            placeholderColor: 'white',
                        }}
                        value={client}
                        onValueChange={(value) => onChangeClient(value)}
                        items={selectClients}
                    />

                    <Text style={styles.textLabel}>Email Contato:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={'Email do Contatos'}
                        maxLength = {60}
                        autoCorrect={false}
                        keyboardType='email-address'
                    />

                    <Text style={styles.textLabel}>Telefone Contato:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChangeFone(text.replace(/[^0-9\(\)\s-+]/g,'').replace(/\s\s/g, ' ').trim())}
                        value={fone}
                        placeholder={'Telefone do Contato'}
                        maxLength = {60}
                        autoCorrect={false}
                        keyboardType='phone-pad'
                    />
                   
                    <TouchableOpacity  onPress={() => handleNewOpportunity()} style={styles.buttonCreateNew}>
                        <Text style={styles.textButtonCreateNew}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}