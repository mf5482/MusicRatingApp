import { StyleSheet } from "react-native"

export default StyleSheet.create({
    listItem:{
        height:40,
        width: "100%",
        justifyContent:"center",
        alignItems : "center"
    },
    listText:{
        color:"white",
        fontSize : 12,
        fontWeight:"bold"
    },
    background:{
        height:"100%",
        width:"100%",
    },
    listLocation:{
        height:"100%",
        position:"relative"
    },
    miniListPosition:{
        backgroundColor:"black",
        position:"absolute",
        bottom:99,
        left:50,
        right:50
    },
    currentSort:{
        backgroundColor:"green"
    },
    otherSort:{
        backgroundColor:"black"
    },
    sortListPosition:{
        backgroundColor:"black",
        position:"absolute",
        top:50,
        width: 150,
        right:0
    }

})