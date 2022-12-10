import {View, ActivityIndicator, StyleSheet} from 'react-native'

export const LoadingScreen = () => {
    return(
        <View style={styles.container}>
                <ActivityIndicator color ={"#ffffff"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"black"
    }
})

/*        <View style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
*/