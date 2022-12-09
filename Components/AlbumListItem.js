import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from '../Styles/ListResults.style.js'


export const AlbumListItem = (props) => {

   return( 
    <TouchableOpacity style = {styles.touchable} onPress={()=> props.onPress(props.album.master_id)}>
        <View style = {styles.albumItem}>
            <View style = {{height:45, width:"35%", alignItems : "center"}}>
                <Image style={{aspectRatio: 1/1, height:"165%"}} source={props.album.cover_image != "" ? {uri:props.album.cover_image} : require("../assets/blankCD.jpeg")} />
            </View>
            <View style={{width:"65%"}}>
                <Text numberOfLines={2} style={{color:"white"}}>{props.album.title}</Text>
                <Text numberOfLines={2} style={{color: "gray"}}>{props.album.artist}</Text>
            </View>
        </View>
    </TouchableOpacity>
   ); 
    }

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

