import React from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js';

import styles from '../Styles/ListResults.style.js'


const ResultsList = (props) => {
    

    const albumSearchItem = ( { item }) => {

        const title = item.title.substring(item.title.indexOf(" - ") + 3, item.title.length)
        const artist = item.title.substring(0, item.title.indexOf(" - "))
    
        return(
        <TouchableOpacity style = {styles.albumItem} onPress = {() => {props.onPress(item.master_id)}}>
                <View style = {{height:"50%", width:"35%", "alignItems" : "center"}}>
                    <Image style={{aspectRatio: 1/1, height:'165%'}} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
                </View>
                <View style={{width:"65%"}}>
                    <Text style={{color:'white'}}>{title}</Text>
                    <Text style={{color: 'gray'}}>{artist}</Text>
                </View>
        </TouchableOpacity>
    )}

    return(
        <View>
        <FlatList 
        data={props.data}
        renderItem={(item) => albumSearchItem(item, props.onPress)}
        keyExtractor={item => item.master_id}/>
        </View>
    );
}

export default ResultsList