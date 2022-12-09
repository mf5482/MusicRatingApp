import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text,FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native'
import { getPlaylists, addToPlaylist } from "../SQLite/sql.js";
import PlaylistListStyle from "../Styles/PlaylistList.style.js";
import RemoveButton from "../Buttons/RemoveButton.js";

import Ionicon from 'react-native-vector-icons/Ionicons';

export default addToScreen = ((props) => {
    const [playlists, setPlaylists] = useState([])

    useEffect (() => {
        getPlaylists(setPlaylists)
    }, [])

    const playlistItem = ((item) => {

        const onPress = async () => {
            var r


            try{
                if(props.albumItem['playlistId'] === null && props.albumItem['rating'] == null){
                    
                    props.albumItem['playlistId'] = item.item.ID
                    
                    r = await addToPlaylist('INSERT',props.albumItem);
                    if(r.toString().includes("UNIQUE constraint failed")){
                        await addToPlaylist('UPDATE',props.albumItem);
                    }
                }else{

                    props.albumItem['playlistId'] = item.item.ID
                    await addToPlaylist('UPDATE',props.albumItem);
                }
                props.returnPlaylistID(item.item.ID)
            }catch(err){
                console.log(err)
            }finally{
                props.close()
            }
        }
        

        return (
        <TouchableOpacity style={item.item.ID === props.albumItem['playlistId'] ? PlaylistListStyle.playlistItemGreen :PlaylistListStyle.playlistItem} onPress={onPress}>
            <Text style={PlaylistListStyle.playlistItemText}>{item.item.Name}</Text>
            <Ionicon name="chevron-forward-sharp" size={25} color="white"/>
        </TouchableOpacity>)
    })

    return (
        <SafeAreaView style={{height:"100%"}}>
            <TouchableWithoutFeedback  onPress={props.close}>
                <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)"}}></View>
            </TouchableWithoutFeedback>
            <View style={{ backgroundColor:"black"}}>
                <FlatList data={playlists} keyExtractor={(item) => item.ID }
            renderItem={playlistItem} />
            {props.albumItem['playlistId'] != null ? <RemoveButton masterId = {props.albumItem['masterId']} returnPlaylistID={props.returnPlaylistID} close={props.close}/> : null}           
            <Button title="Close" onPress={props.close} />
            </View>
        </SafeAreaView>
    )
})

//<SafeAreaView style={{height:"100%"}}>
//AddToScreenContainer
//           <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)"}}></View>
//BackgroundDim
//               <View style={{ backgroundColor:"black"}}>

//List color