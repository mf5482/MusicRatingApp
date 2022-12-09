import {View, ActivityIndicator} from 'react-native'

export const LoadingScreen = () => {
    return(
        <View style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
                <ActivityIndicator color ={"#ffffff"}/>
        </View>
    )
}

/*        <View style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black"}}>
*/