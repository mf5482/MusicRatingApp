import { useEffect, useState, useRef } from "react";
import { AlbumListItem } from "./AlbumListItem.js";
import { SectionList, View, Text, RefreshControl, StyleSheet} from "react-native";
import NoResultsList from "./NoResultsList.js";
import { AlphabetSlider } from "./AlphabetSlider.js";
import { LoadingScreen } from "../Screens/LoadingScreen.js";


export const SavedList = (props) => {
//   <Text>{props.id}</Text>

  const [list, setList] = useState([])
  const [letters, setLetters] = useState([])

  const listRef = useRef()

  useEffect(()=>{
    sortAlphabetAlbums(props.list, "title")

    props.stopLoading()

  }, [props.list])




  const sectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  )

  const sortAlphabetAlbums = (albums, organizedField)=>{
    let organizedData = []
    let letters = []

    var otherSection = {
      "title": "#",
      "data" : []
    }

    var currentSection = null

    albums.forEach((album) => {

      if(album[props.sortBy].substring(0,1).toUpperCase() === album[props.sortBy].substring(0,1).toLowerCase()){
        otherSection.data.push(album)
      }else{


      if(currentSection === null){
        currentSection = {
          "title": album[props.sortBy].substring(0,1).toUpperCase(),
          "data" : []
        }
      }

      if(album[props.sortBy].substring(0,1) !== currentSection.title){
        organizedData.push(currentSection)
        letters.push(currentSection.title)
        currentSection = {
          "title": album[props.sortBy].substring(0,1).toUpperCase(),
          "data" : []
        }
      }

      currentSection.data.push(album)
    }
   
    })

    if(currentSection !== null){
      organizedData.push(currentSection)
      letters.push(currentSection.title)
    }

    if(otherSection.data.length > 0){
      letters.push(otherSection.title)
      organizedData.push(otherSection)

    }


    setLetters(letters)

    return setList(organizedData)

  }
  


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
      
    )
}

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
  }
})

/*
<View style={{"height":21, justifyContent :"center", backgroundColor:"gray"}}>
      <Text style={{paddingLeft:5, color:"white", fontWeight : "bold"}}>{title}</Text>
            <View style={{"flex":1 }}>
    <View style={{"flex":1 }}>
        {props.list.length > 0 ? <View style={{"flex":1}}><SectionList refreshControl={<RefreshControl colors={["#D1CDCC"]} tintColor={"#D1CDCC"} refreshing={props.refreshing} onRefresh={()=>{props.onRefresh()}}/>}
    /><View style={{ position:"absolute", right:0, top:50, bottom:50}}>
      <View style={{height:"100%", justifyContent:"center"}}> 

*/