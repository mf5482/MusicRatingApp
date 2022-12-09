import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text,FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native'
import { getPlaylists, addToPlaylist } from "../SQLite/sql.js";
import PlaylistListStyle from "../Styles/PlaylistList.style.js";
import RemoveButton from "../Buttons/RemoveButton.js";

import Ionicon from 'react-native-vector-icons/Ionicons';

export default MiniList = ((props) => {

    const playlistItem = ((item) => {


        const onPress = async (index) => {
            var r


            try{
                props.returnPlaylist(index)
            }catch(err){
                console.log(err)
            }finally{
                props.close()
            }
        } 
        

        return (
        <TouchableOpacity style={{height:40, width: "100%", justifyContent:"center", alignItems : "center"}} onPress={()=>onPress(item.index)}>
            <Text style={{color:"white", fontSize : 12, fontWeight:"bold"}}>{item.item.Name}</Text>
        </TouchableOpacity>)
    })

    return (
        <View>
            <TouchableWithoutFeedback style={{height:"100%",width:"100%"}} onPress={()=>{props.close()}}>
            <SafeAreaView style={{height:"100%",position:"relative"}}>
            <View style={{ backgroundColor:"black",position:"absolute",bottom:99,left:50,right:50}}>
                <FlatList data={props.items} keyExtractor={(item) => item.ID }
                renderItem={playlistItem} />
            </View>
            </SafeAreaView>
            </TouchableWithoutFeedback>
        </View>
    )
})


export const SortList = (props) => {


    const sortItem = ((item) => {

        const onPress = async (item) => {

            try{
                props.setSortBy(item.item['sqlName'])
            }catch(err){
                console.log(err)
            }finally{
                props.close()
            }
        } 

        return (
        <TouchableOpacity style={[{height:40, width: "100%", justifyContent:"center", alignItems : "center"}, props.sortBy === item.item['sqlName'] ? {backgroundColor:"green"} :{backgroundColor:"black"} ]} onPress={()=>onPress(item)}>
                <Text style={{color:"white", fontSize : 12, fontWeight:"bold"}}>{item.item['displayName']}</Text>
        </TouchableOpacity>)
    })


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={{"height":"100%","width":"100%"}} onPress={()=>{props.close()}}>
            <View style={{"height":"100%","position":"relative"}}>
            <View style={{ "backgroundColor":"black","position":"absolute","top":50,"width": 150, "right":0}}>
                <FlatList data={props.items} keyExtractor={(item) => item.sqlName}
                renderItem={sortItem} />
            </View>
            </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

/*
        <TouchableOpacity style={{height:40, width: "100%", justifyContent:"center", alignItems : "center"}} onPress={()=>onPress(item.index)}>
            <Text style={{color:"white", fontSize : 12, fontWeight:"bold"}}>{item.item.Name}</Text>
            <TouchableWithoutFeedback style={{height:"100%",width:"100%"}} onPress={()=>{props.close()}}>
            <SafeAreaView style={{height:"100%",position:"relative"}}>
            <View style={{ backgroundColor:"black",position:"absolute",bottom:99,left:50,right:50}}>
        <TouchableOpacity style={{height:40, width: "100%", justifyContent:"center", alignItems : "center"}} onPress={()=>onPress(item.index)}>
            <Text style={{color:"white", fontSize : 12, fontWeight:"bold"}}>{item.item.Name}</Text>
            <TouchableWithoutFeedback style={{"height":"100%","width":"100%"}} onPress={()=>{props.close()}}>
            <View style={{"height":"100%","position":"relative"}}>
            <View style={{ "backgroundColor":"black","position":"absolute","top":50,"width": 150, "right":0}}>

*/