import React from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import AlbumInfoScreen from '../Screens/AlbumInfoScreen.js';

import styles from '../Styles/ListResults.style.js'


export default ResultsList = (props) => {

    const albumSearchItem = ( { item }) => {
    
        return(
        <TouchableOpacity style = {styles.albumItem} onPress = {() => {props.onPress(item.artist, item.name)}}>
                <View style = {{height:"50%", width:"35%", "alignItems" : "center"}}>
                    <Image style={{aspectRatio: 1/1, height:'165%'}} source={item.image[3]['#text'] != '' ? {uri:item.image[3]['#text']} : require('../assets/blankCD.jpeg')} />
                </View>
                <View style={{width:"65%"}}>
                    <Text style={{color:'white'}}>{item.name}</Text>
                    <Text style={{color: 'gray'}}>{item.artist}</Text>
                </View>
        </TouchableOpacity>
    )}

    return(
        <View>
        <FlatList 
        data={props.data}
        renderItem={(item) => albumSearchItem(item, props.onPress)}
        keyExtractor={item => item.url}/>
        </View>
    );
}
