import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from '../Styles/AlbumListItem.style.js'

export const AlbumListItem = (props) => {

   return( 
    <TouchableOpacity style = {styles.touchable} onPress={()=> props.onPress(props.album.master_id)}>
        <View style = {styles.albumItem}>
            <View style = {styles.albumPlacement}>
                <Image style={styles.albumImage} source={props.album.cover_image != "" ? {uri:props.album.cover_image} : require("../assets/blankCD.jpeg")} />
            </View>
            <View style={styles.albumInfo}>
                <Text numberOfLines={2} style={styles.titleText}>{props.album.title}</Text>
                <Text numberOfLines={2} style={styles.artistText}>{props.album.artist}</Text>
            </View>
        </View>
    </TouchableOpacity>
   ); 
    }

/*const styles = StyleSheet.create({
    albumPlacement: {
        height:45,
        width:"35%",
        alignItems : "center"
    },
    albumImage: {
        aspectRatio: 1/1,
        height: 75
    },
    albumInfo:{
        flex: 1
    },
    titleText:{
        color:"white"
    },
    artistText:{
        color:"gray"
    },
    touchable:{
        height : 90,
        width:"100%",
        backgroundColor:"black"
    },
    albumItem:{
        display : "flex",
        height : 90,
        width:"100%",
        flexDirection : "row",
        justifyContent : "center",
        marginTop:7,
    }
    
})*/

//      <View style = {{height:45, width:"35%", alignItems : "center"}}>
//AlbumPlacemement
//      <Image style={{aspectRatio: 1/1, height:"165%"}} source={props.album.cover_image != "" ? {uri:props.album.cover_image} : require("../assets/blankCD.jpeg")} />
//AlbumImage
//            <View style={{width:"65%"}}>
//TextPlacement
//                <Text numberOfLines={2} style={{color:"white"}}>{props.album.title}</Text>
//TitleText
//                <Text numberOfLines={2} style={{color: "gray"}}>{props.album.artist}</Text>
//ArtistText

