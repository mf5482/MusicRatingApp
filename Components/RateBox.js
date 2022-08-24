
import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text,FlatList} from 'react-native'

import StarRating from 'react-native-star-rating';
import {Slider} from '@miblanchard/react-native-slider';

import { saveAlbumRating, removeAlbumRating } from "../SQLite/sql.js";

export default RateBox = (props) => {
    console.log(props.albumItem['masterId'])

    const [rating, setCurrentRating] =  useState(props.albumItem['rating'])

    useEffect (() => {
        if(rating === null){
            setCurrentRating(2.5)
        }
    }, [rating])

    const onSlideChange = (r) => {
        setCurrentRating(r[0])
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

   /* useEffect(async ()=> {
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

    
    }, [rating]) */

    const removeRating = async () => 
    { 
        await removeAlbumRating(props.albumItem['masterId'])
        props.setRating(null)
        props.close()

    }

    return(
        <View style = {{'width' : '100%','height' : '100%', 'justifyContent' : 'center', 'alignItems' : 'center'}}>
        <View style = {{'backgroundColor' : 'black', width:'80%', 'height' : '30%'}}>
            <View style={{'width':'100%', 'height' : '40%', 'paddingTop' : '3%'}}>
                <Text style={{color:"white", textAlign:'center', fontSize : 20, fontWeight : 'bold'}}>{props.albumItem['album']}</Text>
                <Text style={{color:"white", textAlign:'center', fontSize : 14}}>{props.albumItem['artist']}</Text>
            </View>
            <View style={{'height' : '30%', 'width':'100%', 'justifyContent':'center', 'alignItems':'center'}}>
                <View style={{'width' : '70%'}}>
                    <View style={{'position':'absolute', 'width' : '100%', 'justifyContent':'center'}}>
                        <StarRating rating={rating} halfStarEnabled={true}  disabled={true} fullStarColor="yellow"></StarRating>
                    </View>
                    <View style={{opacity: 0, position:'relative'}}>
                        <Slider value={rating} minimumValue={0} maximumValue={5} step={0.5} onValueChange={onSlideChange} trackStyle="blue"/>
                    </View>
                </View>
            </View>
            <View style={{'flexDirection' : 'row', 'justifyContent' : 'center', 'height' : '30%', 'width' : '100%'}}>
                <View style={[{justifyContent : 'center', 'alignItems' : 'center' }, props.albumItem['rating'] == null ? {"width":'50%'} : {"width":'30%'}]}>
                    <TouchableOpacity onPress={props.close} style={{ borderRadius: 5, 'width' : '80%', 'alignItems' :'center', 'justifyContent' : 'center', 'height' : '80%', 'backgroundColor' : 'red' }}>
                        <View>
                            <Text style={{color:"white"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {props.albumItem['rating'] != null ? 
                   <View style={[{justifyContent : 'center', 'alignItems' : 'center' }, props.albumItem['rating'] == null ? {"width":'50%'} : {"width":'30%'}]}>
                   <TouchableOpacity onPress={removeRating} style={{ borderRadius: 5, 'width' : '80%', 'alignItems' :'center', 'justifyContent' : 'center', 'height' : '80%', 'backgroundColor' : 'green' }}>
                       <View>                     
                           <Text style={{color:"white"}}>Remove</Text>
                       </View>
                   </TouchableOpacity>
               </View>
                : null}
                <View style={[{justifyContent : 'center', 'alignItems' : 'center' }, props.albumItem['rating'] == null ? {"width":'50%'} : {"width":'30%'}]}>
                    <TouchableOpacity onPress={saveRating} style={{ borderRadius: 5, 'width' : '80%', 'alignItems' :'center', 'justifyContent' : 'center', 'height' : '80%', 'backgroundColor' : 'blue' }}>
                        <View>                     
                            <Text style={{color:"white"}}>Rate</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    );
}