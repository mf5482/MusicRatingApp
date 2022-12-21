import React, {useState, useEffect, useRef} from 'react'
import {View, TextInput, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native'
import { searchDiscogs } from '../MusicDatabase/discogs.js'
import styles from '../Styles/SearchTab.style.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js'
import SearchResults from '../Components/SearchResults.js'
import TrackListingScreen from '../Components/TrackListingScreen.js'
import AddToScreen from '../Components/AddToScreen.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorAlert from '../Components/ErrorAlert.js';

import {DataProvider} from "recyclerlistview";

//close-outline
const Stack = createNativeStackNavigator();
var run = 0
var hit = 0


const DefaultSearchScreen = ({navigation}) => {
    const [text, onChangeText] = useState("");
    const isInitialMount = useRef(true);

    const [hasResults, setHasResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let dp = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });

    const [dataProvider, setDataProvider] = useState(dp.cloneWithRows([]))

    const search = async () => {
        setIsLoading(true)
        hit++
        let response = null
        try{
            response = await searchDiscogs(text)   
        }catch(err){
            console.log(err)
            ErrorAlert()
        }
        if(response !== null ){
            setDataProvider(dp.cloneWithRows(response.data.results))
            setHasResults(true)
        }
        setIsLoading(false)
    }
    

    useEffect (() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return
         }else{
        ++run
        const ha = setTimeout(async ()=>{
            if(text.length > 0){
                setIsLoading(true)
                hit++
                var retry = false
                let response = null
                do{
                try{
                    response = await searchDiscogs(text)   
                }catch(err){
                    console.log(err)
                    retry = await ErrorAlert(null)
                }
            }while(retry !== false)

                if(response !== null ){
                    setDataProvider(dp.cloneWithRows(response.data.results))
                    setHasResults(true)
                }
                setIsLoading(false)
                
            }

        }, 1000)

        if(text.length === 0){
            setHasResults(false)
            setDataProvider(dp.cloneWithRows([]))
        }

        return () => {
            clearTimeout(ha)
        }
    }

        
    }, [text])


    const onResultClick = async (masterId) => {
        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            masterId : masterId
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <View style={styles.searchBar}>
                <TextInput style={styles.flexFill}
                    onChangeText = {(text) =>{
                        onChangeText(text)
                    }} 
                    placeholder = {"Search Albums"}
                    value = {text}
                />{text.length > 0 ?<TouchableOpacity onPress={()=>{onChangeText("")}}>
                    <View style={styles.clearButton}>
                        <Ionicons name={'close-outline'} size={15} color={"white"} />
                    </View>
                </TouchableOpacity>:<></>}
                </View>
                {isLoading && <TouchableOpacity style = {styles.clearIcon}>
                    <ActivityIndicator color ={"#ffffff"}/>
</TouchableOpacity>}
                
            </View>
            <View style ={styles.resultsList}>
                {hasResults ? 
                <SearchResults isLoading = {isLoading} dp = {dataProvider} onPress={onResultClick}/> :
                null}
            </View>
        </View>  
    );
}

const SearchTab = () => {

    return(
        <Stack.Navigator screenOptions={() => ({
            headerStyle : {
              backgroundColor : "black"
            },
            headerTintColor : "white",
            headerTitleStyle : {
              fontWeight : "bold"
            }           
  
        })}>
            <Stack.Screen name="Search" component={DefaultSearchScreen} />
            <Stack.Screen name="AlbumInfo" component={AlbumInfoScreen}/>
            <Stack.Screen name="TrackListing" component={TrackListingScreen} options={{title:"Track Listing"}} />
            <Stack.Screen name="AddToScreen" component={AddToScreen} />
        </Stack.Navigator>
    )
    
}

export default SearchTab

/*
 <View style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput style={[styles.searchBar, isLoading ? {width:"90%"} : ""]}
                                {isLoading && <TouchableOpacity style = {styles.clearIcon}>
                                            <View style ={styles.resultsList}>

        <Stack.Navigator screenOptions={() => ({
            headerStyle : {
              backgroundColor : "black"
            },
            headerTintColor : "white",
            headerTitleStyle : {
              fontWeight : "bold"
            }   
*/