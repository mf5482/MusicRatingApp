import React from 'react'
import {View, Text} from 'react-native'
import SearchResultsList from '../Components/FlatList.js'

class DiscoverTab extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <Text>This is a Discover Screen</Text>
                <SearchResultsList/>
            </View>
        )
    }
}

export default DiscoverTab