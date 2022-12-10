import { StyleSheet } from "react-native"

export default StyleSheet.create({
    background:{
        width : "100%",
        height : "100%",
        justifyContent : "center",
        alignItems : "center"
    },
    boxContainer:{
        backgroundColor : "black",
        width:300,
        height : 175,
        justifyContent:"center",
        alignItems: "center"
    },
    albumInfoContainer:{
        width:"100%",
        height : 50,
        paddingTop : "3%",
        alignItems:"center"
    },
    albumTitle:{
        color:"white",
        textAlign:"center",
        width: 285,
        fontSize : 20,
        fontWeight : "bold"
    },
    albumArtist:{
        color:"white",
        textAlign:"center",
        fontSize : 14
    },
    center:{
        height : 52,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    starsContainer:{
        width : 220, alignItems:"center"
    },
    starLayer:{
        position:"absolute",
        width : "100%",
        justifyContent:"center"
    },
    sliderLayer:{
        opacity: 0,
        position:"relative"
    },
    slider:{
        width:260
    },
    thumbStyle:{
        width:10,
        height:15
    },
    buttonsContainer:{
        flexDirection : "row",
        justifyContent : "center",
        alignItems:'center',
        height : 75,
        width : "90%"
    },
    threeButtonWidth:{
        width: "33.3%"
    },
    twoButtonWidth:{
        width:"50%"
    },
    buttonContainer:{
        justifyContent : "center",
        alignItems : "center" 
    },
    button:{
        borderRadius: 5,
        width : "90%",
        alignItems :"center",
        justifyContent : "center",
        height : 50
    },
    buttonTextColor:{
        color:"white"
    }
    
})