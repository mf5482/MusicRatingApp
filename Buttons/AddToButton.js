import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text} from 'react-native'
import AddToScreen from '../Components/AddToScreen.js'
import styles from '../Styles/albumInfoScreen.style.js'


export default overlayMenu = ((props) => {
    const [menuVisible, setMenuVisible] = useState(false)


    return(
        <TouchableOpacity style={props.style} onPress={()=>{setMenuVisible(!menuVisible)}}>
                <Modal  animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={{"justifyContent":"center"}}>
                    <AddToScreen returnPlaylistID={props.returnPlaylistID} albumItem={props.albumItem} close={()=>{setMenuVisible(!menuVisible)}}/>
                </Modal>
            <Text style={{color:'white', 'textAlign' : 'center'}}>{props.text}</Text>
        </TouchableOpacity>
    );
})

//                <Modal  animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={{"justifyContent":"center"}}>
//ModalPlacement
//            <Text style={{color:'white', 'textAlign' : 'center'}}>{props.text}</Text>
//ButtonText