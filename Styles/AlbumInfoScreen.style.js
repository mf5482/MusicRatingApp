import { StyleSheet } from "react-native"

export default StyleSheet.create({
    background:{
        backgroundColor:"black",
        height:"100%"
    },
    backgroundShade:{
        opacity:0.5
    },
    albumImageSection:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:215,
        alignItems:"center",
        justifyContent:"center"
    },
    albumImageContainer:{
        display:"flex",
        width:"50%",
        alignItems:"center"
    },
    albumImage:{
        aspectRatio: 1/1,
        height:"90%"
    },
    albumInfoSection:{
        display:"flex",
        width:"100%",
        flexDirection:"column"
    },
    albumTitle:{
        color:"white",
        textAlign : "center",
        paddingLeft : "2%",
        paddingRight : "2%",
        fontWeight:"bold",
        fontSize:24
    },
    albumArtist:{
        color:"white",
        textAlign : "center",
        fontSize:18
    },
    albumInfoOther:{
        color:"white",
        textAlign : "center"
    },
    buttons : {
        marginTop : "5%",
        marginBottom : 20,
        alignItems : "center",
        height : "90%",
        width:"100%"
    },

    button : {
        height : 50,
        width: "90%",
        borderRadius : 5,
        backgroundColor : "gray",
        alignItems : "center",
        justifyContent : "center",
        marginBottom : "3%"
    },

    hasPlaylistButton : {
        height : 50,
        width: "90%",
        borderRadius : 5,
        backgroundColor : "green",
        alignItems : "center",
        justifyContent : "center",
        marginBottom : "3%"
    },

    buttonText:{
        color:"white",
        textAlign:"center"
    }
})
