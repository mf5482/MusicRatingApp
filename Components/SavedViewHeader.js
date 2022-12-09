import {View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react'
import {SortList} from './MiniList.js'


export default SavedViewHeader = (props) => {

    const sortItems = [
        {"displayName": "Album", "sqlName":"title"},
        {"displayName": "Artist", "sqlName":"artist"}
    ]

    const [showSort, setShowSort] = useState(false)

    return(
        <View style={{width:"100%", backgroundColor:"black", height : 65, display : "flex", flexDirection: "row"}}>
            <View style ={{width: 75, height : "100%", color : "white", justifyContent :"center", alignItems:"center"}}>
                <TouchableOpacity style={{display:"flex", alignItems: "center", flexDirection:"row"}} onPress={()=>{props.goBack()}}>
                <Ionicons name={"chevron-back"} size={30} color={"white"} />
                    <Text style={{color:"white", fontSize:17}}>Home</Text>
                </TouchableOpacity>
               
            </View>
            <View style ={{flex:1, height:"100%", alignItems:"center", justifyContent :"center"}}>
                <Text style={{fontWeight:"bold",color:"white", fontSize :17}}>SavedView</Text>
            </View>
            <View style ={{width: 75, height : "100%", color : "white", justifyContent :"center", alignItems:"center"}}>
                <TouchableOpacity
                onPress =  {()=> {
                    setShowSort(!showSort)}}>
                        <View style={{backgroundColor:"white"}}>
                        <Modal animationType="fade" transparent={true} visible={showSort} onRequestClose={()=>{setShowSort(!showSort)}} style={{"justifyContent":"center", "alignContent":"center"}}>
                             <SortList close={()=>{setShowSort(!showSort)}} items={sortItems} sortBy={props.sortBy} setSortBy={props.setSortBy}/>
                            </Modal>
                        </View>
                    <Text style={{color:"white", fontSize:17}}>Sort</Text>
                </TouchableOpacity>
               
            </View>


        </View>
    )
}

/*
 <View style={{width:"100%", backgroundColor:"black", height : 65, display : "flex", flexDirection: "row"}}>
            <View style ={{width: 75, height : "100%", color : "white", justifyContent :"center", alignItems:"center"}}>
                <TouchableOpacity style={{display:"flex", alignItems: "center", flexDirection:"row"}} onPress={()=>{props.goBack()}}>
                <Text style={{color:"white", fontSize:17}}>Home</Text>
                <View style ={{flex:1, height:"100%", alignItems:"center", justifyContent :"center"}}>
                <Text style={{fontWeight:"bold",color:"white", fontSize :17}}>SavedView</Text>
                            <View style ={{width: 75, height : "100%", color : "white", justifyContent :"center", alignItems:"center"}}>
       <View style={{backgroundColor:"white"}}>
                        <Modal animationType="fade" transparent={true} visible={showSort} onRequestClose={()=>{setShowSort(!showSort)}} style={{"justifyContent":"center", "alignContent":"center"}}>
                <Text style={{color:"white", fontSize:17}}>Sort</Text>
                            */