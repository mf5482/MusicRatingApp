import { StyleSheet } from "react-native"

export default StyleSheet.create({
    trackItem:{
        flexDirection : "row",
        borderWidth : 2,
        width: "100%",
        height: 60,
        justifyContent : "center",
        backgroundColor : "black"
    },
    trackNumberContainer:{
        width : "7%",
        alignItems: "center",
        justifyContent : "center"
    },
    trackNumberText:{
        fontWeight: "bold",
        color: "white"
    },
    trackNameContainer:{
        width : "78%",
        justifyContent : "center"
    },
    trackNameText:{
        fontSize: 15,
        color: "white"
    },
    trackDurationContainer:{
        width : "15%",
        alignItems : "center",
        justifyContent : "center"
    },
    trackDurationText:{
        color: "white"
    },
    sectionHeader: {
        height : 30,
        justifyContent : "center",
        backgroundColor:"gray"
    },
    sectionHeaderText:{
        fontWeight: "bold",
        fontSize : 22,
        color: "white"
    },
    listContainer:{
        backgroundColor : "black",
        justifyContent:"center",
        height:"100%"
    }
})