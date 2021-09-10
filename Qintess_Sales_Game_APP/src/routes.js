import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'

const AppStack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

import Login from './pages/Login'
import Home from './pages/Home'
import Details from './pages/Details'
import Awards from './pages/Awards'
import Configs from './pages/Configs'
import Opportunities from './pages/Opportunities'
import Rankings from './pages/Rankings'
import RegisterOpportunity from './pages/RegisterOpportunity'

function MyTabs(props) {
    const user = props.route.params.user
    return (
        <Tab.Navigator 
            style={{paddingTop: Constants.statusBarHeight, height: 70,backgroundColor: '#222222'}} 
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                
                //labelStyle: {fontSize: 0},
                style: {backgroundColor: '#6800FF', height: 55, justifyContent: 'center'},
                indicatorStyle:{backgroundColor: '#FFFFFF'}
            }}>
                <AppStack.Screen name="Main" component={Home} options={{tabBarIcon:(tabInfo) => (<FontAwesome name="home" size={26} color={tabInfo.focused ? "#222222" : "#FFFFFF"} />)}} initialParams={{ user }}/>
                <AppStack.Screen name="Rankings" component={RankingTabs} options={{tabBarIcon:(tabInfo) => (<FontAwesome name="trophy" size={26} color={tabInfo.focused ? "#222222" : "#FFFFFF"} />)}} initialParams={{ user }}/>
                <AppStack.Screen name="Opportunities" component={Opportunities} options={{tabBarIcon:(tabInfo) => (<FontAwesome name="plus-square" size={26} color={tabInfo.focused ? "#222222" : "#FFFFFF"} />)}} initialParams={{ user }}/>
                <AppStack.Screen name="Configs" component={Configs} options={{tabBarIcon:(tabInfo) => (<FontAwesome name="cog" size={26} color={tabInfo.focused ? "#222222" : "#FFFFFF"} />)}} initialParams={{ user }}/>

        </Tab.Navigator>
    )
}

function RankingTabs(props) {
    const user = props.route.params.user
    return (
        <Tab.Navigator 
            style={{backgroundColor: '#222222'}} 
            tabBarOptions={{
                showIcon: false,
                showLabel: true,
                
                labelStyle: {fontSize: 22,color: '#FFFFFF', fontWeight: '600'},
                style: {backgroundColor: '#3e3e3e', justifyContent: 'center'},
                indicatorStyle:{backgroundColor: '#FFFFFF'}
            }}>
                <AppStack.Screen name="Anual" component={Rankings} initialParams={{ user, type: 0}}/>
                <AppStack.Screen name="Mensal" component={Rankings} initialParams={{ user, type: 1}}/>
               
        </Tab.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#6800FF'
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontSize: 20
                }
                }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Home" component={MyTabs} />
                <AppStack.Screen name="Details" component={Details} options={({route}) => ({title: route.params.item.nameProject, headerShown: true})} />
                <AppStack.Screen name="RegisterOpportunity" component={RegisterOpportunity} options={({route}) => ({title: 'Oportunidade', headerShown: true})} />
               
            </AppStack.Navigator>
        </NavigationContainer>
    )
}