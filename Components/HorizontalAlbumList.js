import React, {useState} from 'react'
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native'



export default HorizontalAlbumList = (props) => {


    const showAlbum = (item) => {
        //<Image style={{aspectRatio: 1/1, height:'70%'}} source={item.item.CoverArt != '' ? {uri:item.item.CoverArt} : require('../assets/blankCD.jpeg')} />

        return(<TouchableOpacity style={{height : 145, backgroundColor : "#444444", width:140, alignItems : "center"}} onPress = {() => {props.onPress(item.master_id)}}>
               
                <View style = {{height : 140, justifyContent : "center"}}>
                    <View style = {{height : 125}}>
                        <Image style={{aspectRatio: 1/1, height:"100%"}} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
                    </View>
                </View>
                    <View style={{width : "100%", marginTop : -5, justifyContent : "center", alignItems : "center"}}>
                        <Text numberOfLines={2} style={{color:"white", flexWrap:"wrap", fontSize : 12, textAlign : "center"}}>{item.title}</Text>
                        <Text numberOfLines={1} style={{color:"white", flexWrap:"wrap"}}>{item.artist}</Text>
                    </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={[{height:185, backgroundColor : "#444444"},props.style]}>
        {props.data.length > 0 ? <FlatList horizontal={true} data={props.data}
        renderItem={(item) => showAlbum(item.item)}
        keyExtractor={item => item.master_id}/> : 
        <View style={{justifyContent : "center", height : "100%", alignItems : "center"}}>
            <Text style={{color : "white"}}>No Items Found</Text>
        </View>}
        </View>
    )
}

//return(<TouchableOpacity style={{height : 145, backgroundColor : "#444444", width:140, alignItems : "center"}} onPress = {() => {props.onPress(item.master_id)}}>
//AlbumContainer
//                <View style = {{height : 140, justifyContent : "center"}}>
//AlbumInfoContainer
//                    <View style = {{height : 125}}>
//ImageContainer
//                        <Image style={{aspectRatio: 1/1, height:"100%"}} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
//Image
//                     <View style={{width : "100%", marginTop : -5, justifyContent : "center", alignItems : "center"}}>
//TextContainer
//                        <Text numberOfLines={2} style={{color:"white", flexWrap:"wrap", fontSize : 12, textAlign : "center"}}>{item.title}</Text>
//AlbumTitle
//                        <Text numberOfLines={1} style={{color:"white", flexWrap:"wrap"}}>{item.artist}</Text>
//AlbumArtist
//        <View style={[{height:185, backgroundColor : "#444444"},props.style]}>
//ListContainer
//        <View style={{justifyContent : "center", height : "100%", alignItems : "center"}}>
//NoItemsContainer
//            <Text style={{color : "white"}}>No Items Found</Text>
//NoItemsText
