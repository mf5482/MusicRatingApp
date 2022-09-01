import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeTab from './Tabs/HomeTab.js'
import SettingsTab from './Tabs/SettingsTab.js';
import DiscoverTab from './Tabs/DiscoverTab.js'
import SearchTab from './Tabs/SearchTab.js'
import styles from './Styles/Homescreen.style'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dotenv from 'dotenv'
dotenv.config()

import { getDBConnection, createTable } from './SQLite/sql.js';

const Tab = createBottomTabNavigator()


export default function App() {
  getDBConnection()
  createTable()


  return (
    <NavigationContainer>
    
      <Tab.Navigator 
      screenOptions={({route}) => ({
          tabBarIcon : ({focused, color, size}) => {

            let iconName

            if (route.name === 'ListenTab') {
              iconName = focused
                ? 'ios-play-sharp'
                : 'ios-play-outline';
                labelName :'hello'
            } else if(route.name === 'DiscoverTab'){
              iconName = 'ios-logo-react';
            }
            else if(route.name === 'SearchTab'){
              iconName = 'ios-search';
            }else if (route.name === 'SettingsTab') {
              iconName = 'ios-list' ;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveBackgroundColor : 'tomato',
          tabBarActiveTintColor : 'green',
          tabBarInactiveTintColor : 'white',
          tabBarInactiveBackgroundColor : 'black',
          headerShown: false,
          


      })}>
        <Tab.Screen name="ListenTab" component={HomeTab}/>
        <Tab.Screen name="DiscoverTab" component={DiscoverTab} />
        <Tab.Screen name="SearchTab" component={SearchTab} options={{headerShown:false}}/>
        <Tab.Screen name="SettingsTab" component={SettingsTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
//        <Tab.Screen name="AlbumExample" component={AlbumInfoScreen} />
