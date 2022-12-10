import { View, Text, StyleSheet} from "react-native";


export default NoResultsScreen = () => {
    return (
        <View style ={styles.background}>
            <Text style={styles.text}>No Results Returned</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        height: "100%",
        justifyContent : "center",
        alignItems:"center"
    },
    text:{
        paddingBottom : "10%",
        color : "white"
    }
})

/*
        <View style ={{height: "100%", justifyContent : "center", alignItems:"center"}}>
            <Text style={{paddingBottom : "10%", color : "white"}}>No Results Returned</Text>
*/