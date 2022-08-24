import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


/***
 * To test out just copy this component and render in you root component
 */
const RecycleTestComponent = (props) => {
    const isInitialMount = useRef(true);
    const [isEmpty, setIsEmpty] = useState(true)
    const [pastLength, setPastLength] = useState(0)

    let { width } = Dimensions.get("window");

    const _layoutProvider = useRef(new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            
           dim.width = width;
           dim.height = 90;
        }                   
    
    ))


    const rowRenderer = (type, item) => {
    //You can return any view here, CellContainer has no special significance

    const title = item.title.substring(item.title.indexOf(" - ") + 3, item.title.length)
    const artist = item.title.substring(0, item.title.indexOf(" - "))

    return(
    <TouchableOpacity style = {styles.albumItem} onPress = {() => {props.onPress(item.master_id)}}>
            <View style = {{height:"50%", width:"35%", "alignItems" : "center"}}>
                <Image style={{aspectRatio: 1/1, height:'165%'}} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
            </View>
            <View style={{width:"65%"}}>
                <Text style={{color:'white'}}>{title}</Text>
                <Text style={{color: 'gray'}}>{artist}</Text>
            </View>
    </TouchableOpacity>
   );
    }

    const NoResultsScreen = () => {
        return (
            <View style ={{'height': '100%', 'justifyContent' : 'center', 'alignItems':'center'}}>
                <Text style={{"paddingBottom" : '10%', "color" : 'white'}}>No Results Returned</Text>
            </View>
        )
    }

    const listView = useRef()

    useEffect (() => {
      
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return
         }else{
        if(props.dp["_data"].length > 0 && pastLength != 0){
           listView.current.scrollToIndex(0)
        }
        setPastLength(props.dp["_data"].length)
    }
    }, [props.dp])


    return( 
    <View style={{flex:1}}>
        {props.dp["_data"].length > 0 ? 
     <RecyclerListView ref={listView} layoutProvider={_layoutProvider.current} dataProvider={props.dp} rowRenderer={rowRenderer} />
    :<NoResultsScreen />}
     </View>
    )
    
}



export default RecycleTestComponent

const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    },
    albumItem:{
       "display" : "flex",
       height : 90,
       "flexDirection" : 'row',
       }
};