import React, {useState, useEffect, useRef} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from '../Styles/albumInfoScreen.style.js'

import { getAlbumInfo_LastFM } from '../MusicDatabase/lastfm.js'
import { searchAlbum_Discogs, getAlbum_Discogs } from '../MusicDatabase/discogs.js'
import { executeSQL, addAlbum, getAlbumPlaylist, getPlaylistName, getAlbumRating } from '../SQLite/sql.js'
import AddToButton from '../Buttons/AddToButton.js'
import RatingButton from '../Buttons/RateButton.js'
import TrackListingButton from '../Buttons/TrackListingButton.js'

import TrackListingScreen from '../Components/TrackListingScreen.js'
import AddToScreen from '../Components/AddToScreen.js'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AlbumInfoNavigator = ({navigation, route}) => {
    return (
       <Stack.Navigator initialRouteName='AlbumInfoScreen' screenOptions={({ route, navigation }) => ({
        headerShown: true})}>
            <Stack.Screen name="AlbumInfoScreen" component = {AlbumInfoScreen} />
            <Stack.Screen name="TrackListing" component={TrackListingScreen} />
        </Stack.Navigator>
    )
}

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

        console.log(route)
        console.log('rats' , route.params.albumName, route.params.artistName)
        const p = await getAlbumInfo_LastFM(route.params.artistName, route.params.albumName)
        const q = await searchAlbum_Discogs(route.params.artistName, route.params.albumName)

        /*const p = await getAlbumInfo_LastFM('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')
        const q = await searchAlbum_Discogs('Tom Petty and The Heartbreakers', 'Tom Petty and The Heartbreakers')
*/
        /*const p = await getAlbumInfo_LastFM('Billy Joel', 'The Essential Billy Joel')
        const q = await searchAlbum_Discogs('Billy Joel', 'The Essential Billy Joel')
        */
        /*const p = await getAlbumInfo_LastFM('Kanye West', 'Donda')
        const q = await searchAlbum_Discogs('Kanye West', 'Donda') */

        const lastFmData = p.data.album
        const discogsData = q.data.results[0]
        
        changeArtist(lastFmData.artist)
        changeAlbum(lastFmData.name)
        //changeReleaseYear(discogsData.year)
        changeAlbumImageUri(lastFmData.image[3]["#text"])
        setDiscogsMasterId(discogsData.master_id)
        //changeGenre(discogsData.style[0])
        //changeTrackListing(lastFmData.tracks.track)


    }, [])

    useEffect (async () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
         }else{
            const r = await getAlbum_Discogs(discogsMasterId)

            const discogsData = r.data

            changeReleaseYear(discogsData.year)
            changeGenre(discogsData.genres[0])
            changeTrackListing(discogsData.tracklist)
         }

    }, [discogsMasterId])

    useEffect(async ()=>{
        await getAlbumRating(album, artist, setRating)
        await getAlbumPlaylist(album, artist, setPlaylistID, setPlaylistName)

    }, [album, artist])

    useEffect(() => {
        console.log(trackListing)
    }, [trackListing])

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
                    <TrackListingButton onPress = {() => navigation.navigate('TrackListing', {'trackListing':trackListing})}></TrackListingButton>
                    <AddToButton onPress={() => navigation.navigate('AddTo')} />
                </View>
        </View>
    )
}

//<TouchableOpacity style={{'height': 55, 'width':'100%', 'backgroundColor':'green'}} onPress={executeSQL}/>


export default AlbumInfoNavigator