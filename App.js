import { View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import HomeTab from './Tabs/HomeTab.js'
import SearchTab from './Tabs/SearchTab.js'
import styles from "./Styles/App.style.js"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getDBConnection, createTable } from './SQLite/sql.js';

const Tab = createBottomTabNavigator()


export default function App() {
  getDBConnection()
  createTable()

  return (
    <View style={styles.container}>
    <StatusBar translucent backgroundColor="white"barStyle="light-content"/>
    <SafeAreaView edges={["top", "left", "right"]} style={styles.flexFill}>
    <NavigationContainer>
    
      <Tab.Navigator 
      screenOptions={({route}) => ({
          tabBarIcon : ({focused, color, size}) => {

            let iconName

            if (route.name === "ListenTab") {
              iconName = focused
                ? "ios-play-sharp"
                : "ios-play-outline";
                labelName :"hello"
            } else if(route.name === "DiscoverTab"){
              iconName = "ios-logo-react";
            }
            else if(route.name === "SearchTab"){
              iconName = "ios-search";
            }else if (route.name === "SettingsTab") {
              iconName = "ios-list" ;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveBackgroundColor : "tomato",
          tabBarActiveTintColor : "green",
          tabBarInactiveTintColor : "white",
          tabBarInactiveBackgroundColor : "black",
          headerShown: false,
          


      })}>
        <Tab.Screen name="ListenTab" component={HomeTab} options={{title:"Listen"}}/>
        <Tab.Screen name="SearchTab" component={SearchTab} options={{headerShown:false, title:"Search"}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </View>
  );
}

/*const styles = StyleSheet.create({
  container:{
    height:"100%",
    width:"100%",
    backgroundColor:"black"
  },
  flexFill:{
    flex: 1
  }
})*/

/*    <View style={{height:"100%",width:"100%",backgroundColor:"black",}}>
    <SafeAreaView edges={["top", "left", "right"]} style={{flex:1}}>
*/
