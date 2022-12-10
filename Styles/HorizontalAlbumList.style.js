import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    albumContainer:{
        height: 145,
        backgroundColor : "#444444",
        width:140,
        alignItems : "center"
    },
    albumInfoContainer:{
        height:140,
        justifyContent : "center"
    },
    imageContainer:{
        height: 125
    },
    image:{
        aspectRatio: 1/1,
        height: "100%"
    },
    textContainer:{
        width : "100%",
        marginTop : -5,
        justifyContent : "center",
        alignItems : "center"
    },
    albumText:{
        color:"white", 
        flexWrap:"wrap"
    },
    albumTitle:{
        fontSize : 12, 
        textAlign : "center"
    },
    listContainer:{
        height:185,
        backgroundColor : "#444444",
        width : "97%",
        marginBottom: 10
    },
    noItemsContainer:{
        justifyContent : "center",
        height : "100%",
        alignItems : "center"
    },noItemsText:{
        color:"white"
    }
    

})