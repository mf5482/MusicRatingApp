import React, {useState, useEffect, useMemo} from 'react'
import {View, Text, TextInput, Switch} from 'react-native'
import { searchDiscogs } from '../MusicDatabase/discogs.js'
import FlatList, { ResultsList } from '../Components/FlatList.js'
import styles from '../Styles/SearchScreen.style.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js'
import SearchResults from '../Components/SearchResults.js'

const Stack = createNativeStackNavigator();
var run = 0
var hit = 0
var e = 0


const DefaultSearchScreen = ({navigation}) => {
    const [text, onChangeText] = useState("");
    const [showSearchResults, onChangeShowSearchResults] = useState(false)
    const [searchResults, onChangeSearchResults] = useState([])

    useEffect (() => {
        ++run
        console.log('run', run)
        const ha = setTimeout(async ()=>{
            if(text.length > 0){
                hit++
                console.log('hit', hit)
                const response = await searchDiscogs(text)
                console.log('Done')
                onChangeSearchResults(response.data.results)
            }else{
                onChangeSearchResults([])
            }

        }, 1000)

        return () => {
            clearTimeout(ha)
        }

        
    }, [text])

    useEffect (() => {
        e++
        console.log('e', e)
    }, [])

    const onResultClick = async (masterId) => {
        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            params:{masterId : masterId}
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput style={styles.searchBar}
                    onChangeText = {(text) =>{
                        onChangeText(text)
                    }}
                    placeholder = {"Search Albums"}
                    value = {text}
                />
            </View>
            <View style ={styles.resultsList}>
                <SearchResults data={searchResults} onPress={onResultClick}/>
            </View>
        </View>  
    );
}

const SearchTab = () => {

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
            <Stack.Screen name="Search" component={DefaultSearchScreen} />
            <Stack.Screen name="AlbumInfo" component={AlbumInfoScreen} />
        </Stack.Navigator>
    )
    
}

export default SearchTab