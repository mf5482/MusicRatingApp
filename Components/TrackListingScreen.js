import { useEffect, useState, useRef } from 'react'
import {View,TouchableOpacity,Text,SectionList, FlatList} from 'react-native'
import styles from '../Styles/trackListing.style.js'

export default TrackListingScreen = ({navigation, route}) => {

    const isInitialMount = useRef(true);

    const [type, setType] = useState(null)
    const [organizedListing, setOrganizedListing] = useState([{'title' : '', 'data' : []}])

    const [hasHeadings, setHasHeadings] = useState(false)
    
    useEffect (()=>{

        if(route.params.trackListing[0]['type_'] === 'heading'){
            setHasHeadings(true)
        }
        console.log(hasHeadings, 'p')
        if(route.params.trackListing[0].position.includes('-') || (route.params.trackListing[1] != undefined && route.params.trackListing[1].position.includes('-'))){
            setType('Double')
        }else if(/[a-zA-Z]/.test(route.params.trackListing[0].position) ||(route.params.trackListing[1] != undefined && /[a-zA-Z]/.test(route.params.trackListing[1].position))){
            setType('Album')
        }else{
            setType('Single')
        }

        
    }, [])

    const getNumber = (position) => {
        console.log("Rats" ,position)
            if(type === 'Album'){
                return parseInt(position.substring(position.search(/\d/), position.length))
                
            }else if(type === 'Double'){
                return parseInt(position.substring(position.indexOf('-') + 1, position.length))
            }
            
        return parseInt(position)

    }

    useEffect(()=>{
        console.log(type)

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
                            console.log('Here', song['title']) 
                            if(current['data'].length > 0){
                                console.log('Push',current['title'])
                                newTrackListing.push(current)
                                current = {}
                                current['data'] = []
                            }

                            console.log('B-', song['title'],song['type_'])
                            current['title'] = song['title']

                            trackNumber = 0
                            
                            
                            
                        }else{
                            console.log('D-', song['title'],song['type_'])
                            current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                        }
                    } 
                })
    
                if(current["data"].length > 0){
                    console.log('Push')
                    newTrackListing.push(current)
                }

                console.log(newTrackListing)
    
            setOrganizedListing(newTrackListing)
        }else{
            route.params.trackListing.forEach((song, index) =>{
                if(!(song['position'].includes('Video'))){
                     
                    if((type === 'Album' || type === 'Double') && ((song['type_'] != 'index' && current['title'] !== `${d} ${song['position'].charAt(0)}`) || (song['type_'] === 'index' && song['sub_tracks'] != undefined && current['title'] !== `${d} ${song['sub_tracks'][0]['position'].charAt(0)}`))){
                            if(current['data'].length > 0){
                                console.log('Push',current['title'])
                                newTrackListing.push(current)
                                current = {}
                                current['data'] = []
                            }
                           
                            console.log('C-', song['title'],song['type_'])
                            current['title'] = `${d} ${song['position'].charAt(0)}`
                            
                            trackNumber = 0
                            
                        }
    
                        if((type === 'Album' || type === 'Double')){
                            console.log('G-', song['title'],song['type_'])
                            current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                        }else{
                            console.log('H-', song['title'],song['type_'])
                            newTrackListing.push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                        }
    
                    }
                })

                if(current["data"].length > 0){
                    console.log('Push')
                    newTrackListing.push(current)
                }
    
            setOrganizedListing(newTrackListing)
            }
         
        /*route.params.trackListing.forEach((song, index) =>{
            if(!(song['position'].includes('Video'))){
                //Headings + Created Side Names
                if((song['type_'] === 'heading') || (current['title'] === undefined && (type === 'Album' || type === 'Double') && route.params.trackListing[index+1] != undefined && getNumber(route.params.trackListing[index+1]['position']) === 1)){

                        console.log('Here', song['title']) 
                        if(current['data'].length > 0){
                            console.log('Push',current['title'])
                            console.log(current['data'])
                            newTrackListing.push(current)
                            current = {}
                            current['data'] = []
                        }
                        if(song['type_'] === 'heading'){
                            console.log('B-', song['title'],song['type_'])
                            current['title'] = song['title']
                        }else{
                            console.log('C-', song['title'],song['type_'])
                            current['title'] = `${d} ${song['position'].charAt(0)}`
                        }
                        trackNumber = 0
                    }

                    if(song['type_'] != 'heading' && head === true){
                        console.log('D-', song['title'],song['type_'])
                        current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                    }else if(head === false){
                        console.log('E-', song['title'],song['type_'])
                        newTrackListing.push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                    }

                }
                
            })

            if(current["data"].length > 0){
                console.log('Push')
                newTrackListing.push(current)
            }

        setOrganizedListing(newTrackListing)
         } */

        
}}, [type])
    

    /*
    var head = false

            route.params.trackListing.forEach((song, index) =>{
                if(!(song['position'].includes('Video'))){
                    //Headings + Created Side Names
                    if((song['type_'] === 'heading') || (head === false && (type === 'Album' || type === 'Double') && getNumber(route.params.trackListing[index]['position']) === 1)){
                            head = true    
                            if(current['data'].length > 0){
                                newTrackListing.push(current)
                                current = {}
                                current['data'] = []
                            }
                            if(song['type_'] === 'heading'){
                                console.log('B-', song['title'],song['type_'])
                                current['title'] = song['title']
                            }else{
                                console.log('C-', song['title'],song['type_'])
                                current['title'] = `${d} ${song['position'].charAt(0)}`
                            }
                            trackNumber = 0
                        }

                        if(song['type_'] != 'heading' && head === true){
                            console.log('D-', song['title'],song['type_'])
                            current['data'].push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                        }else if(head === false){
                            console.log('E-', song['title'],song['type_'])
                            newTrackListing.push({'number': ++trackNumber, 'title':song['title'], 'duration': song['duration']})
                        }

                    }
                    
                })

                if(current != {}){
                    newTrackListing.push(current)
                }

                console.log(newTrackListing)
    */


    


    const TrackList = (props) => {
        if(hasHeadings || (type === 'Album' || type === 'Double')){
            return(
                <SectionList  bounces={true} style={{"height":'50%'}} sections = {organizedListing}
                keyExtractor = {(item, index) => index}
                renderItem = {(item) => trackItem(item.item)}
                renderSectionHeader={(item) => sectionHeader(item.section)}
                />
            )
        }else{
            return(
                <FlatList bounces={true} style={{"height":'50%'}} data={organizedListing}
                keyExtractor = {(item, index) => index}
                renderItem = {(item) => trackItem(item.item)}
                />
            )
        }
    }

    const trackItem = (item) => {
        return(
            <TouchableOpacity style={{'flexDirection' : 'row','borderWidth' : 2, width: '100%', height: 60, 'justifyContent' : 'center', 'backgroundColor' : 'black'}}>
                    <View style={{'width' : '7%', alignItems: 'center', justifyContent : 'center'}}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>{item.number}</Text>
                    </View>
                    <View style={{'width' : '78%',  justifyContent : 'center'}}>
                        <Text numberOfLines={3} style={{fontSize: 15, color: 'white'}}>{item.title}</Text>
                    </View>
                    <View style={{'width' : '15%', alignItems : 'center', justifyContent : 'center'}}>
                        <Text style={{color: 'white'}}>{item.duration}</Text>
                    </View>
           </TouchableOpacity>
        )
    }

    const sectionHeader = (item) =>{
        return(
            <View style = {{height : 30, 'justifyContent' : 'center', backgroundColor:'gray'}}>
                <Text style= {{fontWeight: 'bold', fontSize : 22, color: 'white'}}>{item.title}</Text>
            </View>
        )    }
    

    return(
        <View>
            <View style={{backgroundColor : 'black', "justifyContent":"center","height":"100%"}}>
                <TrackList/>
            </View>
        </View>
    )
}