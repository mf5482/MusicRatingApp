import { StyleSheet } from "react-native"

export default StyleSheet.create({
    savedViewButton:{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        width: 150,
        height:40,
        backgroundColor: "#f5f5f4",
    },
    background:{
        backgroundColor : "black",
         width: "100%",
         height : "100%"
    },
    container:{
        backgroundColor : "black",
        width: "100%",
        alignItems : "center",
        justifyContent : "center",
        height : "100%"
    },
    albumListTitle:{
        color: "white",
        width:"97%",
        textAlign : "left",
        fontSize : 25,
        fontWeight : "bold" 
    },
    savedViewButtonsContainer:{
        display:"flex",
        flexDirection:"row",
        width:"90%",
        justifyContent:"space-between",
        marginTop: 10
    }

})