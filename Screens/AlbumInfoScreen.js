import React, {useState, useEffect, useRef} from 'react'
import {View, Text, Image, ScrollView} from 'react-native'
import styles from '../Styles/AlbumInfoScreen.style.js'

import { getAlbum_Discogs } from '../MusicDatabase/discogs.js'
import { getAlbumPlaylist, getPlaylistName, getAlbumRating } from '../SQLite/sql.js'
import AddToButton from '../Buttons/AddToButton.js'
import RatingButton from '../Buttons/RateButton.js'
import TrackListingButton from '../Buttons/TrackListingButton.js'
import { LoadingScreen } from './LoadingScreen.js'
import ErrorAlert from '../Components/ErrorAlert.js'



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

        let retry = false
        let q = undefined

        do{
           try{
            q = await getAlbum_Discogs(route.params.masterId)
            console.log(q)

           }catch(err){
            console.log(err)
            retry = await ErrorAlert()
           } 

        }while(retry !== false)

        if(retry === false && q === undefined){
            navigation.goBack()
        }else{

        const discogsData = q.data
        
        changeArtist(discogsData.artists[0].name)
        changeAlbum(discogsData.title)
        changeAlbumImageUri(discogsData.images[0]["uri"])
        changeReleaseYear(discogsData.year)
        changeGenre(discogsData.genres[0])
        changeTrackListing(discogsData.tracklist)
        setDiscogsMasterId(discogsData.master_id)
        }

    }, [])

    useEffect(async ()=>{
        navigation.setOptions({title: album, headerBackTitleVisible:false})
        await getAlbumRating(route.params.masterId, setRating)
        await getAlbumPlaylist(route.params.masterId, setPlaylistID, setPlaylistName)

    }, [album, artist])

    return (
        <View style={[styles.background, shadeBackground === true ? styles.backgroundShade : ""]}>
            {discogsMasterId !== '' ? 
            <ScrollView>
            <View style={styles.albumImageSection}>
                <View style={styles.albumImageContainer}>
                {albumImageUri != '' ? <Image style={styles.albumImage} source={{uri:albumImageUri}} /> : 
<Image style={styles.albumImage} source={require('../assets/blankCD.jpeg')} />}                
</View>
            </View>
                <View style={styles.albumInfoSection}>
                    <Text numberOfLines={2} style={styles.albumTitle}>{album}</Text>
                    <Text numberOfLines={2} style={styles.albumArtist}>{artist}</Text>
                    <Text style={styles.albumInfoOther}>{releaseYear}</Text>
                    <Text style={styles.albumInfoOther}>{genre}</Text>
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
/*
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
})*/

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