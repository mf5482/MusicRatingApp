import { useEffect, useState } from "react";
import { AlbumListItem } from "./AlbumListItem.js";
import { View, Text, RefreshControl} from "react-native";
import NoResultsList from "./NoResultsList.js";
import { LoadingScreen } from "../Screens/LoadingScreen.js";
import AlphabetSectionList from "react-native-alphabet-sectionlist/src/AlphabetSectionList.js";
import styles from '../Styles/SavedList.style.js'

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']


export const SavedList = (props) => {
  
  const [list, setList] = useState([])


  useEffect(()=>{
    sortAlphabetAlbums(props.list)

    props.stopLoading()

  }, [props.list])

  const sectionHeader = (section)=>{

    if(section.section.data.length > 0){
      return(
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.section.title}</Text>
        </View>
      )
    }else if(section.section.title === 'A'){
      return(
        <View style={styles.nullSectionHeader}>
        </View>
      )
    }
    else{
      return null
    }
  }
  


  /*const sectionHeader = ({ section: { title } }) => (
    
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  )*/


  const sortAlphabetAlbums = (albums) =>{
    let organizedData = {}

    if(albums.length > 0){

    let pointer = 0

    let symbolSection = []


    alphabet.forEach((letter) => {


      let letterSection = []


      if(albums[pointer] !== undefined){

      while(albums[pointer] !== undefined && albums[pointer][props.sortBy].substring(0,1).toUpperCase() === albums[pointer][props.sortBy].substring(0,1).toLowerCase()){

        symbolSection.push(albums[pointer])
        pointer++
      }

      while(albums[pointer] !== undefined && albums[pointer][props.sortBy].substring(0,1).toUpperCase() === letter){
        letterSection.push(albums[pointer])
        pointer++
      }
    }

      if(letter !== '#'){
        //if(letterSection.length > 0){
        organizedData[letter] = letterSection 
        //}
      }else{
        organizedData['#'] = symbolSection
      }
     
    })
  

    return setList(organizedData)
  }

  }



  /*
  <SectionList refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={props.refreshing} onRefresh={()=>{props.onRefresh()}}/>}
  initialNumToRender={15}
  onScrollToIndexFailed={()=>{return}}
  ref={listRef}
    sections={list}
    keyExtractor={(item) => {
      return item.master_id}
    }
    renderItem={({ item }) => <AlbumListItem album={item} onPress={()=>{props.onPress(item.master_id)}} />}
    renderSectionHeader={sectionHeader}
  />
  */

  return(
    <View style={styles.flexFill}>
  {props.isLoading === false ? 
  <View style={styles.flexFill}>
  {props.list.length > 0 ? <View style={styles.flexFill}><AlphabetSectionList
  refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={props.refreshing} onRefresh={()=>{props.onRefresh()}}/>}
   data={list} renderItem={({ item }) => <AlbumListItem album={item} onPress={()=>{props.onPress(item.master_id)}} />
   }     renderSectionHeader={sectionHeader}
   indexLetterColor={'green'}
   /></View>: <NoResultsList/>}
 </View>
 : <LoadingScreen/>}
  
  
    </View>
    
  )
  

/*
    return(
      <View style={styles.flexFill}>
    {props.isLoading === false ? 
    <View style={styles.flexFill}>
    {props.list.length > 0 ? <View style={styles.flexFill}><SectionList refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={props.refreshing} onRefresh={()=>{props.onRefresh()}}/>}
    initialNumToRender={15}
    onScrollToIndexFailed={()=>{return}}
    ref={listRef}
      sections={list}
      keyExtractor={(item) => {
        return item.master_id}
      }
      renderItem={({ item }) => <AlbumListItem album={item} onPress={()=>{props.onPress(item.master_id)}} />}
      renderSectionHeader={sectionHeader}
    /><View style={styles.alphabetSliderPosition}>
      <View style={styles.alphabetSlider}> 
    <AlphabetSlider letters={letters} listRef={listRef}/>
    </View>
   </View></View>: <NoResultsList/>}
   </View>
   : <LoadingScreen/>}
    
    
      </View>
      
    )*/
}
/*
const styles = StyleSheet.create({
  sectionHeader:{
    height:21,
    justifyContent :"center",
    backgroundColor:"gray"
  },
  sectionTitle:{
    paddingLeft:5,
    color:"white",
    fontWeight : "bold"
  },
  flexFill:{
    flex: 1
  },
  alphabetSliderPosition:{
    position:"absolute",
    right:0,
    top:50,
    bottom:50
  },
  alphabetSlider:{
    height:"100%",
    justifyContent:"center"
  },
  nullSectionHeader:{
    height:0.5
  }
})*/

/*
<View style={{"height":21, justifyContent :"center", backgroundColor:"gray"}}>
      <Text style={{paddingLeft:5, color:"white", fontWeight : "bold"}}>{title}</Text>
            <View style={{"flex":1 }}>
    <View style={{"flex":1 }}>
        {props.list.length > 0 ? <View style={{"flex":1}}><SectionList refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={props.refreshing} onRefresh={()=>{props.onRefresh()}}/>}
    /><View style={{ position:"absolute", right:0, top:50, bottom:50}}>
      <View style={{height:"100%", justifyContent:"center"}}> 

*/