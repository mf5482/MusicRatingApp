 import React, { Component } from "react";
 import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator } from "react-native";
 import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
 
 
 let containerCount = 0;
 
 class CellContainer extends React.Component {
     constructor(args) {
         super(args);
         this._containerId = containerCount++;
     }
     render() {
         return <View {...this.props}>{this.props.children}<Text>Cell Id: {this._containerId}</Text></View>;
     }
 }
 
 /***
  * To test out just copy this component and render in you root component
  */
 export default class RecycleTestComponent extends React.Component {
     constructor(props) {
        super(props);

 
         let { width } = Dimensions.get("window");
 
         //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        /* let dataProvider = new DataProvider((r1, r2) => {
             return r1 !== r2;
         }); */
 
         //Create the layout provider
         //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
         //Second: Given a type and object set the height and width for that type on given object
         //If you need data based check you can access your data provider here
         //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
         //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
         this._layoutProvider = new LayoutProvider(
             index => {
                 return 0
             },
             (type, dim) => {
                 
                dim.width = width;
                dim.height = 90;
             }                   
        
         );
 
         this._rowRenderer = this._rowRenderer.bind(this);
 
        /* //Since component should always render once data has changed, make data provider part of the state
         this.state = {
             dataProvider: dataProvider.cloneWithRows(props.data)
         }; */
     }

     //Given type and data return the view component
     _rowRenderer(type, item) {
         //You can return any view here, CellContainer has no special significance

         const title = item.title.substring(item.title.indexOf(" - ") + 3, item.title.length)
         const artist = item.title.substring(0, item.title.indexOf(" - "))
     
         return(
         <TouchableOpacity style = {styles.albumItem} onPress = {() => {this.props.onPress(item.master_id)}}>
                 <View style = {{height:"50%", width:"35%", "alignItems" : "center"}}>
                     <Image style={{aspectRatio: 1/1, height:'165%'}} source={item.cover_image != '' ? {uri:item.cover_image} : require('../assets/blankCD.jpeg')} />
                 </View>
                 <View style={{width:"65%"}}>
                     <Text numberOfLines={2} style={{color:'white'}}>{title}</Text>
                     <Text numberOfLines={1} style={{color: 'gray'}}>{artist}</Text>
                 </View>
         </TouchableOpacity>
        );
        
         
     }

 
     render() {
         return( 
         <View style={{flex:1}}>
         <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.props.dp} rowRenderer={this._rowRenderer} />
        </View>
        )
     }
 }
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