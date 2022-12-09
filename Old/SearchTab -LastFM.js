import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Switch} from 'react-native'
import { searchLastFM, getAlbumInfo } from '../MusicDatabase/lastfm';
import searchResults from '../Components/searchResults.js';
import styles from '../Styles/SearchScreen.style.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js'

const Stack = createNativeStackNavigator();

const DefaultSearchScreen = ({navigation}) => {
    const [text, onChangeText] = useState("");
    const [showSearchResults, onChangeShowSearchResults] = useState(false)
    const [searchResults, onChangeSearchResults] = useState([])


    useEffect (() => {

        const ha = setTimeout(async ()=>{
            if(text.length > 0){
                const response = await searchLastFM(text)
                onChangeSearchResults(response.data.results.albummatches.album)
            }else{
                onChangeSearchResults([])
            }

        }, 1000)

        return () => {
            clearTimeout(ha)
        }

        
    }, [text])

    const onResultClick = async (artistName, albumName) => {
        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            params:{albumName : albumName, artistName : artistName}
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
                <FlatList data={searchResults} onPress={onResultClick}/>
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