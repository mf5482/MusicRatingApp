import {View,TouchableOpacity,Text} from 'react-native'
import styles from '../Styles/albumInfoScreen.style.js'


export default TrackListingButton = (props) => {

    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View>
                <Text style={{color:'white', 'textAlign' : 'center'}}>Track Listing</Text>
            </View>
        </TouchableOpacity>
    )
}

//                <Text style={{color:'white', 'textAlign' : 'center'}}>Track Listing</Text>
//ButtonText