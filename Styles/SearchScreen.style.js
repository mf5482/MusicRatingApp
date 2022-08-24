import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container : {
        height : '100%',
        width: '100%',
        'backgroundColor' : 'black',
        'alignItems' : 'center',
        //'justifyContent' : 'center'
    },

    searchBox : {
        height: '20%',
        width : '90%',
        alignItems : 'center',
        //justifyContent : 'center',
        flexDirection : 'row'
    },

    clearIcon : {
        'width' : '10%'
    },

    searchBar : {
        width: '100%',
        height: 40,
        justifyContent : 'flex-start',
        backgroundColor: 'white',
        borderRadius : 10,
        padding : 10
    },

    resultsList : {
        width: '100%',
        height: '80%'
    }
});