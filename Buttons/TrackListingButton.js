import {View,TouchableOpacity,Text} from 'react-native'


export default TrackListingButton = (props) => {

    return(
        <TouchableOpacity style={props.buttonStyle} onPress={props.onPress}>
            <View>
                <Text style={props.textStyle}>Track Listing</Text>
            </View>
        </TouchableOpacity>
    )
}