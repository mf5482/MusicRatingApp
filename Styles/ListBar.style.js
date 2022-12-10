import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    listContainer:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        height:50,
        width:"100%",
        backgroundColor:"black"
    },
    arrowContainer:{
        width:50,
        height:"100%"
    },
    arrow:{
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    playlistTitleContainer:{
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    playlistTitleText:{
        color:"white",
        fontSize : 16,
        fontWeight:"bold"
    }
})