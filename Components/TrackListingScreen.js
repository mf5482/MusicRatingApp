import { useEffect, useState, useRef } from 'react'
import {View,TouchableOpacity,Text,SectionList, FlatList,StyleSheet} from 'react-native'
import styles from '../Styles/TrackListingScreen.style.js'

export default TrackListingScreen = ({navigation, route}) => {

    const isInitialMount = useRef(true);

    const [organized, setOrganized] = useState(false)
    const [type, setType] = useState(null)
    const [organizedListing, setOrganizedListing] = useState([{'title' : '', 'data' : []}])

    const [hasHeadings, setHasHeadings] = useState(false)
    
    useEffect (()=>{

        if(route.params.trackListing[0]['type_'] === 'heading'){
            setHasHeadings(true)
        }
        if(route.params.trackListing[0].position.includes('-') || (route.params.trackListing[1] != undefined && route.params.trackListing[1].position.includes('-'))){
            setType('Double')
        }else if(/[a-zA-Z]/.test(route.params.trackListing[0].position) ||(route.params.trackListing[1] != undefined && /[a-zA-Z]/.test(route.params.trackListing[1].position))){
            setType('Album')
        }else{
            setType('Single')
        }

        
    }, [])



    useEffect(()=>{

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return
         }else{

        var d
        var startSub

        if(type === 'Album'){
            d = 'Side'
            startSub = 1
        }else if (type === 'Double'){
            d = 'Disc'
            startSub = 2
        }

        var newTrackListing = []
        var current = {}
        var trackNumber = 0

        current['data'] = []

        if(hasHeadings){
            route.params.trackListing.forEach((song, index) =>{
                if(!(song['position'].includes('Video'))){
                    //Headings + Created Side Names
                    if((song['type_'] === 'heading')){
                            if(current['data'].length > 0){
                                newTrackListing.push(current)
                                current = {}
                                current['data'] = []
                            }

                            current['title'] = song['title']

                            trackNumber = 0
                            
                            
                            
                        }else{
                            current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration'], 'position' : song['position']})
                        }
                    } 
                })
    
                if(current["data"].length > 0){
                    newTrackListing.push(current)
                }

    
            setOrganizedListing(newTrackListing)
            setOrganized(true)

        }else{
            route.params.trackListing.forEach((song, index) =>{
                if(!(song['position'].includes('Video'))){
                     
                    if((type === 'Album' || type === 'Double') && ((song['type_'] != 'index' && current['title'] !== `${d} ${song['position'].charAt(0)}`) || (song['type_'] === 'index' && song['sub_tracks'] != undefined && current['title'] !== `${d} ${song['sub_tracks'][0]['position'].charAt(0)}`))){
                            if(current['data'].length > 0){
                                newTrackListing.push(current)
                                current = {}
                                current['data'] = []
                            }
                           
                            current['title'] = `${d} ${song['position'].charAt(0)}`
                            
                            trackNumber = 0
                            
                        }
    
                        if((type === 'Album' || type === 'Double')){
                            current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration'], 'position' : song['position']})
                        }else{
                            newTrackListing.push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration'], 'position' : song['position']})
                        }
    
                    }
                })

                if(current["data"].length > 0){
                    newTrackListing.push(current)
                }

    
                setOrganizedListing(newTrackListing)

                setOrganized(true)
            }

        
}}, [type])
    


    


    const TrackList = (props) => {

            if(hasHeadings || (type === 'Album' || type === 'Double')){
                return(
                    <SectionList initialNumToRender={15}  bounces={true} sections = {organizedListing}
                    keyExtractor = {(item) => {
                        return item.position}
                    }
                    renderItem = {(item) => trackItem(item.item)}
                    renderSectionHeader={(item) => sectionHeader(item.section)}
                    />
                )
            }else{
                return(
                    <FlatList initialNumToRender={15} bounces={true} data={organizedListing}
                    keyExtractor = {(item) => {return item.position}}
                    renderItem = {(item) => trackItem(item.item)}
                    />
                )
            }
        
    }

    const trackItem = (item) => {
        return(
            <TouchableOpacity style={styles.trackItem}>
                    <View style={styles.trackNumberContainer}>
                        <Text style={styles.trackNumberText}>{item.number}</Text>
                    </View>
                    <View style={styles.trackNameContainer}>
                        <Text numberOfLines={3} style={styles.trackNameText}>{item.title}</Text>
                    </View>
                    <View style={styles.trackDurationContainer}>
                        <Text style={styles.trackDurationText}>{item.duration}</Text>
                    </View>
           </TouchableOpacity>
        )
    }

    const sectionHeader = (item) =>{
        return(
            <View style = {styles.sectionHeader}>
                <Text style= {styles.sectionHeaderText}>{item.title}</Text>
            </View>
        )    }
    

    return(
        <View>
            <View style={styles.listContainer}>
                {organized ? <TrackList/> : <View></View>}
            </View>
        </View>
    )
}

/*const styles = StyleSheet.create({
    trackItem:{
        flexDirection : "row",
        borderWidth : 2,
        width: "100%",
        height: 60,
        justifyContent : "center",
        backgroundColor : "black"
    },
    trackNumberContainer:{
        width : "7%",
        alignItems: "center",
        justifyContent : "center"
    },
    trackNumberText:{
        fontWeight: "bold",
        color: "white"
    },
    trackNameContainer:{
        width : "78%",
        justifyContent : "center"
    },
    trackNameText:{
        fontSize: 15,
        color: "white"
    },
    trackDurationContainer:{
        width : "15%",
        alignItems : "center",
        justifyContent : "center"
    },
    trackDurationText:{
        color: "white"
    },
    sectionHeader: {
        height : 30,
        justifyContent : "center",
        backgroundColor:"gray"
    },
    sectionHeaderText:{
        fontWeight: "bold",
        fontSize : 22,
        color: "white"
    },
    listContainer:{
        backgroundColor : "black",
        justifyContent:"center",
        height:"100%"
    }
})*/



/*
                    <SectionList initialNumToRender={15}  bounces={true} style={{height:"50%"}} sections = {organizedListing}
                    <FlatList initialNumToRender={15} bounces={true} style={{height:"50%"}} data={organizedListing}
            <TouchableOpacity style={{flexDirection : "row",borderWidth : 2, width: "100%", height: 60, justifyContent : "center", backgroundColor : "black"}}>
                    <View style={{width : "7%", alignItems: "center", justifyContent : "center"}}>
                        <Text style={{fontWeight: "bold", color: "white"}}>{item.number}</Text>
                    <View style={{width : "78%",  justifyContent : "center"}}>
                        <Text numberOfLines={3} style={{fontSize: 15, color: "white"}}>{item.title}</Text>
                    <View style={{width : "15%", alignItems : "center", justifyContent : "center"}}>
                        <Text style={{color: "white"}}>{item.duration}</Text>
            <View style = {{height : 30, justifyContent : "center", backgroundColor:"gray"}}>
                <Text style= {{fontWeight: "bold", fontSize : 22, color: "white"}}>{item.title}</Text>
            <View style={{backgroundColor : "black", justifyContent:"center",height:"100%"}}>

*/