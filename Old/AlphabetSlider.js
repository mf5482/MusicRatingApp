import { View, Text } from "react-native"
import { Slider } from "@rneui/themed";
import { useState, useEffect } from "react";

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']

export const AlphabetSlider = (props) => {

    const [rating, setRating] = useState(0)


    const alphabetSurface = alphabet.map((letter) => {
        return <Text key={letter} style={{fontSize:11, fontWeight:"bold", color:"white"}}>{letter}</Text>
    })

    const onSlideChange = ((r)=>{

        let curIndex = alphabet[r].charCodeAt(0)-65

        let found = false
        while(found === false){
            if(curIndex === 0){
                found = true
            }
            if(curIndex < 0){
                curIndex = 26
            }
            if(props.letters.includes(alphabet[curIndex])){
                found=true
                break;
            }else{
                curIndex--
            }
        }

        if(props.letters.includes(alphabet[curIndex])){

        props.listRef.current.scrollToLocation({
            sectionIndex: props.letters.indexOf(alphabet[curIndex]),
            itemIndex: 0,
            animated: false
        })
        setRating(r)

    }
    })


    return(
    <View style={{height:375, backgroundColor:"black", borderRadius:10, justifyContent:"center", borderRadius:10}}>
    <View style={{height:365,  alignItems:"center", width:15,position:"relative", backgroundColor : "black"}}>
        <View
        style={{width:12,  justifyContent:"center", alignItems : "center"}}
    >{alphabetSurface}
      </View>
      <View style={{opacity:0,position:"absolute",width:5,marginTop:23,justifyContent:"center",alignItems:"center",paddingRight:10,backgroundColor:"yellow"}}>
       <Slider allowTouchTrack={true} style={{height: 370, width:1 }}
       thumbStyle={{width:10, height:10}}
       orientation="vertical" value={rating} minimumValue={0} maximumValue={26} step={1} onValueChange={onSlideChange} trackStyle="blue"/></View>
       </View>
       </View>)
}

//      return <Text key={letter} style={{fontSize:11, fontWeight:"bold", color:"white"}}>{letter}</Text>
//Letter
//    <View style={{height:375, backgroundColor:"black", borderRadius:10, justifyContent:"center", borderRadius:10}}>
//Container
//    <View style={{height:365,  alignItems:"center", width:15,position:"relative", backgroundColor : "black"}}>
//ListContainer
//        style={{width:12,  justifyContent:"center", alignItems : "center"}}
//LettersList
//<View style={{opacity:0,position:"absolute",width:5,marginTop:23,justifyContent:"center",alignItems:"center",paddingRight:10,backgroundColor:"yellow"}}>
//SliderContainer
//<Slider allowTouchTrack={true} style={{height: 370, width:1 }}
//Slider
//       thumbStyle={{width:10, height:10}}
//SliderThumbStyle
