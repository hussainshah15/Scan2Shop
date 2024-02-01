import { View, Text, TouchableOpacity , StyleSheet } from 'react-native'
import React ,{Component}from 'react'

 const  CardButton=({
    text="Done",
    onPress=()=>{}
    , disabled = false
}) =>{
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>

    <Text style={styles.text}>Confirm</Text>
    
    
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container:{
    height:42,
    backgroundColor:"#D7654D"
    , borderRadius:8,
    alignItems:"center",
    justifyContent:"center"
  }
,
  text:{
fontWeight:"bold",
fontSize:16
,color:'white'
  }
})


export default CardButton;