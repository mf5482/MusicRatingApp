import React from 'react'
import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native'
import styles from '../Styles/HorizontalAlbumList.style.js'


export default HorizontalAlbumList = (props) => {


    const showAlbum = (item) => {

        return(<TouchableOpacity style={styles.albumContainer} onPress = {() => {props.onPress(item.master_id)}}>
               
                <View style = {styles.albumInfoContainer}>
                    <View style = {styles.imageContainer}>
                        <Image style={styles.image} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
                    </View>
                </View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={2} style={[styles.albumText, styles.albumTitle]}>{item.title}</Text>
                        <Text numberOfLines={1} style={styles.albumText}>{item.artist}</Text>
                    </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.listContainer}>
        {props.data.length > 0 ? <FlatList horizontal={true} data={props.data}
        renderItem={(item) => showAlbum(item.item)}
        keyExtractor={item => item.master_id}/> : 
        <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>No Items Found</Text>
        </View>}
        </View>
    )
}

/*const styles = StyleSheet.create({
    albumContainer:{
        height: 145,
        backgroundColor : "#444444",
        width:140,
        alignItems : "center"
    },
    albumInfoContainer:{
        height:140,
        justifyContent : "center"
    },
    imageContainer:{
        height: 125
    },
    image:{
        aspectRatio: 1/1,
        height: "100%"
    },
    textContainer:{
        width : "100%",
        marginTop : -5,
        justifyContent : "center",
        alignItems : "center"
    },
    albumText:{
        color:"white", 
        flexWrap:"wrap"
    },
    albumTitle:{
        fontSize : 12, 
        textAlign : "center"
    },
    listContainer:{
        height:185,
        backgroundColor : "#444444",
        width : "97%",
        marginBottom: 10
    },
    noItemsContainer:{
        justifyContent : "center",
        height : "100%",
        alignItems : "center"
    },noItemsText:{
        color:"white"
    }
    

})*/

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
