import { StyleSheet } from "react-native";

export default StyleSheet.create({
    addToScreenContainer: {
        height:"100%"
    },
    backgroundDim : {
        flex: 1,
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    listColor : {
        backgroundColor: "black"
    },
    playlistItem:{
        display : "flex",
        height : 70,
        width: "100%",
        flexDirection : "row",
        backgroundColor : "black",
        alignItems: "center",
        borderBottomColor:"white",
        borderStyle: "solid",
        borderWidth : 1
    },
    playlistItemText : {
        color:"white",
        textAlign : "center",
        fontSize : 24,
        fontWeight : "bold",
        width:"90%",
        textAlign : "left",
        paddingLeft : 10
    },

    playlistItemGreen:{
        display : "flex",
        height : 70,
        width: "100%",
        flexDirection : "row",
        backgroundColor : "green",
        alignItems: "center",
        borderBottomColor:"white",
        borderStyle: "solid",
        borderWidth : 1
    },

    removeButton:{
        display : "flex",
        height : 50,
        width: "90%",
        flexDirection : "row",
        backgroundColor : "red",
        alignItems: "center",
        borderRadius : 5,
        borderStyle: "solid",
        borderWidth : 1
    },

    removeButtonText:{
        color:"white",
        textAlign : "center",
        width:"100%", 
        fontSize:16
    },
    removeButtonContainer:{
        alignItems:"center"
    }
    
})