
import React, { useState,useEffect } from "react";
import {View,TouchableOpacity, TouchableWithoutFeedback, Text,} from 'react-native'

import StarRating from 'react-native-star-rating';
import Slider from '@react-native-community/slider';

import { saveAlbumRating, removeAlbumRating } from "../SQLite/sql.js";

import styles from '../Styles/RateBox.style.js'

export default RateBox = (props) => {

    const [rating, setCurrentRating] =  useState(props.albumItem['rating'])

    useEffect (() => {
        if(rating === null || rating === undefined){
            setCurrentRating(2.5)
        }
    }, [rating])

    const onSlideChange = (r) => {
        setCurrentRating(r)
    }

    const saveRating = async () => {

        var r


        if(props.albumItem['playlistId'] === null && props.albumItem['rating'] === null){
            try{

                props.albumItem['rating'] = rating

                r = await saveAlbumRating('INSERT', props.albumItem)

                if(r.toString().includes("UNIQUE constraint failed")){
                    await saveAlbumRating('UPDATE', props.albumItem)
                }

            }catch(err){
                console.log(err)
            }
        }else{

            props.albumItem['rating'] = rating
            await saveAlbumRating('UPDATE', props.albumItem)
        }

        props.setRating(rating)
        props.close()
    }


    const removeRating = async () => 
    { 
        await removeAlbumRating(props.albumItem['masterId'])
        props.setRating(null)
        props.close()

    }

    return(
        <TouchableWithoutFeedback onPress={props.close}>
        <View style = {styles.background}>
        <View style = {styles.boxContainer}>
            <View style={styles.albumInfoContainer}>
                <Text numberOfLines={1} style={styles.albumTitle}>{props.albumItem["album"]}</Text>
                <Text numberOfLines={1} style={styles.albumArtist}>{props.albumItem["artist"]}</Text>
            </View>
            <View style={styles.center}>
                <View style={styles.starsContainer}>
                    <View style={styles.starLayer}>
                        <StarRating rating={rating} halfStarEnabled={true}  disabled={true} fullStarColor="yellow"></StarRating>
                    </View>
                    <View style={styles.sliderLayer}>
                        <Slider style={styles.slider} thumbStyle={styles.thumbStyle} value={rating} tapToSeek={true} minimumValue={0} maximumValue={5} step={0.5} onValueChange={onSlideChange} trackStyle="blue"/>
                    </View>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={[styles.buttonContainer, props.albumItem['rating'] == null ? styles.twoButtonWidth : styles.threeButtonWidth]}>
                    <TouchableOpacity onPress={props.close} style={[styles.button, {backgroundColor:"red"}]}>
                        <View>
                            <Text style={styles.buttonTextColor}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {props.albumItem['rating'] != null ? 
                   <View style={[styles.buttonContainer ,styles.threeButtonWidth]}>
                   <TouchableOpacity onPress={removeRating} style={[styles.button,{ backgroundColor : "green"}]}>
                       <View>                     
                           <Text style={styles.buttonTextColor}>Remove</Text>
                       </View>
                   </TouchableOpacity>
               </View>
                : null}
                <View style={[styles.buttonContainer, props.albumItem['rating'] == null ? styles.twoButtonWidth : styles.threeButtonWidth]}>
                <TouchableOpacity onPress={saveRating} style={[styles.button, {backgroundColor:"blue"}]}>
                        <View>                     
                            <Text style={styles.buttonTextColor}>Rate</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

/*const styles = StyleSheet.create({
    background:{
        width : "100%",
        height : "100%",
        justifyContent : "center",
        alignItems : "center"
    },
    boxContainer:{
        backgroundColor : "black",
        width:300,
        height : 175,
        justifyContent:"center",
        alignItems: "center"
    },
    albumInfoContainer:{
        width:"100%",
        height : 50,
        paddingTop : "3%",
        alignItems:"center"
    },
    albumTitle:{
        color:"white",
        textAlign:"center",
        width: 285,
        fontSize : 20,
        fontWeight : "bold"
    },
    albumArtist:{
        color:"white",
        textAlign:"center",
        fontSize : 14
    },
    center:{
        height : 52,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    starsContainer:{
        width : 220, alignItems:"center"
    },
    starLayer:{
        position:"absolute",
        width : "100%",
        justifyContent:"center"
    },
    sliderLayer:{
        opacity: 0,
        position:"relative"
    },
    slider:{
        width:260
    },
    thumbStyle:{
        width:10,
        height:15
    },
    buttonsContainer:{
        flexDirection : "row",
        justifyContent : "center",
        alignItems:'center',
        height : 75,
        width : "90%"
    },
    threeButtonWidth:{
        width: "33.3%"
    },
    twoButtonWidth:{
        width:"50%"
    },
    buttonContainer:{
        justifyContent : "center",
        alignItems : "center" 
    },
    button:{
        borderRadius: 5,
        width : "90%",
        alignItems :"center",
        justifyContent : "center",
        height : 50
    },
    buttonTextColor:{
        color:"white"
    }
    
})*/

/*
        <View style = {{width : "100%",height : "100%", justifyContent : "center", alignItems : "center"}}>
        <View style = {{backgroundColor : "black", width:300, height : 175}}>
<View style={{width:"100%", height : 50, paddingTop : "3%"}}>
                <Text numberOfLines={1} style={{color:"white", textAlign:"center", fontSize : 20, fontWeight : "bold"}}>{props.albumItem["album"]}</Text>
                <Text numberOfLines={1} style={{color:"white", textAlign:"center", fontSize : 14}}>{props.albumItem["artist"]}</Text>
<View style={{height : 52, width:"100%", justifyContent:"center", alignItems:"center"}}>
                <View style={{width : 220, alignItems:"center"}}>
                    <View style={{position:"absolute", width : "100%", justifyContent:"center"}}>
                    <View style={{opacity: 0, position:"relative", marginLeft:0}}>
                        <Slider style={{"width":260}} thumbStyle={{width:10, height:15}} value={rating} tapToSeek={true} minimumValue={0} maximumValue={5} step={0.5} onValueChange={onSlideChange} trackStyle="blue"/>
                       <View style={{flexDirection : "row", justifyContent : "center", height : 75, width : "100%"}}>
                <View style={[{justifyContent : "center", alignItems : "center" }, props.albumItem['rating'] == null ? {width:"50%"} : {width:"30%"}]}>
                    <TouchableOpacity onPress={props.close} style={{ borderRadius: 5, width : "80%", alignItems :"center", justifyContent : "center", height : 50, backgroundColor : "red" }}>
                                      <Text style={{color:"white"}}>Cancel</Text>
              <View style={[{justifyContent : "center", alignItems : "center" }, props.albumItem['rating'] == null ? {width:"50%"} : {width:"30%"}]}>
                   <TouchableOpacity onPress={removeRating} style={{ borderRadius: 5, width : "80%", alignItems :"center", justifyContent : "center", height : 50, backgroundColor : "green" }}>                     
                           <Text style={{color:"white"}}>Remove</Text>
                           <View style={[{justifyContent : "center", alignItems : "center" }, props.albumItem['rating'] == null ? {width:"50%"} : {width:"30%"}]}>
                    <TouchableOpacity onPress={saveRating} style={{ borderRadius: 5, width : "80%", alignItems :"center", justifyContent : "center", height : 50, backgroundColor : "blue" }}>
                            <Text style={{color:"white"}}>Rate</Text>
                */