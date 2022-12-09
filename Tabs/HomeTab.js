import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, ScrollView, RefreshControl, Button, Pressable, TouchableHighlight, SafeAreaView} from 'react-native'
import styles from '../Styles/Homescreen.style.js'
import HorizontalAlbumList from '../Components/HorizontalAlbumList.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js'
import TrackListingScreen from '../Components/TrackListingScreen.js'
import AddToScreen from '../Components/AddToScreen.js'
import SavedViewScreen from '../Screens/SavedView.js';

import { getAlbums } from '../SQLite/sql.js'



const Stack = createNativeStackNavigator();


const DefaultHomePage = ({navigation}) =>{
    const [upNext, setUpNext] = useState([])
    const [relisten, setRelisten] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getAlbums(setUpNext, 1, undefined, true, null)
        getAlbums(setRelisten, 2, undefined, true, null)
    }, [])

    const onResultClick = async (masterId) => {

        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            masterId : masterId
        })
    }

    const navigateToPlaylistView = () => {
        navigation.navigate('SavedView', {
            screen: 'SavedViewScreen',
            type:'playlist'
        })
    }

    const navigateToRatingView = () => {
        navigation.navigate('SavedView', {
            screen: 'SavedViewScreen',
            type:'rating'
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        console.log('refresh')
        setTimeout(async () => {

            await Promise.all([getAlbums(setUpNext, 1, undefined, true, null),
            getAlbums(setRelisten, 2, undefined, true, null)])

            setRefreshing(false)
        }, 600)
        
      }, []);

      const SavedViewButton = (props) => {
        return(
            <TouchableHighlight underlayColor="#d6d5d5" style={{alignItems: "center",justifyContent: "center",borderRadius: 4,width: 150,height:40,backgroundColor: "#f5f5f4",}} onPress={props.onPress}>
                <View>
                    <Text>{props.title}</Text>
                </View>
            </TouchableHighlight>
        )
      }


    return (
        <SafeAreaView style={{backgroundColor : "black", width: "100%", height : "100%"}}>
           <ScrollView style={{width : "100%", backgroundColor : "black"}} refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={refreshing} onRefresh={onRefresh}/>}>
           <View style={{backgroundColor : "black", width: "100%", alignItems : "center", justifyContent : "center", height : "100%"}}>
            <Text style={{color: "white", width:"97%", textAlign : "left", fontSize : 25, fontWeight : "bold"}}>Up Next</Text>
            <HorizontalAlbumList style={{ width : "97%", marginBottom: 10}} data={upNext} onPress={onResultClick}/>
            <Text style={{color: "white", width:"97%", textAlign : "left", fontSize : 25, fontWeight : "bold"}}>Relisten</Text>
            <HorizontalAlbumList style={{ width : "97%"}} data={relisten} onPress={onResultClick}/>
            <View style={{display:"flex",flexDirection:"row", width:"90%", justifyContent:"space-between", marginTop: 20}}>
                <SavedViewButton title="Playlists" onPress={navigateToPlaylistView}/>
                <SavedViewButton title="Ratings" onPress={navigateToRatingView}/>
                
            </View>
            

            </View>

            </ScrollView>
        </SafeAreaView>
    )
    
}

const HomeTab = () => {

    return(
        <Stack.Navigator screenOptions={() => ({
            headerStyle : {
              backgroundColor : "black"
            },
            headerTintColor : "white",
            headerTitleStyle : {
              fontWeight : "bold"
            },   
        })}>
            <Stack.Screen name="Home" component={DefaultHomePage} />
            <Stack.Screen name="AlbumInfo" component={AlbumInfoScreen}/>
            <Stack.Screen name="SavedView" component={SavedViewScreen} options={{headerShown:false}}/>
            <Stack.Screen name="TrackListing" component={TrackListingScreen} />
            <Stack.Screen name="AddToScreen" component={AddToScreen} />
        </Stack.Navigator>
    )
    
}



export default HomeTab

/*
            <TouchableHighlight underlayColor="#d6d5d5" style={{alignItems: "center",justifyContent: "center",borderRadius: 4,width: 150,height:40,backgroundColor: "#f5f5f4",}} onPress={props.onPress}>
   <SafeAreaView style={{backgroundColor : "black", width: "100%", height : "100%"}}>
           <ScrollView style={{width : "100%", backgroundColor : "black"}} refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={refreshing} onRefresh={onRefresh}/>}>
           <View style={{backgroundColor : "black", width: "100%", alignItems : "center", justifyContent : "center", height : "100%"}}>
            <Text style={{color: "white", width:"97%", textAlign : "left", fontSize : 25, fontWeight : "bold"}}>Up Next</Text>
            <HorizontalAlbumList style={{ width : "97%", marginBottom: 10}} data={upNext} onPress={onResultClick}/>
            <Text style={{color: "white", width:"97%", textAlign : "left", fontSize : 25, fontWeight : "bold"}}>Relisten</Text>
            <HorizontalAlbumList style={{ width : "97%"}} data={relisten} onPress={onResultClick}/>
            <View style={{display:"flex",flexDirection:"row", width:"90%", justifyContent:"space-between", marginTop: 20}}>

 <Stack.Navigator screenOptions={() => ({
            headerStyle : {
              backgroundColor : "black"
            },
            headerTintColor : "white",
            headerTitleStyle : {
              fontWeight : "bold"
            },   
        })}>
            */