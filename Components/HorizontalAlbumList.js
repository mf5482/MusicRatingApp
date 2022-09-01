import React, {useState} from 'react'
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native'



export default HorizontalAlbumList = (props) => {

    console.log(props.style)

    const showAlbum = (item) => {
        //<Image style={{aspectRatio: 1/1, height:'70%'}} source={item.item.CoverArt != '' ? {uri:item.item.CoverArt} : require('../assets/blankCD.jpeg')} />

        console.log(item)
        return(<TouchableOpacity style={{'height' : 145, backgroundColor : '#444444', width:140, 'alignItems' : 'center'}} onPress = {() => {props.onPress(item.MasterId)}}>
               
                <View style = {{'height' : 140, 'justifyContent' : 'center'}}>
                    <View style = {{'height' : 125}}>
                        <Image style={{aspectRatio: 1/1, height:'100%'}} source={item.CoverArt != '' ? {uri:item.CoverArt} : require('../assets/blankCD.jpeg')} />
                    </View>
                </View>
                    <View style={{'width' : '100%', 'marginTop' : -5, 'justifyContent' : 'start', 'alignItems' : 'center'}}>
                        <Text numberOfLines={2} style={{color:'white', flexWrap:'wrap', fontSize : 12, textAlign : 'center'}}>{item.Album}</Text>
                        <Text numberOfLines={1} style={{color:'white', flexWrap:'wrap'}}>{item.Artist}</Text>
                    </View>
            </TouchableOpacity>
        )
    }

    console.group(props.data.length)
    return(
        <View style={[{'height':185, 'backgroundColor' : '#444444'},props.style]}>
        {props.data.length > 0 ? <FlatList horizontal={true} data={props.data}
        renderItem={(item) => showAlbum(item.item)}
        keyExtractor={item => item.MasterId}/> : 
        <View style={{"justifyContent" : 'center', 'height' : '100%', 'alignItems' : 'center'}}>
            <Text style={{'color' : 'white'}}>No Items Found</Text>
        </View>}
        </View>
    )
}