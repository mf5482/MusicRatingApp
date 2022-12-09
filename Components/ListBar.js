import { useEffect, useState, useRef } from 'react'
import {View, Text, TouchableOpacity, Modal} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MiniList from './MiniList.js'
export const ListBar = (props) => {

    const isInitialMount = useRef(true);
    const [currentItem, setCurrentItem] = useState(null)
    const [itemCount, setItemCount] = useState(0)
    const [playlistMenuVisible, setPlaylistMenuVisible] = useState(false)

    const increase = (()=>{

        let newCount = itemCount + 1

        if(newCount >= props.items.length){
            newCount = 0
        }

        setItemCount(newCount)
    })

    const decrease = (()=>{

        let newCount = itemCount - 1

        if(newCount < 0){
            newCount = props.items.length - 1
        }

        setItemCount(newCount)
    })

    useEffect(() =>{ 

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return
         }else{

        setCurrentItem(props.items[itemCount].Name)
        props.returnId(props.items[itemCount].ID)    
        } 
    
    }, [itemCount, props.items])

    const closeMiniList =() => {
        setPlaylistMenuVisible(!playlistMenuVisible)
    }


    return(
        <View style={{display:"flex", justifyContent:"space-between",flexDirection:"row",height:50,width:"100%",backgroundColor:"black"}}>
            <View style={{width:50,height:"100%"}}>   
                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={decrease}>
                            <Ionicons name={'caret-back'} size={30} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onLongPress={()=>setPlaylistMenuVisible(!playlistMenuVisible)}>
            <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <Modal animationType="fade" transparent={true} visible={playlistMenuVisible} onRequestClose={closeMiniList} style={{"justifyContent":"center", "alignContent":"center"}}>
                <MiniList close={closeMiniList} returnPlaylist={(playlistId)=>{setItemCount(playlistId)}} items={props.items}></MiniList>
            </Modal>
                <Text style={{color:"white", fontSize : 16, fontWeight:"bold"}}>{currentItem}</Text>
            </View>
            </TouchableOpacity>
            <View style={{width:50,height:"100%"}}>
                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={increase}>
                        <Ionicons name={'caret-forward'} size={30} color={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

/*
        <View style={{display:"flex", justifyContent:"space-between",flexDirection:"row",height:50,width:"100%",backgroundColor:"black"}}>
            <View style={{width:50,height:"100%"}}>   
                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
            <Modal animationType="fade" transparent={true} visible={playlistMenuVisible} onRequestClose={closeMiniList} style={{"justifyContent":"center", "alignContent":"center"}}>
                <Text style={{color:"white", fontSize : 16, fontWeight:"bold"}}>{currentItem}</Text>
            <View style={{width:50,height:"100%"}}>
                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>

*/