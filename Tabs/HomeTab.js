import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import styles from '../Styles/Homescreen.style.js'
import HorizontalAlbumList from '../Components/HorizontalAlbumList.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js'
import TrackListingScreen from '../Components/TrackListingScreen.js'
import AddToScreen from '../Components/AddToScreen.js'


const Stack = createNativeStackNavigator();

import { getAlbums } from '../SQLite/sql.js'

const DefaultHomePage = ({navigation}) =>{
    const [upNext, setUpNext] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getAlbums(setUpNext)
    }, [])

    const onResultClick = async (masterId) => {

        console.log(masterId)
        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            masterId : masterId
        })
    }

    useEffect(() => {
        console.log('Focus')
    },[navigation.isFocused()])

    const onRefresh = useCallback(() => {
        console.log('Bitch')
        setRefreshing(true);

        setTimeout(async () => {
            await getAlbums(setUpNext)
            setRefreshing(false)
        }, 600)
        
      }, []);


    return (
        <View style={{backgroundColor : 'black', width: '100%', height : '100%'}}>
           <ScrollView style={{'width' : '100%', backgroundColor : 'black'}} refreshControl={<RefreshControl colors={['#D1CDCC']} tintColor={'#D1CDCC'} refreshing={refreshing} onRefresh={onRefresh}/>}>
           <View style={{backgroundColor : 'black', width: '100%', alignItems : 'center', justifyContent : 'center', height : '100%'}}>
            <Text style={{color: 'white', width:'97%', textAlign : 'left', fontSize : 25, fontWeight : 'bold'}}>Up Next</Text>
            <HorizontalAlbumList style={{ width : '97%'}} data={upNext} onPress={onResultClick}/>
            </View>

            </ScrollView>
        </View>
    )
    
}

const HomeTab = () => {

    return(
        <Stack.Navigator screenOptions={() => ({
            headerStyle : {
              backgroundColor : 'black'
            },
            headerTintColor : 'white',
            headerTitleStyle : {
              fontWeight : 'bold'
            }           
  
        })}>
            <Stack.Screen name="Home" component={DefaultHomePage} />
            <Stack.Screen name="AlbumInfo" component={AlbumInfoScreen}/>
            <Stack.Screen name="TrackListing" component={TrackListingScreen} />
            <Stack.Screen name="AddToScreen" component={AddToScreen} />
        </Stack.Navigator>
    )
    
}

/*const styles = StyleSheet.create({
    container : {
        height : '100%',
        width: '100%',
        'backgroundColor' : 'black',
        'alignItems' : 'center',
        'justifyContent' : 'center'
    },
}); */



export default HomeTab