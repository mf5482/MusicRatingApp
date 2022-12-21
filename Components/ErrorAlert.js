import {Alert} from 'react-native'

export default ErrorAlert = async () => {
    
    //props - function
        return  new Promise((resolve, reject) => {
            (Alert.alert("Error Accessing Discogs",
        "Please ensure that you are connected to the Internet and/or have a valid DISCOGS_APIKEY value stored in the .env file.", [
            {
              text: "Cancel",
              onPress: () => {
                return resolve(false)
              },
              style: "cancel",
            },
            {
                text:"Retry",
                onPress: () => {
                    return resolve(true)
                    },
                style: "cancel"
            }
            
          ])
        )})
}