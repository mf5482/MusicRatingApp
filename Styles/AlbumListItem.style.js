import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    albumPlacement: {
        height:45,
        width:"35%",
        alignItems : "center"
    },
    albumImage: {
        aspectRatio: 1/1,
        height: 75
    },
    albumInfo:{
        flex: 1
    },
    titleText:{
        color:"white"
    },
    artistText:{
        color:"gray"
    },
    touchable:{
        height : 90,
        width:"100%",
        backgroundColor:"black"
    },
    albumItem:{
        display : "flex",
        height : 90,
        width:"100%",
        flexDirection : "row",
        justifyContent : "center",
        marginTop:7,
    }
    
})