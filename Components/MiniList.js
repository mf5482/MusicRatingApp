import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text,FlatList, TouchableWithoutFeedback, SafeAreaView, StyleSheet} from 'react-native'
import { getPlaylists, addToPlaylist } from "../SQLite/sql.js";
import styles from '../Styles/MiniList.style.js'


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
        <TouchableOpacity style={styles.listItem} onPress={()=>onPress(item.index)}>
            <Text style={styles.listText}>{item.item.Name}</Text>
        </TouchableOpacity>)
    })

    return (
        <View>
            <TouchableWithoutFeedback style={styles.background} onPress={()=>{props.close()}}>
            <SafeAreaView style={styles.listLocation}>
            <View style={styles.miniListPosition}>
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
        <TouchableOpacity style={[styles.listItem, props.sortBy === item.item['sqlName'] ? styles.currentSort : styles.otherSort ]} onPress={()=>onPress(item)}>
                <Text style={styles.listText}>{item.item['displayName']}</Text>
        </TouchableOpacity>)
    })


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={styles.background} onPress={()=>{props.close()}}>
            <View style={styles.listLocation}>
            <View style={styles.sortListPosition}>
                <FlatList data={props.items} keyExtractor={(item) => item.sqlName}
                renderItem={sortItem} />
            </View>
            </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
/*
const styles = StyleSheet.create({
    listItem:{
        height:40,
        width: "100%",
        justifyContent:"center",
        alignItems : "center"
    },
    listText:{
        color:"white",
        fontSize : 12,
        fontWeight:"bold"
    },
    background:{
        height:"100%",
        width:"100%",
    },
    listLocation:{
        height:"100%",
        position:"relative"
    },
    miniListPosition:{
        backgroundColor:"black",
        position:"absolute",
        bottom:99,
        left:50,
        right:50
    },
    currentSort:{
        backgroundColor:"green"
    },
    otherSort:{
        backgroundColor:"black"
    },
    sortListPosition:{
        "backgroundColor":"black","position":"absolute","top":50,"width": 150, "right":0
    }
    

})*/

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