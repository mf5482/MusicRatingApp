import { StyleSheet } from "react-native"

export default StyleSheet.create({
    header:{
        width:"100%",
        backgroundColor:"black",
        height : 65,
        display : "flex",
        flexDirection: "row"
    },
    end:{
        width: 75,
        height : "100%",
        color : "white",
        justifyContent :"center",
        alignItems:"center" 
    },
    leftArrowContainer:{
        display:"flex",
        alignItems: "center",
        flexDirection:"row"
    },
    optionText:{
        color:"white",
        fontSize:17
    },
    centerContainer:{
        flex:1,
        height:"100%",
        alignItems:"center",
        justifyContent :"center"
    },
    centerText:{
        fontWeight:"bold",
        color:"white",
        fontSize :17
    },
    sortModal:{
        justifyContent:"center",
        alignContent:"center"
    }
})