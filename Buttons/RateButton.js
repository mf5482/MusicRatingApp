import React, { useState,useEffect } from "react";
import {View, Modal,Button,TouchableOpacity,Text,FlatList} from 'react-native'
import styles from '../Styles/albumInfoScreen.style.js'
import RateBox from "../Components/RateBox.js";

import Ionicons from 'react-native-vector-icons/Ionicons';

export default RateButton = (props) => {

    const [menuVisible, setMenuVisible] = useState(false)

    const showBox = () => {
        props.backgroundShade()
        setMenuVisible(!menuVisible)
    }

    return(
        <TouchableOpacity style={styles.button} onPress={showBox}>
            <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={{"justifyContent":"center", "alignContent":"center"}}>
                <RateBox albumItem={props.albumItem} setRating={props.setRating} close={()=> {setMenuVisible(!menuVisible); props.backgroundShade()}}/>
            </Modal>
            <View style={{flexDirection:'row', 'height': '100%', 'alignItems':'center'}}>
                <Text style={[{color:'white', 'textAlign' : 'center'}, props.albumItem['rating'] != null ? {width:'80%'}:{width:'20%'}]}>Rate</Text>
                { props.albumItem['rating'] != null ?
                <View style = {{flexDirection:'column', 'width': '20%', 'height': '100%', 'justifyContent':'center', 'alignItems' : 'center'}}>
                    <Ionicons name={'star'} size={20} color={"white"} />
                    <Text style={{'color':'white', fontSize:16, fontWeight:'bold', textAlign:'center'}}>{props.albumItem['rating']}</Text>
                </View>
:null}
            </View>
        </TouchableOpacity>
    );
}