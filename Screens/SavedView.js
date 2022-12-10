import {useState, useEffect, useCallback} from 'react'
import {View, Text, Button, Modal, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'
import {ListBar} from '../Components/ListBar.js'
import {SavedList} from '../Components/SavedList'
import { getPlaylists, getAlbums, getRatingsList } from '../SQLite/sql.js'
import SavedViewHeader, {savedViewHeader} from '../Components/SavedViewHeader.js'


const SavedViewScreen = ({navigation, route}) => {


    const [lists, setLists] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const [listItems, setListItems] = useState([])
    const [sortBy, setSortBy] = useState('title')
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)


    useEffect(() => {

        if(route.params.type == 'playlist' && currentId !== null){
            setIsLoading(true)
            getAlbums(setListItems,currentId,undefined,false, sortBy)
        }
        if(route.params.type == 'rating' && currentId !== null){
            setIsLoading(true)
            getAlbums(setListItems,undefined,currentId,false, sortBy)
        }

        if(refreshing){
            setRefreshing(!refreshing)
        }
     
    }, [currentId, sortBy])



    useEffect (() => {
        if(route.params.type == 'playlist'){
            getPlaylists(setLists)
        }else if(route.params.type === 'rating'){
            getRatingsList(setLists)
        }
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true)

        setTimeout(()=> {
            if(route.params.type == 'playlist'){
                setIsLoading(true)
                getAlbums(setListItems,currentId,undefined,false, sortBy)
            }
            if(route.params.type == 'rating'){
                setIsLoading(true)
                getAlbums(setListItems,undefined,currentId,false, sortBy)
            }
    
            setRefreshing(false)
        }, 600)
        
      }, [currentId]);
    


    const onResultClick = async (masterId) => {
        
        navigation.navigate('AlbumInfo', {
            screen: 'AlbumInfoScreen',
            masterId : masterId
        })
    }

    const goBack = () => {
        return navigation.goBack()
    }

    return(
        <SafeAreaView style={styles.container}>
            <SavedViewHeader goBack={goBack} sortBy={sortBy} setSortBy={setSortBy}/>
            <SavedList refreshing={refreshing} onRefresh={onRefresh} isLoading = {isLoading} stopLoading={()=>{setIsLoading(false)}} sortBy={sortBy} id={currentId} list={listItems} onPress={onResultClick}/>
            <ListBar items={lists} returnId={(id) => {setCurrentId(id)}}/>
        </SafeAreaView>
    )
}

export default SavedViewScreen

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"black"
    }
})

/*        <SafeAreaView style={{height:"100%",width:"100%",backgroundColor:"black"}}>
*/