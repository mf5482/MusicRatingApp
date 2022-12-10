import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
})