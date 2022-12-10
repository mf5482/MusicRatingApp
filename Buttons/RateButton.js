import React, { useState } from "react";
import {View, Modal,TouchableOpacity,Text} from 'react-native'
import RateBox from "../Components/RateBox.js";
import styles from '../Styles/RateButton.style.js'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default RateButton = (props) => {

    const [menuVisible, setMenuVisible] = useState(false)

    const showBox = () => {
        props.backgroundShade()
        setMenuVisible(!menuVisible)
    }

    return(
        <TouchableOpacity style={props.buttonStyle} onPress={showBox}>
            <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={styles.rateBoxWindow}>
                <RateBox albumItem={props.albumItem} setRating={props.setRating} close={()=> {setMenuVisible(!menuVisible); props.backgroundShade()}}/>
            </Modal>
            <View style={styles.buttonContainer}>
            <View style={styles.buttonTextContainer}>
                <Text style={props.textStyle}>Rate</Text>
                </View>
                { props.albumItem['rating'] != null ?
            <View style={styles.ratingPlacement}>
            <View style = {styles.ratingContainer}>
                    <Ionicons name={'star'} size={20} color={"white"} />
                    <Text style={styles.ratingText}>{props.albumItem['rating']}</Text>
                </View>
                </View>
                :null}
            </View>
        </TouchableOpacity>
    );
}

/*const styles = StyleSheet.create({
    rateBoxWindow: {
        justifyContent:"center",
        alignContent:"center"
    },
    buttonContainer : {
        flexDirection:"row",
        height: "100%",
        alignItems:"center", 
        position:"relative"
    },
    buttonTextContainer:{
        position:"relative",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    ratingPlacement:{
        position:"absolute",
        width:"90%",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    ratingContainer:{
        flexDirection:"column",
        height:"100%",
        justifyContent:"center",
        alignItems : "center"
    },ratingText:{
        color:"white",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center"
    }


})*/

//            <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => {setMenuVisible(!menuVisible)}} style={{"justifyContent":"center", "alignContent":"center"}}>
    //RateBoxWindow
//            <View style={{flexDirection:'row', 'height': '100%', 'alignItems':'center', 'position':'relative'}}>
    //Button Container
//            <View style={{"position":'relative','width':'100%', 'justifyContent':'center','alignItems':'center'}}>
//ButtonTextContainer
//                <Text style={[{color:'white', 'textAlign':'center'}, props.albumItem['rating'] != null ? {width:'80%'}:{width:'20%'}]}>Rate</Text>
//ButtonText
//            <View style={{"position":'absolute','width':'90%','justifyContent':'center','alignItems':'flex-end'}}>
//RatingPlacement
//             <View style = {{flexDirection:'column', 'height': '100%', 'justifyContent':'center', 'alignItems' : 'center'}}>
//RatingContainer
//                    <Text style={{'color':'white', fontSize:16, fontWeight:'bold', textAlign:'center'}}>{props.albumItem['rating']}</Text>
//RatingText