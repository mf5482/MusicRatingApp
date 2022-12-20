import {StyleSheet, Dimensions} from 'react-native'

export default StyleSheet.create({
    container : {
        height : "100%",
        width: "100%",
        backgroundColor : "black",
        alignItems : "center",
        //justifyContent : "center"
    },

    searchBox : {
        height: "18%",
        width : "90%",
        alignItems : "center",
        //justifyContent : "center",
        flexDirection : "row"
    },

    clearIcon : {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:10
    },

    clearButton:{
        width:20,
        height:20,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor:"gray",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:5
    },

    searchBar : {
        height: 40,
        justifyContent : "space-between",
        backgroundColor: "white",
        borderRadius : 10,
        padding : 10,
        display:"flex",
        flex:1,
        flexDirection : "row"
    },

    resultsList : {
        width: "100%",
        height: "88%"
    },
    flexFill:{
        flex:1
    }
})