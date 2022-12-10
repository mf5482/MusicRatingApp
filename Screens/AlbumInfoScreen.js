import React, {useState, useEffect, useRef} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import styles from '../Styles/albumInfoScreen.style.js'

import { getAlbumInfo_LastFM } from '../MusicDatabase/lastfm.js'
import { searchAlbum_Discogs, getAlbum_Discogs } from '../MusicDatabase/discogs.js'
import { executeSQL, addAlbum, getAlbumPlaylist, getPlaylistName, getAlbumRating } from '../SQLite/sql.js'
import AddToButton from '../Buttons/AddToButton.js'
import RatingButton from '../Buttons/RateButton.js'
import TrackListingButton from '../Buttons/TrackListingButton.js'
import { LoadingScreen } from './LoadingScreen.js'

import TrackListingScreen from '../Components/TrackListingScreen.js'
import AddToScreen from '../Components/AddToScreen.js'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';



//const AlbumInfoScreen = ({navigation, route}) => {
const AlbumInfoScreen = ({navigation, route}) => {

    const isInitialMount = useRef(true);

    const [artist, changeArtist] = useState('')
    const [album, changeAlbum] = useState('')
    const [releaseYear, changeReleaseYear] = useState('')
    const [albumImageUri, changeAlbumImageUri] = useState('')
    const [genre, changeGenre] = useState('')
    const [trackListing, changeTrackListing] = useState([])
    const [addToIsActive, setAddToIsActive] = useState(false)
    const [playlistID, setPlaylistID] = useState(null)
    const [playlistName, setPlaylistName] = useState(null)
    const [rating, setRating] = useState(null)
    const [discogsMasterId, setDiscogsMasterId] = useState('')

    const [shadeBackground, setShadeBackground] = useState(false)

    useEffect (async () => {
        getPlaylistName(playlistID, setPlaylistName)
    }, [playlistID])


    useEffect (async () => {

        const q = await getAlbum_Discogs(route.params.masterId)

        /*const p = await getAlbumInfo_LastFM('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')
        const q = await searchAlbum_Discogs('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')
*/
        /*const p = await getAlbumInfo_LastFM('Billy Joel', 'The Essential Billy Joel')
        const q = await searchAlbum_Discogs('Billy Joel', 'The Essential Billy Joel')
        */
        /*const p = await getAlbumInfo_LastFM('Kanye West', 'Donda')
        const q = await searchAlbum_Discogs('Kanye West', 'Donda') */

        const discogsData = q.data
        
        changeArtist(discogsData.artists[0].name)
        changeAlbum(discogsData.title)
        changeAlbumImageUri(discogsData.images[0]["uri"])
        changeReleaseYear(discogsData.year)
        changeGenre(discogsData.genres[0])
        changeTrackListing(discogsData.tracklist)
        setDiscogsMasterId(discogsData.master_id)

    }, [])

    useEffect(async ()=>{
        navigation.setOptions({title: album, headerBackTitleVisible:false})
        await getAlbumRating(route.params.masterId, setRating)
        await getAlbumPlaylist(route.params.masterId, setPlaylistID, setPlaylistName)

    }, [album, artist])

    return (
        <View style={[styles2.background, shadeBackground === true ? styles2.backgroundShade : ""]}>
            {discogsMasterId !== '' ? 
            <ScrollView>
            <View style={styles2.albumImageSection}>
                <View style={styles2.albumImageContainer}>
                {albumImageUri != '' ? <Image style={styles2.albumImage} source={{uri:albumImageUri}} /> : 
<Image style={styles2.albumImage} source={require('../assets/blankCD.jpeg')} />}                
</View>
            </View>
                <View style={styles2.albumInfoSection}>
                    <Text numberOfLines={2} style={styles2.albumTitle}>{album}</Text>
                    <Text numberOfLines={2} style={styles2.albumArtist}>{artist}</Text>
                    <Text style={styles2.albumInfoOther}>{releaseYear}</Text>
                    <Text style={styles2.albumInfoOther}>{genre}</Text>
                </View>
                <View style = {styles.buttons}>
                    <TrackListingButton buttonStyle={styles.button} textStyle={styles.buttonText} onPress = {() => navigation.navigate("TrackListing", {"trackListing":trackListing})}></TrackListingButton>
                    <AddToButton buttonStyle = {playlistName != null ? styles.hasPlaylistButton : styles.button} textStyle={styles.buttonText} albumItem = {{"masterId" : route.params.masterId, "album" : album, "artist" : artist, "year" : releaseYear, coverArt : albumImageUri, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setPlaylistID={setPlaylistID} text={playlistName != null ? playlistName : "Add To..."} returnPlaylistID = {setPlaylistID}/>
                    <RatingButton buttonStyle={styles.button} textStyle={styles.buttonText} albumItem = {{"masterId" : route.params.masterId, "album" : album, "artist" : artist, "year" : releaseYear, coverArt : albumImageUri, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setRating={setRating} backgroundShade={() => {setShadeBackground(!shadeBackground)}}/>
                </View>
                </ScrollView>
                : <LoadingScreen/>
                }
        </View>
    )
}


export default AlbumInfoScreen

const styles2 = StyleSheet.create({
    background:{
        backgroundColor:"black",
        height:"100%"
    },
    backgroundShade:{
        opacity:0.5
    },
    albumImageSection:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:215,
        alignItems:"center",
        justifyContent:"center"
    },
    albumImageContainer:{
        display:"flex",
        width:"50%",
        alignItems:"center"
    },
    albumImage:{
        aspectRatio: 1/1,
        height:"90%"
    },
    albumInfoSection:{
        display:"flex",
        width:"100%",
        flexDirection:"column"
    },
    albumTitle:{
        color:"white",
        textAlign : "center",
        paddingLeft : "2%",
        paddingRight : "2%",
        fontWeight:"bold",
        fontSize:24
    },
    albumArtist:{
        color:"white",
        textAlign : "center",
        fontSize:18
    },
    albumInfoOther:{
        color:"white",
        textAlign : "center"
    }
})

/*
        <View style={[{backgroundColor:"black",height:"100%"}, shadeBackground === true ? {opacity:0.5} : ""]}>
        <View style={{display:"flex",flexDirection:"row", width:"100%", height:215, alignItems:"center", justifyContent:"center"}}>
                <View style={{display:"flex", width:"50%", alignItems:"center"}}>
                {albumImageUri != '' ? <Image style={{aspectRatio: 1/1, height:"90%"}} source={{uri:albumImageUri}} /> : 
<Image style={{aspectRatio: 1/1, height:"90%"}} source={require('../assets/blankCD.jpeg')} />} 
<View style={{display:"flex", width:"100%", flexDirection:"column"}}>
                    <Text numberOfLines={2} style={{color:"white", textAlign : "center", paddingLeft : "2%", paddingRight : "2%", fontWeight:"bold", fontSize:24}}>{album}</Text>
                    <Text numberOfLines={2} style={{color:"white", textAlign : "center", fontSize:18}}>{artist}</Text>
                    <Text style={{color:"white", textAlign : "center"}}>{releaseYear}</Text>
                    <Text style={{color:"white", textAlign : "center"}}>{genre}</Text>       
 <TrackListingButton onPress = {() => navigation.navigate("TrackListing", {"trackListing":trackListing})}></TrackListingButton>
                    <AddToButton style = {playlistName != null ? styles.hasPlaylistButton : styles.button} albumItem = {{"masterId" : route.params.masterId, "album" : album, "artist" : artist, "year" : releaseYear, coverArt : albumImageUri, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setPlaylistID={setPlaylistID} text={playlistName != null ? playlistName : "Add To..."} returnPlaylistID = {setPlaylistID}/>
                    <RatingButton albumItem = {{"masterId" : route.params.masterId, "album" : album, "artist" : artist, "year" : releaseYear, coverArt : albumImageUri, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setRating={setRating} backgroundShade={() => {setShadeBackground(!shadeBackground)}}/>
                

*/