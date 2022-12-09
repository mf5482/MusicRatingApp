import React, {useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from '../Styles/albumInfoScreen.style.js'

import { getAlbumInfo_LastFM } from '../MusicDatabase/lastfm.js'
import { searchAlbum_Discogs } from '../MusicDatabase/discogs.js'
import {getAlbumPlaylist, getPlaylistName, getAlbumRating } from '../SQLite/sql.js'
import AddToButton from '../Buttons/AddToButton.js'
import RatingButton from '../Buttons/RateButton.js'
import TrackListingButton from '../Buttons/TrackListingButton.js'

/*import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator(); */


//const AlbumInfoScreen = ({navigation, route}) => {
const AlbumInfoScreen = ({navigation, route}) => {


    const [artist, changeArtist] = useState('')
    const [album, changealbum] = useState('')
    const [releaseYear, changeReleaseYear] = useState('')
    const [albumImageUri, changeAlbumImageUri] = useState('')
    const [genre, changeGenre] = useState('')
    const [trackListing, changeTrackListing] = useState([])
    const [addToIsActive, setAddToIsActive] = useState(false)
    const [playlistID, setPlaylistID] = useState(null)
    const [playlistName, setPlaylistName] = useState(null)
    const [rating, setRating] = useState(null)

    const [shadeBackground, setShadeBackground] = useState(false)

    useEffect (async () => {
        getPlaylistName(playlistID, setPlaylistName)
    }, [playlistID])



    useEffect (async () => {

        //const p = await getAlbumInfo(route.params.artistName, route.params.album)
        const p = await getAlbumInfo_LastFM('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')
        const q = await searchAlbum_Discogs('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')

        const lastFmData = p.data.album
        const discogsData = q.data.results[0]
        
        changeArtist(lastFmData.artist)
        changealbum(lastFmData.name)
        changeReleaseYear(discogsData.year)
        changeAlbumImageUri(lastFmData.image[3]["#text"])
        changeGenre(discogsData.style[0])
        changeTrackListing(lastFmData.tracks.track)


    }, [])

    useEffect(async ()=>{
        await getAlbumRating(album, artist, setRating)
        await getAlbumPlaylist(album, artist, setPlaylistID, setPlaylistName)

    }, [album, artist])

    return (
        <View style={[{'backgroundColor':'black','height':'100%'}, shadeBackground === true ? {'opacity':0.5} : '']}>
            <View style={{display:'flex','flexDirection':'row', width:'100%', height:'40%', alignItems:'center', justifyContent:'center'}}>
                <View style={{display:'flex', width:'50%', alignItems:'center'}}>
                    <Image style={{aspectRatio: 1/1, height:'75%', }} source={{uri:albumImageUri}} />
                </View>
                </View>
                <View style={{display:'flex', width:'100%', 'flexDirection':'column'}}>
                    <Text style={{color:'white', 'textAlign' : 'center', 'paddingLeft' : '2%', 'paddingRight' : '2%', 'fontWeight':'bold', 'fontSize':24}}>{album}</Text>
                    <Text style={{color:'white', 'textAlign' : 'center', fontSize:18}}>{artist}</Text>
                    <Text style={{color:'white', 'textAlign' : 'center'}}>{releaseYear}</Text>
                    <Text style={{color:'white', 'textAlign' : 'center'}}>{genre}</Text>
                </View>
                <View style = {styles.buttons}>
                    <TrackListingButton/>
                    <AddToButton style = {playlistName != null ? styles.hasPlaylistButton : styles.button} albumItem = {{"album" : album, "artist" : artist, "year" : releaseYear, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setPlaylistID={setPlaylistID} text={playlistName != null ? playlistName : 'Add To...'} returnPlaylistID = {setPlaylistID}/>
                   <RatingButton albumItem = {{"album" : album, "artist" : artist, "year" : releaseYear, "genre" : genre, "rating" : rating, "playlistId" : playlistID}} setRating={setRating} backgroundShade={() => {setShadeBackground(!shadeBackground)}}/>
                </View>
        </View>
    )
}

//<TouchableOpacity style={{'height': 55, 'width':'100%', 'backgroundColor':'green'}} onPress={executeSQL}/>


export default AlbumInfoScreen