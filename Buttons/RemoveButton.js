import {View,TouchableOpacity,Text,Alert} from 'react-native'
import React, {useState} from 'react'
import PlaylistListStyle from "../Styles/PlaylistList.style.js";
import { removeAlbum } from '../SQLite/sql.js'

export default removeButton = (props) => {

    const onDelete = async () =>{
        await removeAlbum(props.masterId)
        props.returnPlaylistID(null)
        props.close()
    }

    const showConfirmBox = () => {
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



    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={showConfirmBox}>
            <View style={PlaylistListStyle.removeButton}>
                <Text style={{color:'white', 'textAlign' : 'center', width:'100%', fontSize:16}}>Remove</Text>
            </View>
        </TouchableOpacity>
    )
}

//        <TouchableOpacity style={{alignItems:'center'}} onPress={showConfirmBox}>
//ButtonPlacement
//            <View style={PlaylistListStyle.removeButton}>
//ButtonStyle
//<Text style={{color:'white', 'textAlign' : 'center', width:'100%', fontSize:16}}>Remove</Text>
//ButtonText