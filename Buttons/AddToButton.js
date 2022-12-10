import React, { useState} from "react";
import {Modal,TouchableOpacity,Text} from 'react-native'
import AddToScreen from '../Components/AddToScreen.js'



export default overlayMenu = ((props) => {
    const [menuVisible, setMenuVisible] = useState(false)


    return(
        <TouchableOpacity style={props.buttonStyle} onPress={()=>{setMenuVisible(!menuVisible)}}>
                <Modal  animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={{"justifyContent":"center"}}>
                    <AddToScreen returnPlaylistID={props.returnPlaylistID} albumItem={props.albumItem} close={()=>{setMenuVisible(!menuVisible)}}/>
                </Modal>
            <Text style={props.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    );
})