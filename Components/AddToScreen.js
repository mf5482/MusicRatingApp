import React, { useState,useEffect } from "react";
import {View, Alert,Button,TouchableOpacity,Text,FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native'
import { getPlaylists, addToPlaylist } from "../SQLite/sql.js";
import styles from '../Styles/AddToScreen.style.js'

import Ionicon from 'react-native-vector-icons/Ionicons';

export default addToScreen = ((props) => {
    const [playlists, setPlaylists] = useState([])

    useEffect (() => {
        getPlaylists(setPlaylists)
    }, [])

    const onDelete = async () =>{
        await removeAlbum(props.albumItem['masterId'])
        props.returnPlaylistID(null)
        props.close()
    }

    const showDeleteConfirmBox = () => {
        return Alert.alert(
            "Remove Album?",
            "Are you sure you want to remove this album?",
            [{
                "text" : "Cancel",
                "style" : "cancel"
            },
            {
                "text" : "Delete",
                "onPress" : onDelete,
                "style" : "destructive"

            }]
        )
    }

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
        <TouchableOpacity style={item.item.ID === props.albumItem['playlistId'] ? styles.playlistItemGreen :styles.playlistItem} onPress={onPress}>
            <Text style={styles.playlistItemText}>{item.item.Name}</Text>
            <Ionicon name="chevron-forward-sharp" size={25} color="white"/>
        </TouchableOpacity>)
    })

    return (
        <SafeAreaView style={styles.addToScreenContainer}>
            <TouchableWithoutFeedback  onPress={props.close}>
                <View style={styles.backgroundDim}></View>
            </TouchableWithoutFeedback>
            <View style={styles.listColor}>
                <FlatList data={playlists} keyExtractor={(item) => item.ID }
            renderItem={playlistItem} />
            {props.albumItem['playlistId'] != null ? <TouchableOpacity style={styles.removeButtonContainer} onPress={showDeleteConfirmBox}>
            <View style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </View>
        </TouchableOpacity> : null}           
            <Button title="Close" onPress={props.close} />
            </View>
        </SafeAreaView>
    )
})

/*const styles = StyleSheet.create({
    addToScreenContainer: {
        height:"100%"
    },
    backgroundDim : {
        flex: 1,
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    listColor : {
        backgroundColor: "black"
    }
    
})*/

//<SafeAreaView style={{height:"100%"}}>
//AddToScreenContainer
//           <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.5)"}}></View>
//BackgroundDim
//               <View style={{ backgroundColor:"black"}}>

//List color